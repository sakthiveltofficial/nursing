import React, { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";
import { useControls, folder } from "leva";

const MorphingParticles = ({
  modelPath = "/Models/models.glb",
  clearColor = "#29191f",
  showBackground = true,
  initialParticleColor = "#1d1c17",
  particleDensity = 1, // Multiplier for particle count
  initialScale = 1.0, // Initial model scale
  maxParticleCount = 100000, // Maximum number of particles to render
  initialPosition = [0, 0, 0], // Initial position [x, y, z]
}) => {
  const { scene, gl, size } = useThree();
  const pointsRef = useRef();
  const clockRef = useRef(new THREE.Clock());
  const previousTimeRef = useRef(0);
  const gpgpuRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load model
  const { scene: modelScene } = useGLTF(modelPath);

  // Controls with Leva - use separate state variables to track changes
  const {
    particleSize,
    particleColor,
    particleOpacity,
    particleDensityValue,
    modelScale,
    positionX,
    positionY,
    positionZ,
    maxParticles,
    flowFieldInfluence,
    flowFieldStrength,
    flowFieldFrequency,
    showBackgroundValue,
    clearColorValue,
  } = useControls({
    particles: folder({
      particleSize: { value: 0.04, min: 0, max: 1, step: 0.001 },
      particleColor: { value: initialParticleColor },
      particleOpacity: { value: 1, min: 0, max: 1, step: 0.01 },
      particleDensityValue: {
        value: particleDensity,
        min: 0.5,
        max: 5,
        step: 0.1,
        label: "particleDensity",
      },
      maxParticles: {
        value: maxParticleCount,
        min: 1000,
        max: 500000,
        step: 1000,
      },
    }),
    model: folder({
      modelScale: { value: initialScale, min: 0.1, max: 100, step: 0.1 },
      positionX: { value: initialPosition[0], min: -50, max: 50, step: 0.1 },
      positionY: { value: initialPosition[1], min: -50, max: 50, step: 0.1 },
      positionZ: { value: initialPosition[2], min: -50, max: 50, step: 0.1 },
    }),
    flowField: folder({
      flowFieldInfluence: { value: 0.27, min: 0, max: 1, step: 0.001 },
      flowFieldStrength: { value: 0.97, min: 0, max: 10, step: 0.001 },
      flowFieldFrequency: { value: 0.5, min: 0, max: 1, step: 0.001 },
    }),
    background: folder({
      showBackgroundValue: { value: showBackground, label: "showBackground" },
      clearColorValue: { value: clearColor, label: "clearColor" },
    }),
  });

  // Set renderer clear color based on showBackground
  useEffect(() => {
    if (showBackgroundValue) {
      gl.setClearColor(clearColorValue);
    } else {
      gl.setClearColor(clearColorValue, 0); // Set alpha to 0 for transparent background
    }
  }, [gl, clearColorValue, showBackgroundValue]);

  // Convert hex color to RGB
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return new THREE.Vector3(r, g, b);
  };

  // Create duplicate vertices to increase particle density
  const createDenseGeometry = (
    baseGeometry,
    density,
    scale,
    maxCount,
    position
  ) => {
    const positions = baseGeometry.attributes.position.array;
    const count = baseGeometry.attributes.position.count;

    // Calculate how many extra vertices we need based on density
    const multiplier = Math.ceil(density);
    let totalCount = count * multiplier;

    // Limit total count to maxCount
    totalCount = Math.min(totalCount, maxCount);

    // Calculate actual multiplier based on maxCount
    const actualMultiplier = Math.floor(totalCount / count);
    const remainder = totalCount % count;

    // Create new arrays
    const newPositions = new Float32Array(totalCount * 3);

    // Copy original vertices with scaling and position offset
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      newPositions[i3] = positions[i3] * scale + position[0];
      newPositions[i3 + 1] = positions[i3 + 1] * scale + position[1];
      newPositions[i3 + 2] = positions[i3 + 2] * scale + position[2];
    }

    // Add additional vertices with slight offsets
    for (let m = 1; m < actualMultiplier; m++) {
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const newI3 = (m * count + i) * 3;

        // Add small random offset to create denser appearance
        const offset = 0.01; // Small offset
        newPositions[newI3] =
          positions[i3] * scale + position[0] + (Math.random() - 0.5) * offset;
        newPositions[newI3 + 1] =
          positions[i3 + 1] * scale +
          position[1] +
          (Math.random() - 0.5) * offset;
        newPositions[newI3 + 2] =
          positions[i3 + 2] * scale +
          position[2] +
          (Math.random() - 0.5) * offset;
      }
    }

    // Add remaining vertices up to maxCount
    for (let i = 0; i < remainder; i++) {
      const sourceI3 = i * 3;
      const newI3 = (actualMultiplier * count + i) * 3;

      const offset = 0.01; // Small offset
      newPositions[newI3] =
        positions[sourceI3] * scale +
        position[0] +
        (Math.random() - 0.5) * offset;
      newPositions[newI3 + 1] =
        positions[sourceI3 + 1] * scale +
        position[1] +
        (Math.random() - 0.5) * offset;
      newPositions[newI3 + 2] =
        positions[sourceI3 + 2] * scale +
        position[2] +
        (Math.random() - 0.5) * offset;
    }

    // Create new geometry
    const denseGeometry = new THREE.BufferGeometry();
    denseGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(newPositions, 3)
    );

    return { geometry: denseGeometry, count: totalCount };
  };

  // GLSL Shaders
  const gpgpuParticlesShader = `
    uniform float uTime;
    uniform float uDeltaTime;
    uniform sampler2D uBase;
    uniform float uFlowFieldInfluence;
    uniform float uFlowFieldStrength;
    uniform float uFlowFieldFrequency;

    // Simplex 4D Noise by Ian McEwan, Ashima Arts
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    float permute(float x){return floor(mod(((x*34.0)+1.0)*x, 289.0));}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    float taylorInvSqrt(float r){return 1.79284291400159 - 0.85373472095314 * r;}

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
      const vec2  C = vec2( 0.138196601125010504,  // (5 - sqrt(5))/20  G4
                            0.309016994374947451); // (sqrt(5) - 1)/4   F4
    // First corner
      vec4 i  = floor(v + dot(v, C.yyyy) );
      vec4 x0 = v -   i + dot(i, C.xxxx);

    // Other corners

    // Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
      vec4 i0;

      vec3 isX = step( x0.yzw, x0.xxx );
      vec3 isYZ = step( x0.zww, x0.yyz );
    //  i0.x = dot( isX, vec3( 1.0 ) );
      i0.x = isX.x + isX.y + isX.z;
      i0.yzw = 1.0 - isX;

    //  i0.y += dot( isYZ.xy, vec2( 1.0 ) );
      i0.y += isYZ.x + isYZ.y;
      i0.zw += 1.0 - isYZ.xy;

      i0.z += isYZ.z;
      i0.w += 1.0 - isYZ.z;

      // i0 now contains the unique values 0,1,2,3 in each channel
      vec4 i3 = clamp( i0, 0.0, 1.0 );
      vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
      vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

      //  x0 = x0 - 0.0 + 0.0 * C 
      vec4 x1 = x0 - i1 + 1.0 * C.xxxx;
      vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
      vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
      vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;

    // Permutations
      i = mod(i, 289.0); 
      float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
      vec4 j1 = permute( permute( permute( permute (
                i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
              + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
              + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
              + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));
    // Gradients
    // ( 7*7*6 points uniformly over a cube, mapped onto a 4-octahedron.)
    // 7*7*6 = 294, which is close to the ring size 17*17 = 289.

      vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

      vec4 p0 = grad4(j0,   ip);
      vec4 p1 = grad4(j1.x, ip);
      vec4 p2 = grad4(j1.y, ip);
      vec4 p3 = grad4(j1.z, ip);
      vec4 p4 = grad4(j1.w, ip);

    // Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      p4 *= taylorInvSqrt(dot(p4,p4));

    // Mix contributions from the five corners
      vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
      vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
      m0 = m0 * m0;
      m1 = m1 * m1;
      return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
                  + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;
    }

    void main() {
      float time = uTime * 0.2;
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec4 particle = texture(uParticles, uv);
      vec4 base = texture(uBase, uv);
      
      // Dead
      if(particle.a >= 1.0) {
        particle.a = mod(particle.a, 1.0);
        particle.xyz = base.xyz;
      }
      // Alive
      else {
        // Strength
        float strength = simplexNoise4d(vec4(base.xyz * 0.2, time + 1.0));
        float influence = (uFlowFieldInfluence - 0.5) * (- 2.0);
        strength = smoothstep(influence, 1.0, strength);

        // Flow field
        vec3 flowField = vec3(
          simplexNoise4d(vec4(particle.xyz * uFlowFieldFrequency + 0.0, time)),
          simplexNoise4d(vec4(particle.xyz * uFlowFieldFrequency + 1.0, time)),
          simplexNoise4d(vec4(particle.xyz * uFlowFieldFrequency + 2.0, time))
        );
        flowField = normalize(flowField);
        particle.xyz += flowField * uDeltaTime * strength * uFlowFieldStrength;

        // Decay
        particle.a += uDeltaTime * 0.3;
      }
      
      gl_FragColor = particle;
    }
  `;

  const particlesVertexShader = `
    uniform vec2 uResolution;
    uniform float uSize;
    uniform sampler2D uParticlesTexture;
    uniform vec3 uParticleColor;

    attribute vec2 aParticlesUv;
    attribute vec3 aColor;
    attribute float aSize;

    varying vec3 vColor;

    void main() {
      vec4 particle = texture(uParticlesTexture, aParticlesUv);

      // Final position
      vec4 modelPosition = modelMatrix * vec4(particle.xyz, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;

      // Point size
      float sizeIn = smoothstep(0.0, 0.1, particle.a);
      float sizeOut = 1.0 - smoothstep(0.7, 1.0, particle.a);
      float size = min(sizeIn, sizeOut);

      gl_PointSize = size * aSize * uSize * uResolution.y;
      gl_PointSize *= (1.0 / - viewPosition.z);

      // Varyings - use custom color if specified, otherwise use attribute color
      vColor = uParticleColor;
    }
  `;

  const particlesFragmentShader = `
    varying vec3 vColor;
    uniform float uOpacity;

    void main() {
      float distanceToCenter = length(gl_PointCoord - 0.5);
      if(distanceToCenter > 0.5)
        discard;
      
      gl_FragColor = vec4(vColor, uOpacity);

      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `;

  // Initialize GPU computation and particles
  useEffect(() => {
    if (!modelScene || !modelScene.children.length) return;

    // Get base geometry from the model
    const baseGeometry = modelScene.children[0].geometry;

    // Create position vector
    const position = [positionX, positionY, positionZ];

    // Create denser geometry based on particleDensity, scale, maxParticles, and position
    const { geometry: denseGeometry, count } = createDenseGeometry(
      baseGeometry,
      particleDensityValue,
      modelScale,
      maxParticles,
      position
    );

    // Setup GPU Compute
    const gpgpuSize = Math.ceil(Math.sqrt(count));
    const gpgpuComputation = new GPUComputationRenderer(
      gpgpuSize,
      gpgpuSize,
      gl
    );

    // Base particles texture
    const baseParticlesTexture = gpgpuComputation.createTexture();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const i4 = i * 4;

      // Position based on geometry
      baseParticlesTexture.image.data[i4 + 0] =
        denseGeometry.attributes.position.array[i3 + 0];
      baseParticlesTexture.image.data[i4 + 1] =
        denseGeometry.attributes.position.array[i3 + 1];
      baseParticlesTexture.image.data[i4 + 2] =
        denseGeometry.attributes.position.array[i3 + 2];
      baseParticlesTexture.image.data[i4 + 3] = Math.random();
    }

    // Particles variable
    const particlesVariable = gpgpuComputation.addVariable(
      "uParticles",
      gpgpuParticlesShader,
      baseParticlesTexture
    );
    gpgpuComputation.setVariableDependencies(particlesVariable, [
      particlesVariable,
    ]);

    // Uniforms
    particlesVariable.material.uniforms.uTime = { value: 0 };
    particlesVariable.material.uniforms.uDeltaTime = { value: 0 };
    particlesVariable.material.uniforms.uBase = { value: baseParticlesTexture };
    particlesVariable.material.uniforms.uFlowFieldInfluence = {
      value: flowFieldInfluence,
    };
    particlesVariable.material.uniforms.uFlowFieldStrength = {
      value: flowFieldStrength,
    };
    particlesVariable.material.uniforms.uFlowFieldFrequency = {
      value: flowFieldFrequency,
    };

    // Init
    gpgpuComputation.init();

    // Create particles geometry
    const particlesUvArray = new Float32Array(count * 2);
    const sizesArray = new Float32Array(count);

    for (let y = 0; y < gpgpuSize; y++) {
      for (let x = 0; x < gpgpuSize; x++) {
        const i = y * gpgpuSize + x;
        if (i >= count) break; // Ensure we don't go beyond count

        const i2 = i * 2;

        // UV
        const uvX = (x + 0.5) / gpgpuSize;
        const uvY = (y + 0.5) / gpgpuSize;

        particlesUvArray[i2 + 0] = uvX;
        particlesUvArray[i2 + 1] = uvY;

        // Size - smaller sizes for denser particles
        sizesArray[i] = Math.random() * 0.8 + 0.2; // Range from 0.2 to 1.0
      }
    }

    // Create particles geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setDrawRange(0, count);
    geometry.setAttribute(
      "aParticlesUv",
      new THREE.BufferAttribute(particlesUvArray, 2)
    );

    // If the model has color attribute, use it; otherwise create a default color
    if (baseGeometry.attributes.color) {
      geometry.setAttribute("aColor", baseGeometry.attributes.color);
    } else {
      const colorArray = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        colorArray[i3] = 1.0; // R
        colorArray[i3 + 1] = 1.0; // G
        colorArray[i3 + 2] = 1.0; // B
      }
      geometry.setAttribute("aColor", new THREE.BufferAttribute(colorArray, 3));
    }

    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizesArray, 1));

    // Create particles material
    const material = new THREE.ShaderMaterial({
      vertexShader: particlesVertexShader,
      fragmentShader: particlesFragmentShader,
      uniforms: {
        uSize: { value: particleSize },
        uResolution: {
          value: new THREE.Vector2(
            size.width * window.devicePixelRatio,
            size.height * window.devicePixelRatio
          ),
        },
        uParticlesTexture: { value: null },
        uParticleColor: { value: hexToRgb(particleColor) },
        uOpacity: { value: particleOpacity },
      },
      transparent: !showBackgroundValue || particleOpacity < 1,
      depthWrite: showBackgroundValue && particleOpacity >= 1,
    });

    // Set points
    if (pointsRef.current) {
      pointsRef.current.geometry = geometry;
      pointsRef.current.material = material;
    }

    // Store references
    gpgpuRef.current = {
      computation: gpgpuComputation,
      particlesVariable: particlesVariable,
      size: gpgpuSize,
    };

    setIsInitialized(true);

    // Cleanup
    return () => {
      geometry.dispose();
      material.dispose();
      gpgpuComputation.dispose();
    };
  }, [
    modelScene,
    gl,
    size,
    particleDensityValue,
    modelScale,
    maxParticles,
    positionX,
    positionY,
    positionZ,
  ]); // Recreate when model, density, scale, maxParticles, or position changes

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (pointsRef.current && pointsRef.current.material) {
        const pixelRatio = Math.min(window.devicePixelRatio, 2);
        pointsRef.current.material.uniforms.uResolution.value.set(
          size.width * pixelRatio,
          size.height * pixelRatio
        );
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [size]);

  // Update uniforms when controls change
  useEffect(() => {
    if (!pointsRef.current || !pointsRef.current.material || !isInitialized)
      return;

    // Update material uniforms
    pointsRef.current.material.uniforms.uSize.value = particleSize;
    pointsRef.current.material.uniforms.uParticleColor.value =
      hexToRgb(particleColor);
    pointsRef.current.material.uniforms.uOpacity.value = particleOpacity;

    // Update material properties
    pointsRef.current.material.transparent =
      !showBackgroundValue || particleOpacity < 1;
    pointsRef.current.material.depthWrite =
      showBackgroundValue && particleOpacity >= 1;
    pointsRef.current.material.needsUpdate = true;
  }, [
    particleSize,
    particleColor,
    particleOpacity,
    showBackgroundValue,
    isInitialized,
  ]);

  // Update flow field parameters when they change
  useEffect(() => {
    if (!gpgpuRef.current || !isInitialized) return;

    gpgpuRef.current.particlesVariable.material.uniforms.uFlowFieldInfluence.value =
      flowFieldInfluence;
    gpgpuRef.current.particlesVariable.material.uniforms.uFlowFieldStrength.value =
      flowFieldStrength;
    gpgpuRef.current.particlesVariable.material.uniforms.uFlowFieldFrequency.value =
      flowFieldFrequency;
  }, [
    flowFieldInfluence,
    flowFieldStrength,
    flowFieldFrequency,
    isInitialized,
  ]);

  // Animation loop
  useFrame(() => {
    if (!gpgpuRef.current || !pointsRef.current || !isInitialized) return;

    const elapsedTime = clockRef.current.getElapsedTime();
    const deltaTime = elapsedTime - previousTimeRef.current;
    previousTimeRef.current = elapsedTime;

    // Update GPGPU computation time
    gpgpuRef.current.particlesVariable.material.uniforms.uTime.value =
      elapsedTime;
    gpgpuRef.current.particlesVariable.material.uniforms.uDeltaTime.value =
      deltaTime;

    // Compute the new particle positions
    gpgpuRef.current.computation.compute();

    // Update particles texture
    if (pointsRef.current.material) {
      pointsRef.current.material.uniforms.uParticlesTexture.value =
        gpgpuRef.current.computation.getCurrentRenderTarget(
          gpgpuRef.current.particlesVariable
        ).texture;
    }
  });

  return (
    <>
      <OrbitControls enableDamping />
      <points ref={pointsRef} />
    </>
  );
};

export default MorphingParticles;
