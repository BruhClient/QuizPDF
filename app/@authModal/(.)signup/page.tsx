import SignUpForm from "@/components/forms/auth/signup";
import Modal from "@/components/Modal";
import { DialogTitle } from "@/components/ui/dialog";
import { Suspense } from "react";


const SignInModal = () => {
    return ( <Modal>
        <DialogTitle className="text-center text-[30px]">Sign up</DialogTitle>
        <Suspense>
            <SignUpForm />
        </Suspense>
        
      
        
    </Modal> );
}
 
export default SignInModal;