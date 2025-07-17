"use client";
import React, { useRef } from "react";
import { Room } from "..";

function Idel() {
  const ref = useRef();
  return <Room position={[-10, -0.10, 10]} ref={ref} />;
}

export { Idel };
