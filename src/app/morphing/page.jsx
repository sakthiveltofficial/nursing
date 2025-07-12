'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import MorphingParticles from '@/Three/morphing'

export default function MorphingPage() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{
          position: [4.5, 4, 11],
          fov: 35,
          near: 0.1,
          far: 100
        }}
      >
        <Suspense fallback={null}>
          <MorphingParticles modelPath="/Models/brian.glb" />
        </Suspense>
      </Canvas>
    </div>
  )
} 