"use client";
import * as THREE from "three";
import {
  MeshReflectorMaterial,
  Environment,
  useTexture,
} from "@react-three/drei";

function BaseEnvironment() {
  return (
    <>
      {/* <color attach="background" args={["#F2F2F2"]} />
      <fog attach="fog" args={["#F2F2F2", 0, 60]} />
      <group position={[0, -0.65, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1000, 1000]} />
        </mesh>
      </group>
  */}
      <Environment preset="city" />
    </>
  );
}

export default BaseEnvironment;
