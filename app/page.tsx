

import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col gap-3 justify-center items-center">

      <h1 className="text-2xl font-bold">Authentication</h1>
      <div className="flex gap-3">
        <Button variant={"outline"} asChild><Link href={"/signup"}>Sign up</Link></Button>
        <Button variant={"outline"} asChild><Link href={"/signin"}>Sign in</Link></Button>
      </div>

     
      
      
    </div>
  );
}
