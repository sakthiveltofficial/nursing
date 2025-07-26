"use client"
import React, { useEffect, useRef, useMemo } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function Nurse(props) {
  const group = useRef()
  const gltf = useGLTF('/Models/Nurse.glb')
  const clonedScene = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene])
  const { actions, names } = useAnimations(gltf.animations, group)

  useEffect(() => {
    console.log('Nurse Actions:', actions, names)
    actions['Armature.003|mixamo.com|Layer0']?.play()
  }, [actions])

  return <primitive ref={group} object={clonedScene} rotation={[0, Math.PI / 2, 0]} {...props}  />
}

useGLTF.preload('/Models/Nurse.glb')
