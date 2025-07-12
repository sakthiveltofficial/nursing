"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"

export default function GlowingSphere() {
  const meshRef = useRef(null)
  const pointsRef = useRef(null)

  // Generate random points for particle effect
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      const radius = 1.2 + Math.random() * 0.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    return positions
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Main glowing sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#ff8c42"
          emissive="#ff6b1a"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>

      {/* Particle system */}
      <Points ref={pointsRef} positions={particlePositions}>
        <PointMaterial color="#ffffff" size={0.02} transparent opacity={0.6} sizeAttenuation />
      </Points>

      {/* Outer glow effect */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#ff8c42" transparent opacity={0.1} />
      </mesh>

      {/* Ambient light for the sphere */}
      <pointLight position={[0, 0, 0]} intensity={1} color="#ff8c42" distance={5} decay={2} />
    </group>
  )
}
