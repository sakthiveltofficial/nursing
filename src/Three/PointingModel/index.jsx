import React, { useRef, useMemo, Suspense } from "react";
import { Points, PointMaterial, useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function HandPointCloud() {
  const pointsRef = useRef();
  const { nodes } = useGLTF("/Models/Hand.glb");

  const mesh = useMemo(
    () => Object.values(nodes).find((n) => n.isMesh || n.type === "Mesh"),
    [nodes]
  );

  const particles = useMemo(() => {
    if (!mesh) return new Float32Array([]);
    const posAttr = mesh.geometry.attributes.position;
    return new Float32Array(posAttr.array);
  }, [mesh]);

  if (!mesh) return null;

  return (
    <Points ref={pointsRef} positions={particles} stride={3}>
      <PointMaterial
        color="#fff0fa" // very bright pink for bloom
        size={0.02} // slightly larger for more bloom
        sizeAttenuation
        depthWrite={false}
        transparent
      />
      {/* <axesHelper args={[100]} /> */}
    </Points>
  );
}

export default function PointingModel() {
  return (
    <group position={[10, 0, 60]}>
      <HandPointCloud />
      <EffectComposer>
        <Bloom
          intensity={35}
          luminanceThreshold={0.7} // only very bright things bloom
          luminanceSmoothing={0.9}
          radius={0.8}
        />
      </EffectComposer>
    </group>
  );
}
