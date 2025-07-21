"use client"
import React, { useEffect, useRef, useMemo } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function StandingDoct(props) {
  const group = useRef()
  const gltf = useGLTF('/Models/standingDoct.glb')
  const clonedScene = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene])
  const { actions, names } = useAnimations(gltf.animations, group)

  useEffect(() => {
    console.log('StandingDoct Actions:', actions, names)
    actions['Armature.001|mixamo.com|Layer0']?.play()
  }, [actions])

  return <primitive ref={group} object={clonedScene} {...props} />
}

useGLTF.preload('/Models/standingDoct.glb')
