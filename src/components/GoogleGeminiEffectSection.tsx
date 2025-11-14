"use client";

import { useScroll, useTransform } from "motion/react";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export function GoogleGeminiEffectSection() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div 
      className="h-[300vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
      ref={ref}
    >
      <div className="sticky top-40 flex flex-col items-center justify-center h-screen">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center">
          Ready to Join the Vibe?
        </h2>
        <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl text-center px-4">
          Be part of a community that's shaping the future of computer vision
        </p>
        <a
          href="https://chat.whatsapp.com/GxFFprWNX4d8mOQJOTz7d1"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105 inline-block text-center"
        >
          Join Now
        </a>
      </div>
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}

export default GoogleGeminiEffectSection;