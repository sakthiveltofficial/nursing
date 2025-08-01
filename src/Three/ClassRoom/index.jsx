/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export function ClassRoom(props) {
  const { nodes, materials } = useGLTF('/Models/classRoom.glb')
  // Load the blueprint texture
  const blueprintTexture = useTexture('/Models/StudyRoom/Blueprint_Bleriot.webp')
  // Optional: set texture wrapping
  blueprintTexture.wrapS = THREE.RepeatWrapping;
  blueprintTexture.wrapT = THREE.RepeatWrapping;
  // Rotate 90 degrees
  blueprintTexture.center.set(0.5, 0.5);
  blueprintTexture.rotation = -Math.PI / 2;
  // Scale down and move left
  blueprintTexture.repeat.set(1, 1); // Adjust for desired scale
  blueprintTexture.offset.x = -1; // Adjust for desired left shift
  blueprintTexture.offset.y = -0.7; // Adjust for desired left shift

  // Create a material using the loaded texture
  const blueprintMaterial = new THREE.MeshStandardMaterial({
    map: blueprintTexture,
    roughness: 0.7,
    metalness: 0.1,
  })

  return (
    <group {...props} dispose={null}>
      <group
        name="feet_5"
        position={[-0.199, -0.023, -3.696]}
        rotation={[0, 1.571, 0]}
        scale={2.154}>
        <group name="Object_12" position={[-0.706, 0.274, -0.15]} scale={[0.061, 0.1, 0.126]}>
          <mesh
            name="Object_5"
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials.black_plastic}
          />
          <mesh
            name="Object_5_1"
            castShadow
            receiveShadow
            geometry={nodes.Object_5_1.geometry}
            material={materials.blue_plastic}
          />
          <mesh
            name="Object_5_2"
            castShadow
            receiveShadow
            geometry={nodes.Object_5_2.geometry}
            material={materials.white_plastic}
          />
          <mesh
            name="Object_5_3"
            castShadow
            receiveShadow
            geometry={nodes.Object_5_3.geometry}
            material={materials.painted_metal}
          />
          <mesh
            name="Object_5_4"
            castShadow
            receiveShadow
            geometry={nodes.Object_5_4.geometry}
            material={materials.aluminium}
          />
          <mesh
            name="Object_5_5"
            castShadow
            receiveShadow
            geometry={nodes.Object_5_5.geometry}
            material={blueprintMaterial}
          />
          <mesh
            name="Object_5_6"
            castShadow
            receiveShadow
            geometry={nodes.Object_5_6.geometry}
            material={materials.red_plastic}
          />
          <mesh
            name="Object_5_7"
            castShadow
            receiveShadow
            geometry={nodes.Object_5_7.geometry}
            material={materials['Material.001']}
          />
        </group>
      </group>
      <group
        name="Cube002"
        position={[1.607, 0.552, -3.528]}
        rotation={[Math.PI, -0.488, Math.PI]}
        scale={0.269}>
        <mesh
          name="Legs"
          castShadow
          receiveShadow
          geometry={nodes.Legs.geometry}
          material={materials.Fabric}
        />
        <mesh
          name="Legs_1"
          castShadow
          receiveShadow
          geometry={nodes.Legs_1.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Legs_2"
          castShadow
          receiveShadow
          geometry={nodes.Legs_2.geometry}
          material={materials.Metal}
        />
      </group>
      <group
        name="Cube003"
        position={[0.887, 0.561, -3.112]}
        rotation={[Math.PI, -0.488, Math.PI]}
        scale={0.269}>
        <mesh
          name="Legs001"
          castShadow
          receiveShadow
          geometry={nodes.Legs001.geometry}
          material={materials.Fabric}
        />
        <mesh
          name="Legs001_1"
          castShadow
          receiveShadow
          geometry={nodes.Legs001_1.geometry}
          material={materials.Wood}
        />
        <mesh
          name="Legs001_2"
          castShadow
          receiveShadow
          geometry={nodes.Legs001_2.geometry}
          material={materials.Metal}
        />
      </group>
      <mesh
        name="Chairs_and_podium"
        castShadow
        receiveShadow
        geometry={nodes.Chairs_and_podium.geometry}
        material={materials.Podium}
        position={[-0.258, 0.22, -2.62]}
        rotation={[0, -1.21, 0]}
      />
    </group>
  )
}

useGLTF.preload('/Models/classRoom.glb')
