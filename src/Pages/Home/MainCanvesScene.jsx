import CanvesWrapper from "@/components/CanvesWrapper";
import { ClassRoom } from "@/Three/ClassRoom";
import React, { Suspense, useRef, useEffect, useState } from "react";
import { Idel } from "@/Three/Room/Scene";
import { StudyRoom } from "@/Three/StudyRoom";
import ScrollbasedAnimation from "@/Pages/Home/ScrollbasedAnimation";
import { getProject } from "@theatre/core";
import extension from "@theatre/r3f/dist/extension";
import studio from "@theatre/studio";
import { PerspectiveCamera, SheetProvider } from "@theatre/r3f";
import { editable as e } from "@theatre/r3f";
import sequences from "@/../public/Sequences/sequence_5.json";
import { SittingDoct } from "@/Three/Doctor";
import { OrbitControls } from "@react-three/drei";
import { StandingDoct } from "@/Three/Doctor/Standing";
import { Nurse } from "@/Three/Nurse";
import { StandingNurse, StudingNurse } from "@/Three/Nurse/StandingNurse";
import { NurseWithBaby } from "@/Three/Nurse/NurseWithBaby";

// if (process.env.NODE_ENV === "development") {
//   studio.initialize();
//   studio.extend(extension);
// }

function MainCanvesScene({ isActive = false, onTheatreDebugUpdate = null }) {
  const nurseRef = useRef(null);
  const project = getProject("MainProject", { state: sequences });
  const sheet = project.sheet("MainScene");
  const cameraLookAtRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Debug Theatre.js setup
  useEffect(() => {
    console.log("🎭 Theatre.js Debug Info:");
    console.log("Project:", project);
    console.log("Sheet:", sheet);
    console.log("Sequence length:", sheet?.sequence?.length);
    console.log("Sequences data:", sequences);
    
    if (project && sheet) {
      project.ready.then(() => {
        console.log("✅ Theatre.js project is ready");
        console.log("Sheet sequence length:", sheet.sequence.length);
        console.log("Sequence details:", {
          length: sheet.sequence.length,
          pointer: sheet.sequence.pointer,
          position: sheet.sequence.position
        });
      }).catch(err => {
        console.error("❌ Theatre.js project failed to load:", err);
      });
    } else {
      console.error("❌ Project or Sheet is null/undefined");
    }
  }, [project, sheet]);

  // Listen for scroll progress updates from parent
  useEffect(() => {
    const findCanvasContainer = () => {
      return document.querySelector("[data-scroll-progress]");
    };

    const setupObserver = () => {
      const canvasContainer = findCanvasContainer();
      if (!canvasContainer) {
        // Retry after a short delay
        setTimeout(setupObserver, 100);
        return;
      }

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "data-scroll-progress"
          ) {
            const progress = parseFloat(
              canvasContainer.dataset.scrollProgress || "0"
            );
            setScrollProgress(progress);
          }
        });
      });

      observer.observe(canvasContainer, {
        attributes: true,
        attributeFilter: ["data-scroll-progress"],
      });

      return observer;
    };

    const observer = setupObserver();
    return () => observer?.disconnect();
  }, []);

  return (
    <CanvesWrapper isActive={isActive}>
      <SheetProvider sheet={sheet}>
        <Suspense fallback={<mesh />}>
          <Idel />
          <group position={[20, -0.64, 50]} rotation={[0, Math.PI / 2, 0]}>
            <ClassRoom />
          </group>
          <group position={[-11.6, -0.15, 11]}>
            <StandingNurse position={[0, 0, 3.1]} />
            <StandingNurse position={[0, 0, -3.1]} />
            <StandingNurse position={[0, 0, -6]} />
            <StandingNurse position={[0, 0, 0]} />
          </group>
          <NurseWithBaby position={[-9.8, -1.01, 5.5]}   />
          <group position={[-15, -0.64, 75]} rotation={[0, -Math.PI / 2, 0]}>
            <StudyRoom />
          </group>
          <group name="nurse-group" position={[0.2, -0.2, -8.8]}>
            <group name="left-group" position={[0, 0, 0]}>
              <group name="2nd-row" position={[9.7, 0, 0.6]}>
                <Nurse position={[0, -0.45, 60.79]} />
                <Nurse position={[0, -0.45, 59.5]} />
              </group>
              <group name="3rd-row" position={[8.75, 0, 0]}>
                <Nurse position={[0, -0.45, 60.79]} />
                <Nurse position={[0, -0.45, 59.5]} />
              </group>
            </group>

            <group name="right-group" position={[0.1, 0, -3.9]}>
              <group name="2nd-row" position={[9.8, 0, 0.6]}>
                <Nurse position={[0, -0.45, 60.79]} />
                <Nurse position={[0, -0.45, 59.5]} />
              </group>
              <group name="3rd-row" position={[8.75, 0, 0]}>
                <Nurse position={[0.3, -0.45, 60.79]} />
                <Nurse position={[0.3, -0.45, 59.5]} />
              </group>
            </group>
          </group>

          <group position={[17.05, -0.01, 49]}>
            <group rotation={[0, -Math.PI / 2, 0]} position={[-1, 0, 1]}>
              <StandingDoct />
            </group>
            <group rotation={[0, -Math.PI / 3, 0]}>
              <group position={[-0.85, -0.01, 0]} rotation={[0, 0.2, 0]}>
                <SittingDoct />
              </group>
            </group>
          </group>
        </Suspense>
        <ScrollbasedAnimation
          project={project}
          isActive={isActive}
          scrollProgress={scrollProgress}
          onDebugUpdate={onTheatreDebugUpdate}
        />
        <PerspectiveCamera
          makeDefault
          position={[0, 2, 50]}
          fov={70}
          theatreKey="camera"
          lookAt={cameraLookAtRef}
        />
        {/* <OrbitControls /> */}
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
      </SheetProvider>
    </CanvesWrapper>
  );
}

export default MainCanvesScene;
