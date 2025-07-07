"use client";
import CanvesWrapper from "@/components/CanvesWrapper";
import { Idel } from "@/Three/Room/Scene";
import Header from "@/components/Header";
import { Loader } from "@react-three/drei";

export default function Home() {
  return (
    <div className="h-[100vh] w-[100vw] relative">
      <Header />
        <Loader/>
      <CanvesWrapper>
        <Idel />
      </CanvesWrapper>
    </div>
  );
}
