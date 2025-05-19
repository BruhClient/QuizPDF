import { auth } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();


export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: '32MB' } })
    .middleware(async ({ req }) => {
      //get user info
      const session = await auth();

      if (!session) throw new UploadThingError('Unauthorized');

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('upload completed for user id', metadata.userId);
      console.log('file url', file.url);

      return {
        userId: metadata.userId,
        fileUrl: file.url,
        fileName: file.name,
      };
    }),
  imageUploader: f({
    image: {
      
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({  }) => {
      
      const session = await auth();

    
      if (!session) throw new UploadThingError("Unauthorized");

    
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata,file }) => {
      
      return { uploadedBy: metadata.userId , imageUrl : file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
