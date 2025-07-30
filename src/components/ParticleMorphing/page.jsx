"use client"
import React, { useRef, useEffect, useState, useMemo, forwardRef, useImperativeHandle } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

// Combined noise functions to avoid conflicts
const noiseShaderFunctions = `
//	Simplex 3D Noise by Ian McEwan, Ashima Arts
vec4 permute3d(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt3d(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float simplexNoise3d(vec3 v)
{
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    i = mod(i, 289.0 ); 
    vec4 p = permute3d( permute3d( permute3d( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))  + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

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

    vec4 norm = taylorInvSqrt3d(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

// Simplex 4D Noise for flow field animation
vec4 permute4d(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
float permute4d(float x){return floor(mod(((x*34.0)+1.0)*x, 289.0));}
vec4 taylorInvSqrt4d(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float taylorInvSqrt4d(float r){return 1.79284291400159 - 0.85373472095314 * r;}

vec4 grad4(float j, vec4 ip){
  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
  vec4 p,s;
  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
  s = vec4(lessThan(p, vec4(0.0)));
  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www; 
  return p;
}

float simplexNoise4d(vec4 v){
  const vec2  C = vec2( 0.138196601125010504, 0.309016994374947451);
  vec4 i  = floor(v + dot(v, C.yyyy) );
  vec4 x0 = v -   i + dot(i, C.xxxx);

  vec4 i0;
  vec3 isX = step( x0.yzw, x0.xxx );
  vec3 isYZ = step( x0.zww, x0.yyz );
  i0.x = isX.x + isX.y + isX.z;
  i0.yzw = 1.0 - isX;
  i0.y += isYZ.x + isYZ.y;
  i0.zw += 1.0 - isYZ.xy;
  i0.z += isYZ.z;
  i0.w += 1.0 - isYZ.z;

  vec4 i3 = clamp( i0, 0.0, 1.0 );
  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

  vec4 x1 = x0 - i1 + 1.0 * C.xxxx;
  vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
  vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
  vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;

  i = mod(i, 289.0); 
  float j0 = permute4d( permute4d( permute4d( permute4d(i.w) + i.z) + i.y) + i.x);
  vec4 j1 = permute4d( permute4d( permute4d( permute4d (
            i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
          + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
          + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
          + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));

  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

  vec4 p0 = grad4(j0,   ip);
  vec4 p1 = grad4(j1.x, ip);
  vec4 p2 = grad4(j1.y, ip);
  vec4 p3 = grad4(j1.z, ip);
  vec4 p4 = grad4(j1.w, ip);

  vec4 norm = taylorInvSqrt4d(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  p4 *= taylorInvSqrt4d(dot(p4,p4));

  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)), 0.0);
  m0 = m0 * m0;
  m1 = m1 * m1;
  return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
              + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;
}
`

// Vertex shader with mouse-controlled animation
const vertexShader = `
uniform vec2 uResolution;
uniform float uSize;
uniform float uProgress;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uTime;
uniform float uFlowFieldInfluence;
uniform float uFlowFieldStrength;
uniform float uFlowFieldFrequency;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform float uMouseRadius;

attribute vec3 aPositionTarget;
attribute float aSize;
attribute vec3 aRandomOffset;

varying vec3 vColor;

${noiseShaderFunctions}

void main()
{
    float time = uTime * 0.2;
    
    // Mixed position for morphing
    float noiseOrigin = simplexNoise3d(position * 0.2);
    float noiseTarget = simplexNoise3d(aPositionTarget * 0.2);
    float noise = mix(noiseOrigin, noiseTarget, uProgress);
    noise = smoothstep(-1.0, 1.0, noise);
    
    // Morphing transition
    float duration = 0.6;
    float delay = (1.0 - duration) * noise;
    float end = delay + duration;
    float progress = smoothstep(delay, end, uProgress);
    vec3 mixedPosition = mix(position, aPositionTarget, progress);

    // Start with the morphed position (no animation by default)
    vec3 animatedPosition = mixedPosition;
    
    // Calculate mouse influence
    vec4 modelPosition = modelMatrix * vec4(mixedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    // Convert to screen space for mouse distance calculation
    vec2 screenPos = (projectedPosition.xy / projectedPosition.w) * 0.5 + 0.5;
    screenPos.y = 1.0 - screenPos.y; // Flip Y coordinate
    
    // Calculate distance from mouse
    float mouseDistance = distance(screenPos * uResolution, uMouse);
    float mouseInfluence = smoothstep(uMouseRadius, 0.0, mouseDistance) * uMouseInfluence;
    
    // Apply flow field animation only when mouse is nearby
    if (mouseInfluence > 0.01) {
        // Flow field for animation
        float strength = simplexNoise4d(vec4(mixedPosition * 0.2, time + 1.0));
        float influence = (uFlowFieldInfluence - 0.5) * (-2.0);
        strength = smoothstep(influence, 1.0, strength);

        // Flow field vector
        vec3 flowField = vec3(
            simplexNoise4d(vec4(mixedPosition * uFlowFieldFrequency + 0.0, time)),
            simplexNoise4d(vec4(mixedPosition * uFlowFieldFrequency + 1.0, time)),
            simplexNoise4d(vec4(mixedPosition * uFlowFieldFrequency + 2.0, time))
        );
        flowField = normalize(flowField);
        
        // Apply flow field animation with mouse influence
        animatedPosition += flowField * strength * uFlowFieldStrength * 0.5 * mouseInfluence;
        
        // Add subtle random movement with mouse influence
        animatedPosition += aRandomOffset * sin(time + noise * 10.0) * 0.02 * mouseInfluence;
    }

    // Final position
    vec4 finalModelPosition = modelMatrix * vec4(animatedPosition, 1.0);
    vec4 finalViewPosition = viewMatrix * finalModelPosition;
    vec4 finalProjectedPosition = projectionMatrix * finalViewPosition;
    gl_Position = finalProjectedPosition;

    // Point size with mouse-controlled animation
    float sizeVariation = 1.0;
    if (mouseInfluence > 0.01) {
        sizeVariation = sin(time * 2.0 + noise * 5.0) * 0.1 + 1.0;
    }
    gl_PointSize = aSize * uSize * uResolution.y * sizeVariation;
    gl_PointSize *= (1.0 / - finalViewPosition.z);

    // Varyings
    vColor = mix(uColorA, uColorB, noise);
}
`

// Fragment shader with enhanced effects
const fragmentShader = `
varying vec3 vColor;
uniform float uTime;

void main()
{
    vec2 uv = gl_PointCoord;
    float distanceToCenter = length(uv - 0.5);
    
    // Animated alpha with pulsing effect
    float pulse = sin(uTime * 3.0) * 0.02 + 1.0;
    float alpha = (0.05 / distanceToCenter - 0.1) * pulse;
    
    // Add some sparkle effect
    float sparkle = sin(uTime * 10.0 + distanceToCenter * 20.0) * 0.1 + 0.9;
    alpha *= sparkle;
    
    gl_FragColor = vec4(vColor, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
`

// Particles component with mouse-controlled animation
function Particles({ 
  modelPath = '/Models/HeroModels_24.glb',
  scrollProgress = 0,
  colorA = '#D3D3D3',
  colorB = '#8B2D6B',
  pointSize = 0.1,
  flowFieldInfluence = 0.27,
  flowFieldStrength = 0.97,
  flowFieldFrequency = 0.5,
  mouseRadius = 200, // Radius of mouse influence in pixels
  mouseInfluence = 1.0 // Strength of mouse influence
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

    // Create sizes array with more variation
    const sizesArray = new Float32Array(maxCount)
    const randomOffsetsArray = new Float32Array(maxCount * 3)
    
    for (let i = 0; i < maxCount; i++) {
      sizesArray[i] = Math.random() * 0.8 + 0.2
      
      // Random offsets for subtle animation variation
      const i3 = i * 3
      randomOffsetsArray[i3 + 0] = (Math.random() - 0.5) * 2
      randomOffsetsArray[i3 + 1] = (Math.random() - 0.5) * 2
      randomOffsetsArray[i3 + 2] = (Math.random() - 0.5) * 2
    }

    setParticleData({
      positions: normalizedPositions,
      maxCount,
      sizesArray,
      randomOffsetsArray
    })
  }, [scene])

  // Handle scroll progress changes with buffer zones and mobile optimization
  useEffect(() => {
    if (!particleData || particleData.positions.length === 0) return

    const totalShapes = particleData.positions.length
    
    // Clamp scrollProgress to [0, 1]
    const clampedScroll = Math.min(Math.max(scrollProgress, 0), 1)
    
    // Mobile-optimized buffer zones for smoother transitions
    const isMobile = window.innerWidth <= 1024
    const bufferZone = isMobile ? 0.1 : 0.15 // Smaller buffer on mobile for more responsive feel
    const transitionZone = isMobile ? 0.8 : 0.7 // Longer transition zone on mobile
    
    const segmentSize = 1 / totalShapes
    
    // Calculate which segment we're in
    const currentSegment = Math.floor(clampedScroll * totalShapes)
    const segmentProgress = (clampedScroll * totalShapes) % 1
    
    // Calculate target morph index with mobile-specific easing
    let targetIndex = currentSegment
    let localProgress = 0
    
    if (segmentProgress < bufferZone) {
      // In buffer zone - stay at current shape
      localProgress = 0
    } else if (segmentProgress > bufferZone + transitionZone) {
      // In hold zone - transition complete
      localProgress = 1
    } else {
      // In transition zone with mobile-optimized easing
      const rawProgress = (segmentProgress - bufferZone) / transitionZone
      
      // Apply different easing curves for mobile vs desktop
      if (isMobile) {
        // Smoother, more gradual easing for mobile
        localProgress = rawProgress * rawProgress * rawProgress * (rawProgress * (6 * rawProgress - 15) + 10) // smootherstep
      } else {
        // Standard smoothstep for desktop
        localProgress = rawProgress * rawProgress * (3 - 2 * rawProgress)
      }
    }
    
    // Ensure we don't go beyond available shapes
    if (targetIndex >= totalShapes - 1) {
      targetIndex = totalShapes - 1
      localProgress = 1
    }
    
    setTargetMorphIndex(targetIndex)
    setMorphProgress(localProgress)

    // Update material progress with enhanced mobile easing
    if (materialRef.current) {
      // Apply additional smoothing for mobile devices
      let finalProgress = localProgress
      
      if (isMobile) {
        // Add momentum-based smoothing for mobile
        const currentProgress = materialRef.current.uniforms.uProgress.value
        const progressDelta = Math.abs(localProgress - currentProgress)
        
        // Use different interpolation speed based on how fast the change is
        const lerpFactor = progressDelta > 0.1 ? 0.15 : 0.08
        finalProgress = currentProgress + (localProgress - currentProgress) * lerpFactor
      }
      
      materialRef.current.uniforms.uProgress.value = finalProgress
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
    geom.setAttribute('aRandomOffset', new THREE.BufferAttribute(particleData.randomOffsetsArray, 3))

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
        uFlowFieldInfluence: new THREE.Uniform(flowFieldInfluence),
        uFlowFieldStrength: new THREE.Uniform(flowFieldStrength),
        uFlowFieldFrequency: new THREE.Uniform(flowFieldFrequency),
        uMouse: new THREE.Uniform(new THREE.Vector2(-1000, -1000)),
        uMouseInfluence: new THREE.Uniform(mouseInfluence),
        uMouseRadius: new THREE.Uniform(mouseRadius)
      },
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    return { geometry: geom, material: mat }
  }, [particleData, size, pointSize, colorA, colorB, flowFieldInfluence, flowFieldStrength, flowFieldFrequency, mouseInfluence, mouseRadius])

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
    materialRef.current.uniforms.uFlowFieldInfluence.value = flowFieldInfluence
    materialRef.current.uniforms.uFlowFieldStrength.value = flowFieldStrength
    materialRef.current.uniforms.uFlowFieldFrequency.value = flowFieldFrequency
    materialRef.current.uniforms.uMouseInfluence.value = mouseInfluence
    materialRef.current.uniforms.uMouseRadius.value = mouseRadius
  }, [pointSize, size, colorA, colorB, flowFieldInfluence, flowFieldStrength, flowFieldFrequency, mouseInfluence, mouseRadius])

  // Animation loop for time-based effects and mouse position
  useFrame((state, delta) => {
    if (!materialRef.current) return
    
    timeRef.current += delta
    materialRef.current.uniforms.uTime.value = timeRef.current
    materialRef.current.uniforms.uMouse.value.copy(mousePosition)
  })

  if (!geometry || !material) return null

  return (
    <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false}>
      <shaderMaterial ref={materialRef} attach="material" {...material} />
    </points>
  )
}

// Main component with mobile-optimized morphing and touch interaction
const ParticleMorphing = forwardRef(function ParticleMorphing({ 
  modelPath = '/Models/HeroModels_24.glb',
  cameraPosition = [0, 0, 16],
  backgroundColor = '#160920',
  enableControls = true,
  // Animation parameters
  flowFieldInfluence = 0.27,
  flowFieldStrength = 0.97,
  flowFieldFrequency = 0.5,
  // Mouse interaction parameters
  mouseRadius = 200, // Radius of mouse influence in pixels
  mouseInfluence = 1.0 // Strength of mouse influence (0 = no effect, 1 = full effect)
}, ref) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const morphingRef = useRef()
  const lastUpdateTime = useRef(0)
  const progressBuffer = useRef(0)

  // Mobile-optimized progress update with throttling
  const updateMorphProgress = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024
    
    if (isMobile) {
      // Throttle updates on mobile for better performance
      return (progress) => {
        const now = Date.now()
        if (now - lastUpdateTime.current > 16) { // ~60fps throttling
          progressBuffer.current = progress
          setScrollProgress(progress)
          lastUpdateTime.current = now
        } else {
          // Use interpolated value for smoother animation
          const lerp = 0.1
          progressBuffer.current += (progress - progressBuffer.current) * lerp
          setScrollProgress(progressBuffer.current)
        }
      }
    } else {
      // Direct updates for desktop
      return (progress) => {
        setScrollProgress(progress)
      }
    }
  }, [])

  useImperativeHandle(ref, () => ({
    updateMorphProgress
  }))

  // Mobile-specific performance optimizations
  const mobileOptimizedProps = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024
    
    if (isMobile) {
      return {
        pointSize: 0.08, // Slightly smaller particles for mobile
        flowFieldStrength: flowFieldStrength * 0.8, // Reduced animation intensity
        mouseRadius: mouseRadius * 1.2, // Larger touch radius
        mouseInfluence: mouseInfluence * 1.1 // Stronger touch influence
      }
    }
    
    return {
      pointSize: 0.1,
      flowFieldStrength,
      mouseRadius,
      mouseInfluence
    }
  }, [flowFieldStrength, mouseRadius, mouseInfluence])

  return (
    <group position={[0, -1, 0]} ref={morphingRef}>
      <Particles 
        modelPath={modelPath} 
        scrollProgress={scrollProgress}
        colorA="#FEC8DE"
        colorB="#8B2D6B"
        pointSize={mobileOptimizedProps.pointSize}
        flowFieldInfluence={flowFieldInfluence}
        flowFieldStrength={mobileOptimizedProps.flowFieldStrength}
        flowFieldFrequency={flowFieldFrequency}
        mouseRadius={mobileOptimizedProps.mouseRadius}
        mouseInfluence={mobileOptimizedProps.mouseInfluence}
      />
    </group>
  )
})

export default ParticleMorphing

// Preload the model
useGLTF.preload('/Models/HeroModels_24.glb')