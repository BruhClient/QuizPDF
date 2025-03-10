import SignUpForm from "@/components/forms/auth/signup";
import Modal from "@/components/Modal";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Suspense } from "react";


const SignInModal = () => {
    return ( <Modal>
        <DialogHeader className="py-2">
            <DialogTitle className="text-center text-[25px]">Account</DialogTitle>
            <DialogDescription className="text-center">Continue with your Github or Google account</DialogDescription>
        </DialogHeader>
        <Suspense>
            <SignUpForm />
        </Suspense>
        
      
        
    </Modal> );
}
 
export default SignInModal;