"use client"
import React, { useRef, useEffect, useState, useMemo, forwardRef, useImperativeHandle } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

// Simplex Noise 3D shader function
const simplexNoise3d = `
//	Simplex 3D Noise 
//	by Ian McEwan, Ashima Arts
//
vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float simplexNoise3d(vec3 v)
{
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    //  x0 = x0 - 0. + 0.0 * C 
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    // Permutations
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))  + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    // Gradients
    // ( N*N points uniformly over a square, mapped onto an octahedron.)
    float n_ = 1.0/7.0; // N=7
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    // Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}
`

// Vertex shader
const vertexShader = `
uniform vec2 uResolution;
uniform float uSize;
uniform float uProgress;
uniform vec3 uColorA;
uniform vec3 uColorB;

attribute vec3 aPositionTarget;
attribute float aSize;

varying vec3 vColor;

${simplexNoise3d}

void main()
{
    // Mixed position
    float noiseOrigin = simplexNoise3d(position * 0.2);
    float noiseTarget = simplexNoise3d(aPositionTarget * 0.2);
    float noise = mix(noiseOrigin, noiseTarget, uProgress);
    noise = smoothstep(-1.0, 1.0, noise);
    
    float duration = 0.4;
    float delay = (1.0 - duration) * noise;
    float end = delay + duration;
    float progress = smoothstep(delay, end, uProgress);
    vec3 mixedPosition = mix(position, aPositionTarget, progress);

    // Final position
    vec4 modelPosition = modelMatrix * vec4(mixedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    // Point size
    gl_PointSize = aSize * uSize * uResolution.y;
    gl_PointSize *= (1.0 / - viewPosition.z);

    // Varyings
    vColor = mix(uColorA, uColorB, noise);
}
`

// Fragment shader
const fragmentShader = `
varying vec3 vColor;

void main()
{
    vec2 uv = gl_PointCoord;
    float distanceToCenter = length(uv - 0.5);
    float alpha = 0.05 / distanceToCenter - 0.1;
    
    gl_FragColor = vec4(vColor, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
`

// Particles component
function Particles({ 
  modelPath = '/Models/HeroModels_24.glb',
  scrollProgress = 0,
  colorA = '#000000',
  colorB = '#727272',
  pointSize = 0.1
}) {
  const pointsRef = useRef()
  const materialRef = useRef()
  const { size } = useThree()
  const [particleData, setParticleData] = useState(null)
  const [currentMorphIndex, setCurrentMorphIndex] = useState(0)
  const [targetMorphIndex, setTargetMorphIndex] = useState(0)
  
  // Load GLTF model
  const { scene } = useGLTF(modelPath)
  
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
      sizesArray[i] = Math.random()
    }

    setParticleData({
      positions: normalizedPositions,
      maxCount,
      sizesArray
    })
  }, [scene])

  // Handle scroll progress changes
  useEffect(() => {
    if (!particleData || particleData.positions.length === 0) return

    const totalShapes = particleData.positions.length
    const progressPerShape = 1 / (totalShapes - 1)
    
    // Calculate which morph target we should be at
    const targetIndex = Math.min(
      Math.floor(scrollProgress / progressPerShape),
      totalShapes - 1
    )
    
    // Calculate progress within current morph
    const morphProgress = (scrollProgress % progressPerShape) / progressPerShape
    
    setTargetMorphIndex(targetIndex)
    
    // Update material progress
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = morphProgress
    }
  }, [scrollProgress, particleData])

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
        uColorA: new THREE.Uniform(new THREE.Color(colorA)),
        uColorB: new THREE.Uniform(new THREE.Color(colorB))
      },
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    return { geometry: geom, material: mat }
  }, [particleData, size, pointSize, colorA, colorB])

  // Update geometry when morph target changes
  useEffect(() => {
    if (!particleData || !geometry || targetMorphIndex === currentMorphIndex) return

    const nextIndex = targetMorphIndex + 1
    const targetPosition = particleData.positions[targetMorphIndex]
    const nextPosition = particleData.positions[nextIndex] || particleData.positions[0]

    geometry.setAttribute('position', targetPosition)
    geometry.setAttribute('aPositionTarget', nextPosition)
    
    setCurrentMorphIndex(targetMorphIndex)
  }, [targetMorphIndex, particleData, geometry, currentMorphIndex])

  // Update uniforms
  useEffect(() => {
    if (!materialRef.current) return
    
    materialRef.current.uniforms.uSize.value = pointSize
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height)
    materialRef.current.uniforms.uColorA.value.set(colorA)
    materialRef.current.uniforms.uColorB.value.set(colorB)
  }, [pointSize, size, colorA, colorB])

  if (!geometry || !material) return null

  return (
    <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false}>
      <shaderMaterial ref={materialRef} attach="material" {...material} />
    </points>
  )
}

// Main component with forwardRef
const ParticleMorphing = forwardRef(function ParticleMorphing({ 
  modelPath = '/Models/HeroModels_24.glb',
  cameraPosition = [0, 0, 16],
  backgroundColor = '#160920',
  enableControls = true
}, ref) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const morphingRef = useRef()

  useImperativeHandle(ref, () => ({
    updateMorphProgress: (progress) => {
      setScrollProgress(progress)
    }
  }))

  return (
    <group position={[0, -1, 0]} ref={morphingRef}>
      <Particles 
        modelPath={modelPath} 
        scrollProgress={scrollProgress}
        colorA="#000000"
        colorB="#727272"
        pointSize={0.1}
      />
    </group>
  )
})

export default ParticleMorphing

// Preload the model
useGLTF.preload('/Models/HeroModels_24.glb')