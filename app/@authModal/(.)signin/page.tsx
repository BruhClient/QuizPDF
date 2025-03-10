import SignInForm from "@/components/forms/auth/signin";
import Modal from "@/components/Modal";
import { DialogTitle } from "@/components/ui/dialog";
import { Suspense } from "react";


const SignInModal = () => {
    return ( <Modal>
        <DialogTitle className="text-center text-[30px]">Sign in</DialogTitle>
        <Suspense>
            <SignInForm />
        </Suspense>
        
      
        
    </Modal> );
}
 
export default SignInModal;