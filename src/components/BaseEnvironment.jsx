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
      <color attach="background" args={["#ededed"]} />
      <fog attach="fog" args={["#ededed", 0, 100]} />
      <group position={[0, -0.65, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[150, 200]} />
          {/* <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1080} //2048
            mixBlur={1}
            mixStrength={80} //80
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
          /> */}
        </mesh>
      </group>
 
      <Environment preset="city" />
    </>
  );
}

export default BaseEnvironment;
