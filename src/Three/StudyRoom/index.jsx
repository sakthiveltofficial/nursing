import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function StudyRoom(props) {
  const { nodes, materials } = useGLTF('/Models/StudyRoom/StudyRoom.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Desk_Elements"
        castShadow
        receiveShadow
        geometry={nodes.Desk_Elements.geometry}
        material={materials['Standard white.001']}
        position={[25.098, -0.183, 11.859]}
      />
      <mesh
        name="Board002"
        castShadow
        receiveShadow
        geometry={nodes.Board002.geometry}
        material={materials['Standard white.001']}
        position={[25.098, -0.183, 11.859]}
      />
      <mesh
        name="Board001"
        castShadow
        receiveShadow
        geometry={nodes.Board001.geometry}
        material={materials['Standard Black.001']}
        position={[25.098, -0.183, 11.859]}
      />
      <mesh
        name="Board"
        castShadow
        receiveShadow
        geometry={nodes.Board.geometry}
        material={materials['Bleriot Board.002']}
        position={[25.098, -0.183, 11.859]}
      />
      <group
        name="Sketchfab_model001"
        position={[0.843, 1.65, 0.788]}
        rotation={[0.222, -1.49, 0.241]}
        scale={0.015}>
        <group name="Cylinder001" position={[-0.33, 10.485, 0]} scale={10.401}>
          <group name="Cylinder009_Metal002_0" position={[-0.674, 0.029, -0.321]} scale={0.815}>
            <mesh
              name="Cylinder009_Metal002_0001"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder009_Metal002_0001.geometry}
              material={materials['Metal.001']}
            />
            <mesh
              name="Cylinder009_Metal002_0001_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder009_Metal002_0001_1.geometry}
              material={materials['BlackPlastic.002']}
            />
          </group>
        </group>
      </group>
      <group
        name="Cylinder004_WhitePlastic_0"
        position={[0.241, 1.799, 1.375]}
        rotation={[3.093, -0.906, 3.106]}
        scale={0.077}>
        <mesh
          name="Cylinder004_WhitePlastic_0_1"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder004_WhitePlastic_0_1.geometry}
          material={materials.WhitePlastic}
        />
        <mesh
          name="Cylinder004_WhitePlastic_0_2"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder004_WhitePlastic_0_2.geometry}
          material={materials.BlackPlastic}
        />
        <mesh
          name="Cylinder004_WhitePlastic_0_3"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder004_WhitePlastic_0_3.geometry}
          material={materials.GreenPlastic}
        />
        <mesh
          name="Cylinder004_WhitePlastic_0_4"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder004_WhitePlastic_0_4.geometry}
          material={materials['Metal.003']}
        />
        <mesh
          name="Cylinder004_WhitePlastic_0_5"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder004_WhitePlastic_0_5.geometry}
          material={materials.Lines}
        />
      </group>
      <group
        name="Cylinder002_Metal_0"
        position={[0.259, 1.882, 1.144]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.062}>
        <mesh
          name="Cylinder002_Metal_0_1"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_Metal_0_1.geometry}
          material={materials.Metal}
        />
        <mesh
          name="Cylinder002_Metal_0_2"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_Metal_0_2.geometry}
          material={materials.Vaccine}
        />
        <mesh
          name="Cylinder002_Metal_0_3"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002_Metal_0_3.geometry}
          material={materials.Glass}
        />
      </group>
      <group
        name="Sketchfab_model003"
        position={[-1.304, 1.918, 1.363]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.013}>
        <group name="b2d37e9569c44dd78a32aeaec514c4ecfbx003" rotation={[Math.PI / 2, 0, 0]}>
          <group
            name="Cube003"
            position={[19.067, 18.335, -6.228]}
            rotation={[-1.686, 0, Math.PI / 2]}
            scale={[3.489, 3.162, 3.489]}>
            <group
              name="Cube003_White_0"
              position={[-9.784, -21.503, -8.626]}
              rotation={[-1.463, 0.406, 2.924]}>
              <mesh
                name="Cube003_White_0_1"
                castShadow
                receiveShadow
                geometry={nodes.Cube003_White_0_1.geometry}
                material={materials.White}
              />
              <mesh
                name="Cube003_White_0_2"
                castShadow
                receiveShadow
                geometry={nodes.Cube003_White_0_2.geometry}
                material={materials.Purple}
              />
              <mesh
                name="Cube003_White_0_3"
                castShadow
                receiveShadow
                geometry={nodes.Cube003_White_0_3.geometry}
                material={materials.Screen}
              />
              <mesh
                name="Cube003_White_0_4"
                castShadow
                receiveShadow
                geometry={nodes.Cube003_White_0_4.geometry}
                material={materials.Buttons}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Models/StudyRoom/StudyRoom.gltf')
