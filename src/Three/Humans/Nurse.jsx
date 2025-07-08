import { useFBX } from '@react-three/drei'
import React, { forwardRef } from 'react'

const Nurse = forwardRef((props,ref) => {

    const model=useFBX("/Models/Humans/patient.fbx")

  return (
    <group ref={ref} {...props}>
        <primitive object={model} scale={10}  position={[0,0,0]} />
    </group>
  )
})

export default Nurse
useFBX.preload("/Models/Humans/patient.fbx")