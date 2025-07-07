"use client";
import React, { useRef } from "react";
import { Room } from "..";

function Idel() {
  const ref = useRef();
  return <Room position={[0, -0.64, 10]} ref={ref} />;
}

export { Idel };
