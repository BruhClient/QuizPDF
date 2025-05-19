"use client"

import BentoGrid from "@/components/common/BentoGrid";
import Footer from "@/components/common/Footer";
import Hero from "@/components/common/Hero";
import Pricing from "@/components/common/Pricing";
import { HeroMarquee } from "@/components/HeroMarquee";
import { Particles } from "@/components/magicui/particles";




export default function Home() {
  return (
    <div className="px-5 flex flex-col gap-10 ">
      <div className="fixed top-0 left-0 z-[-1]">
      <Particles className="h-screen w-screen" color="#c452eb" size={1}/>
    </div>
      <Hero />
      <BentoGrid />
      <Pricing />
      <HeroMarquee />
      <Footer />


     
      
      
    </div>
  );
}
