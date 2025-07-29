
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export const Room = React.forwardRef((props, ref) => {
  const { nodes, materials ,scene} = useGLTF("/Models/MainRoom.glb");
  return (
    <primitive object={scene} {...props} ref={ref} />
  );
});

useGLTF.preload("/Models/MainRoom.glb");
