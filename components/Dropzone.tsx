"use client "

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUploadThing } from '@/lib/uploadthing'
import { showErrorToast } from '@/lib/toast';
import { deleteFileFromUploadthing } from '@/server/actions/uploadthing';
import { Permissions } from '@/server/actions/permissions';


type DropzoneProps = {
  onPdfDrop: (text : string , name : string) => void;
};

export default function Dropzone({ onPdfDrop }: DropzoneProps) {
  const [loading, setLoading] = useState(false);
  const { startUpload } = useUploadThing('pdfUploader', {
          
        });
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return; // no file dropped

      const pdfFile = acceptedFiles[0]; // only one file allowed
      
      const sizeInMB = pdfFile.size / (1024 * 1024);
      

      
      
      setLoading(true);

      

      
      
      try {

        const isAllowed = await Permissions(sizeInMB)

        if (isAllowed.error) { 
          throw Error(isAllowed.error)
        }
        const resp = await startUpload([pdfFile])
        
        
        if (!resp)  throw new Error("File upload failed")
        
        const {key ,serverData : {fileUrl : pdfUrl} ,name} = resp[0] 
        
        localStorage.setItem("pdfKey",key)
        

        if (key) { 
                    // Saving to local storage
                    localStorage.setItem("PDF File",key)
        }



        const res = await fetch('/api/pdf/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: pdfUrl }),
        });

        const extracted = await res.json();

        if (extracted === "") { 
            throw Error("Failed to extract from PDF")
        }

     
        await deleteFileFromUploadthing(key)
        
        
   


        onPdfDrop(extracted.text,name);


        
        
      } catch(error : any) {
        showErrorToast(error.message)
        let key = localStorage.getItem("pdfKey") 
        if (key) { 
          await deleteFileFromUploadthing(key)
        }
        
      } finally {
        
        setLoading(false);
      }
    },
    [onPdfDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
    },
    disabled: loading,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center min-h-[400px] h-full justify-center border border-dashed rounded-md p-6 text-center cursor-pointer
        ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-border bg-muted'
        }
        ${loading ? 'opacity-50 cursor-not-allowed' : ''}
        h-full
      `}
    >
      <input {...getInputProps()} />
      {loading ? (
        <div className="flex flex-col items-center space-y-2">
          <svg
            className="animate-spin h-8 w-8 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <p className="text-primary font-medium">Uploading...</p>
        </div>
      ) : (
        <p className="text-muted-foreground">
          Drag & drop a PDF file here, or click to select one
        </p>
      )}
    </div>
  );
}
