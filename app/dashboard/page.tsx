import UserProfile from "@/components/auth/UserProfile";

function Dashboard() {
    return ( <div className="w-full h-screen flex justify-center items-center">
        <div className="text-2xl">Dashboard</div>
        <UserProfile />
    </div> );
}

export default Dashboard;