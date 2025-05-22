
import CreateQuizSection from "./_components/CreateQuizSection";
import AboutDialog from "./AboutDialog";
import QuizWrapper from "./_components/QuizWrapper";



function Dashboard() {
    return ( <div className="px-6 space-y-5 py-3">
        <div className="flex gap-2">
            <div className="text-3xl font-semibold">
                Dashboard
            </div>
            <AboutDialog />
        </div>
         <CreateQuizSection />   
        
        
        <QuizWrapper />
     
         
        
    </div> );
}

export default Dashboard;