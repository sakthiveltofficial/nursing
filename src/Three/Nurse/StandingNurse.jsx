"use client"
import React, { useEffect, useRef, useMemo } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function StandingNurse(props) {
  const group = useRef()
  const gltf = useGLTF('/Models/AttendingNurse.glb')
  const clonedScene = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene])

  return <primitive ref={group} object={clonedScene}  rotation={[0,0.4,0]} {...props}  ></primitive>
}

useGLTF.preload('/Models/AttendingNurse.glb')
