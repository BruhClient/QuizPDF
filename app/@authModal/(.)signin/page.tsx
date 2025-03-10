import SignInForm from "@/components/forms/auth/signin";
import Modal from "@/components/Modal";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Suspense } from "react";


const SignInModal = () => {
    return ( <Modal>
        <DialogHeader className="py-2">
            <DialogTitle className="text-center text-[25px]">Welcome back</DialogTitle>
            <DialogDescription className="text-center">Login with your Github or Google account</DialogDescription>
        </DialogHeader>
        
        <Suspense>
            <SignInForm />
        </Suspense>
        
      
        
    </Modal> );
}
 
export default SignInModal;