import CanvesWrapper from "@/components/CanvesWrapper";
import { Nurse } from "@/Three/Humans";
import { ClassRoom } from "@/Three/ClassRoom";
import React, { Suspense, useRef } from "react";
import { Idel } from "@/Three/Room/Scene";
import { StudyRoom } from "@/Three/StudyRoom";

function MainCanvesScene({ isActive = false }) {
  const nurseRef = useRef(null);
  return (
    <CanvesWrapper isActive={isActive}>
      <Suspense fallback={<mesh />}>
        <Idel />
        <group position={[20, -0.64, 50]} rotation={[0, Math.PI / 2, 0]}>
          <ClassRoom />
        </group>
        <group position={[-15, -0.64, 75]} rotation={[0, -Math.PI / 2, 0]}>
          <StudyRoom />
        </group>
        <Nurse ref={nurseRef} />
      </Suspense>
    </CanvesWrapper>
  );
}

export default MainCanvesScene;
