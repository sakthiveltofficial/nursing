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
import { getProject } from "@theatre/core";
import extension from "@theatre/r3f/dist/extension";
import studio from "@theatre/studio";
import { PerspectiveCamera, SheetProvider } from "@theatre/r3f";
import { editable as e } from "@theatre/r3f";
import sequences from "@/../public/Sequences/sequence_1.json";
import ScrollbasedAnimation from "@/Pages/Home/ScrollbasedAnimation";

// if (process.env.NODE_ENV === "development") {
//   studio.initialize();
//   studio.extend(extension);
// }

function CanvesWrapper({ children }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const project = getProject("MainProject", { state: sequences});
  const sheet = project.sheet("MainScene");
  const cameraLookAtRef = useRef(null);

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
         <SheetProvider sheet={sheet}>
        <ScrollbasedAnimation project={project} />
        <BaseEnvironment />
        <PerspectiveCamera
          makeDefault
          position={[0, 2, 50]}
          fov={70}
          theatreKey="camera"
          lookAt={cameraLookAtRef}
        />
        <e.mesh
          theatreKey="camera_lookAt"
          visible="editor"
          position={[0, 2, 50]}
          fov={70}
          ref={cameraLookAtRef}
        >
          <octahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial color="red" />
        </e.mesh>
        {children}
        {/* <OrbitControls /> */}
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
         </SheetProvider>

      </Canvas>
    </div>
  );
}

export default CanvesWrapper;
