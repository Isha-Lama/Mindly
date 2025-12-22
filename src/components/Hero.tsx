import React from "react";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 md:py-24">
      
      {/* Left Image / Illustration */}
      <div className="w-full md:w-3/4 lg:w-5/6 flex justify-center md:justify-start md:ml-10 mb-10 md:mb-0">
       <img
       src="/src/assets/hero-illustration.png"
       alt="Hero Illustration"
       className="w-full max-w-md md:max-w-lg lg:max-w-2xl"
       />
       </div>


      {/* Right Text Content */}
<div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
  <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 scheherazade-new-regular leading-tight">
    <span className="block lg:-ml-40">Unveil Thoughts</span>
    <span className="block lg:ml-16 border-b-[3px] border-current pb-1">
      Voice Yours
    </span>
  </h1>
  <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 scheherazade-new-regular">
    Place Where Your Stories Meet Others’ Emotions.
  </p>
 
<Button
  size="lg"
  className="px-20 py-7 self-center md:self-start md:ml-20 lg:ml-32 rounded-full"
>
  Get Started →
</Button>


</div>





    </section>
  );
};

export default Hero;
