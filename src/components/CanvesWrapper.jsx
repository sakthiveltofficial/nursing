"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  GizmoHelper,
  GizmoViewport,
  Grid,
  OrbitControls,
} from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import BaseEnvironment from "./BaseEnvironment";
import { EffectComposer, Noise } from "@react-three/postprocessing";

function CanvesWrapper({ children }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="w-full h-full relative p-5">
      {/* F2F2F2 */}
        <Canvas
          camera={{ fov: 40, position: [0, 0, 20] }}
          gl={{ antialias: true, preserveDrawingBuffer: true }}
          dpr={[1, 1.5]}
          shadows
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          
          <BaseEnvironment />
          {children}
          <OrbitControls  />
          <ambientLight intensity={0.5} />
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport
              axisColors={["red", "green", "blue"]}
              labelColor="black"
            />
          </GizmoHelper>
          {/* <Grid
            position={[0, -0.65, 0]}
            args={[150, 200]}
            cellColor="black"
            cellSize={1}
            cellThickness={1}
          /> */}
            {/* <EffectComposer>
              <Noise opacity={0.001} />
            </EffectComposer> */}
        </Canvas>
    </div>
  );
}

export default CanvesWrapper;
