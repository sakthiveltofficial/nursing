"use client"
import React, { useRef, useEffect, useState, useMemo, forwardRef, useImperativeHandle } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'


// Simple vertex shader for basic particle morphing
const vertexShader = `
uniform vec2 uResolution;
uniform float uSize;
uniform float uProgress;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform float uMouseRadius;

attribute vec3 aPositionTarget;
attribute float aSize;

varying vec3 vColor;

void main()
{
    // Simple morphing transition
    vec3 mixedPosition = mix(position, aPositionTarget, uProgress);
    
    // Calculate mouse influence for basic interaction
    vec4 modelPosition = modelMatrix * vec4(mixedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    // Convert to screen space for mouse distance calculation
    vec2 screenPos = (projectedPosition.xy / projectedPosition.w) * 0.5 + 0.5;
    screenPos.y = 1.0 - screenPos.y;
    
    // Calculate distance from mouse
    float mouseDistance = distance(screenPos * uResolution, uMouse);
    float mouseInfluence = smoothstep(uMouseRadius, 0.0, mouseDistance) * uMouseInfluence;
    
    // Apply subtle scale effect on mouse hover
    vec3 finalPosition = mixedPosition;
    if (mouseInfluence > 0.01) {
        finalPosition += normalize(mixedPosition) * mouseInfluence * 0.1;
    }

    // Final position
    vec4 finalModelPosition = modelMatrix * vec4(finalPosition, 1.0);
    vec4 finalViewPosition = viewMatrix * finalModelPosition;
    gl_Position = projectionMatrix * finalViewPosition;

    // Point size with subtle mouse interaction
    float sizeVariation = 1.0 + mouseInfluence * 0.2;
    gl_PointSize = aSize * uSize * uResolution.y * sizeVariation;
    gl_PointSize *= (1.0 / - finalViewPosition.z);

    // Stable color mixing without flickering
    float colorMix = smoothstep(0.0, 1.0, uProgress);
    vColor = mix(uColorA, uColorB, colorMix * 0.3 + 0.2);
}
`

// Simple fragment shader
const fragmentShader = `
varying vec3 vColor;

void main()
{
    vec2 uv = gl_PointCoord;
    float distanceToCenter = length(uv - 0.5);
    
    // Simple circular particles
    float alpha = (0.05 / distanceToCenter - 0.1);
    
    gl_FragColor = vec4(vColor, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
`

// Simple particles component for morphing
function Particles({ 
  modelPath = '/Models/HeroModels_24.glb',
  scrollProgress = 0,
  colorA = '#D3D3D3',
  colorB = '#8B2D6B',
  pointSize = 0.1,
  mouseRadius = 200,
  mouseInfluence = 1.0
}) {
  const pointsRef = useRef()
  const materialRef = useRef()
  const { size, gl } = useThree()
  const [particleData, setParticleData] = useState(null)
  const [currentMorphIndex, setCurrentMorphIndex] = useState(0)
  const [targetMorphIndex, setTargetMorphIndex] = useState(0)
  const [morphProgress, setMorphProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState(new THREE.Vector2(-1000, -1000)) // Start off-screen
  const timeRef = useRef(0)
  
  // Load GLTF model
  const { scene } = useGLTF(modelPath)
  
  // Enhanced mouse and touch tracking
  useEffect(() => {
    const handleMouseMove = (event) => {
      const canvas = gl.domElement
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      setMousePosition(new THREE.Vector2(x, y))
    }

    const handleTouchMove = (event) => {
      event.preventDefault() // Prevent scrolling while touching canvas
      const canvas = gl.domElement
      const rect = canvas.getBoundingClientRect()
      const touch = event.touches[0]
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top
      setMousePosition(new THREE.Vector2(x, y))
    }

    const handleMouseLeave = () => {
      // Move mouse position off-screen when leaving canvas
      setMousePosition(new THREE.Vector2(-1000, -1000))
    }

    const handleTouchEnd = () => {
      // Keep touch interaction active for a bit longer on mobile
      setTimeout(() => {
        setMousePosition(new THREE.Vector2(-1000, -1000))
      }, 100)
    }

    const canvas = gl.domElement
    
    // Mouse events
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true })
    canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    
    // Touch events for mobile
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true })
    canvas.addEventListener('touchcancel', handleTouchEnd, { passive: true })

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
      canvas.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [gl])
  
  // Process model data
  useEffect(() => {
    if (!scene || !scene.children.length) return

    const positions = scene.children.map(child => {
      if (child.geometry && child.geometry.attributes.position) {
        return child.geometry.attributes.position
      }
      return null
    }).filter(Boolean)

    if (positions.length === 0) return

    // Find max count
    let maxCount = 0
    for (const position of positions) {
      if (position.count > maxCount) {
        maxCount = position.count
      }
    }

    // Normalize positions
    const normalizedPositions = []
    for (const position of positions) {
      const originalArray = position.array
      const newArray = new Float32Array(maxCount * 3)

      for (let i = 0; i < maxCount; i++) {
        const i3 = i * 3

        if (i3 < originalArray.length) {
          newArray[i3 + 0] = originalArray[i3 + 0]
          newArray[i3 + 1] = originalArray[i3 + 1]
          newArray[i3 + 2] = originalArray[i3 + 2]
        } else {
          const randomIndex = Math.floor(position.count * Math.random()) * 3
          newArray[i3 + 0] = originalArray[randomIndex + 0]
          newArray[i3 + 1] = originalArray[randomIndex + 1]
          newArray[i3 + 2] = originalArray[randomIndex + 2]
        }
      }

      normalizedPositions.push(new THREE.Float32BufferAttribute(newArray, 3))
    }

    // Create sizes array
    const sizesArray = new Float32Array(maxCount)
    
    for (let i = 0; i < maxCount; i++) {
      sizesArray[i] = Math.random() * 0.8 + 0.2
    }

    setParticleData({
      positions: normalizedPositions,
      maxCount,
      sizesArray
    })
  }, [scene])

  // Handle scroll progress changes with transition buffer
  useEffect(() => {
    if (!particleData || particleData.positions.length === 0) return

    const totalShapes = particleData.positions.length
    const clampedScroll = Math.min(Math.max(scrollProgress, 0), 1)
    
    // Add buffer zones for smoother transitions
    const bufferZone = 0.2 // 20% buffer at start of each segment
    const transitionZone = 0.6 // 60% for actual transition
    // Remaining 20% is hold zone
    
    const segmentSize = 1 / totalShapes
    const currentSegment = Math.floor(clampedScroll * totalShapes)
    const segmentProgress = (clampedScroll * totalShapes) % 1
    
    let targetIndex = currentSegment
    let localProgress = 0
    
    if (segmentProgress < bufferZone) {
      // In buffer zone - hold at current shape
      localProgress = 0
    } else if (segmentProgress < bufferZone + transitionZone) {
      // In transition zone - gradual morphing
      const transitionProgress = (segmentProgress - bufferZone) / transitionZone
      localProgress = smoothstep(0, 1, transitionProgress)
    } else {
      // In hold zone - transition complete
      localProgress = 1
    }
    
    // Ensure we don't go beyond available shapes
    if (targetIndex >= totalShapes - 1) {
      targetIndex = totalShapes - 1
      localProgress = 1
    }
    
    setTargetMorphIndex(targetIndex)
    setMorphProgress(localProgress)

    // Update material progress
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = localProgress
    }
  }, [scrollProgress, particleData])

  // Helper function for smooth step
  const smoothstep = (edge0, edge1, x) => {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
    return t * t * (3 - 2 * t)
  }

  // Create geometry and material
  const { geometry, material } = useMemo(() => {
    if (!particleData) return { geometry: null, material: null }

    const geom = new THREE.BufferGeometry()
    const initialPosition = particleData.positions[0]
    const initialTarget = particleData.positions[1] || particleData.positions[0]
    
    geom.setAttribute('position', initialPosition)
    geom.setAttribute('aPositionTarget', initialTarget)
    geom.setAttribute('aSize', new THREE.BufferAttribute(particleData.sizesArray, 1))

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uSize: new THREE.Uniform(pointSize),
        uResolution: new THREE.Uniform(new THREE.Vector2(size.width, size.height)),
        uProgress: new THREE.Uniform(0),
        uTime: new THREE.Uniform(0),
        uColorA: new THREE.Uniform(new THREE.Color(colorA)),
        uColorB: new THREE.Uniform(new THREE.Color(colorB)),
        uMouse: new THREE.Uniform(new THREE.Vector2(-1000, -1000)),
        uMouseInfluence: new THREE.Uniform(mouseInfluence),
        uMouseRadius: new THREE.Uniform(mouseRadius)
      },
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    return { geometry: geom, material: mat }
  }, [particleData, size, pointSize, colorA, colorB, mouseInfluence, mouseRadius])

  // Update geometry when morph target changes
  useEffect(() => {
    if (!particleData || !geometry) return

    const nextIndex = targetMorphIndex + 1
    
    // Handle boundary conditions
    if (nextIndex >= particleData.positions.length) {
      // At the last shape
      const lastPosition = particleData.positions[targetMorphIndex]
      geometry.setAttribute('position', lastPosition)
      geometry.setAttribute('aPositionTarget', lastPosition)
    } else {
      // Normal transition
      const currentPosition = particleData.positions[targetMorphIndex]
      const nextPosition = particleData.positions[nextIndex]
      geometry.setAttribute('position', currentPosition)
      geometry.setAttribute('aPositionTarget', nextPosition)
    }
    
    setCurrentMorphIndex(targetMorphIndex)
  }, [targetMorphIndex, particleData, geometry])

  // Update uniforms
  useEffect(() => {
    if (!materialRef.current) return
    
    materialRef.current.uniforms.uSize.value = pointSize
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height)
    materialRef.current.uniforms.uColorA.value.set(colorA)
    materialRef.current.uniforms.uColorB.value.set(colorB)
    materialRef.current.uniforms.uMouseInfluence.value = mouseInfluence
    materialRef.current.uniforms.uMouseRadius.value = mouseRadius
  }, [pointSize, size, colorA, colorB, mouseInfluence, mouseRadius])

  // Animation loop for mouse position
  useFrame(() => {
    if (!materialRef.current) return
    
    materialRef.current.uniforms.uMouse.value.copy(mousePosition)
  })

  if (!geometry || !material) return null

  return (
    <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false}>
      <shaderMaterial ref={materialRef} attach="material" {...material} />
    </points>
  )
}

// Main component with simple morphing and touch interaction
const ParticleMorphing = forwardRef(function ParticleMorphing({ 
  modelPath = '/Models/HeroModels_24.glb',
  cameraPosition = [0, 0, 16],
  backgroundColor = '#160920',
  enableControls = true,
  mouseRadius = 200,
  mouseInfluence = 1.0
}, ref) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const morphingRef = useRef()
  const lastUpdateTime = useRef(0)
  const progressBuffer = useRef(0)

  // Simple progress update
  const updateMorphProgress = useMemo(() => {
    return (progress) => {
      setScrollProgress(progress)
    }
  }, [])

  useImperativeHandle(ref, () => ({
    updateMorphProgress
  }))

  // Device-specific optimizations
  const optimizedProps = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024
    
    return {
      pointSize: isMobile ? 0.08 : 0.1,
      mouseRadius: isMobile ? mouseRadius * 1.2 : mouseRadius,
      mouseInfluence: isMobile ? mouseInfluence * 1.1 : mouseInfluence
    }
  }, [mouseRadius, mouseInfluence])

  return (
    <group position={[0, -1, 0]} ref={morphingRef}>
      <Particles 
        modelPath={modelPath} 
        scrollProgress={scrollProgress}
        colorA="#FEC8DE"
        colorB="#8B2D6B"
        pointSize={optimizedProps.pointSize}
        mouseRadius={optimizedProps.mouseRadius}
        mouseInfluence={optimizedProps.mouseInfluence}
      />
    </group>
  )
})

export default ParticleMorphing

// Preload the model
useGLTF.preload('/Models/HeroModels_24.glb')