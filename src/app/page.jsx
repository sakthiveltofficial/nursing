"use client";
import { Suspense, useRef } from "react";
import Hero from "@/Pages/Home";
import SecondSection from "@/Pages/Home/SecondSection";
import ThirdSection from "@/Pages/Home/ThirdSection";

export default function Home() {
  const nurseRef = useRef();
  return (
    <div className="h-fit w-[100vw] relative overflow-x-hidden">
    
      {/* <Hero />
      <SecondSection /> */}
      <ThirdSection />
      {/* <div className="h-[100vh] w-[100vw] bg-red-500">
        <h1>Hello</h1>
      </div> */}
    </div>
  );
}
