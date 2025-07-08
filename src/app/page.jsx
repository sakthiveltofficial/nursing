"use client";
import CanvesWrapper from "@/components/CanvesWrapper";
import { Idel } from "@/Three/Room/Scene";
import Header from "@/components/Header";
import { Loader } from "@react-three/drei";
import { Nurse } from "@/Three/Humans";
import { Suspense, useRef } from "react";

export default function Home() {
  const nurseRef = useRef();
  return (
    <div className="h-[100vh] w-[100vw] relative">
      <Header />
      <CanvesWrapper>
        <Suspense fallback={<mesh />}>
          <Idel />
          <Nurse ref={nurseRef} />
        </Suspense>
      </CanvesWrapper>
    </div>
  );
}
