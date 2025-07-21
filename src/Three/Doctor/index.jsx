"use client"
import React, { useEffect, useRef, useMemo } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export function SittingDoct(props) {
  const group = useRef()
  const gltf = useGLTF('/Models/sittingDoct.glb')
  const clonedScene = useMemo(() => SkeletonUtils.clone(gltf.scene), [gltf.scene])
  const { actions, names } = useAnimations(gltf.animations, group)

  useEffect(() => {
    console.log('SittingDoct Actions:', actions, names)
    actions['Armature|mixamo.com|Layer0']?.play()
  }, [actions])

  return <primitive ref={group} object={clonedScene} {...props} />
}

useGLTF.preload('/Models/sittingDoct.glb')
