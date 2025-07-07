"use client";

import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";

export const Room = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/Models/Room/scene.gltf");
  return (
    <group {...props} dispose={null} ref={ref}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="f25f3e444dba4f7285bf0cc619b02086fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="RootNode">
              <group name="Hospital_Wardroom1">
                <group name="Hospital_WardroomTV">
                  <mesh
                    name="Hospital_WardroomTV_TV1_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Hospital_WardroomTV_TV1_0.geometry}
                    material={materials.material}
                  />
                </group>
                <group name="Hospital_WardroomExitSign">
                  <mesh
                    name="Hospital_WardroomExitSign_Door1_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Hospital_WardroomExitSign_Door1_0.geometry}
                    material={materials.Door1}
                  />
                </group>
                <group name="Hospital_WardroomSurgery_Equipmet2">
                  <mesh
                    name="Hospital_WardroomSurgery_Equipmet2_Table1_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Hospital_WardroomSurgery_Equipmet2_Table1_0.geometry
                    }
                    material={materials.Table1}
                  />
                </group>
                <group name="Hospital_WardroomSurgery_Equipmet1">
                  <mesh
                    name="Hospital_WardroomSurgery_Equipmet1_Table1_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Hospital_WardroomSurgery_Equipmet1_Table1_0.geometry
                    }
                    material={materials.Table1}
                  />
                </group>
                <group name="Hospital_WardroomSurgery_Equipmet3">
                  <mesh
                    name="Hospital_WardroomSurgery_Equipmet3_Table1_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Hospital_WardroomSurgery_Equipmet3_Table1_0.geometry
                    }
                    material={materials.Table1}
                  />
                </group>
                <group name="Hospital_WardroomComputerDesk">
                  <mesh
                    name="Hospital_WardroomComputerDesk_lambert2_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Hospital_WardroomComputerDesk_lambert2_0.geometry
                    }
                    material={materials.lambert2}
                  />
                </group>
                <group name="Hospital_WardroomPillsCaseCover">
                  <mesh
                    name="Hospital_WardroomPillsCaseCover_Table1_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Hospital_WardroomPillsCaseCover_Table1_0.geometry
                    }
                    material={materials.Table1}
                  />
                </group>
                <group name="Hospital_WardroomDoor">
                  <mesh
                    name="Hospital_WardroomDoor_Door1_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Hospital_WardroomDoor_Door1_0.geometry}
                    material={materials.Door1}
                  />
                  <mesh
                    name="Hospital_WardroomDoor_Window_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Hospital_WardroomDoor_Window_0.geometry}
                    material={materials.Window}
                  />
                </group>
                <group name="Hospital_WardroomPlate">
                  <mesh
                    name="Hospital_WardroomPlate_Table1_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Hospital_WardroomPlate_Table1_0.geometry}
                    material={materials.Table1}
                  />
                </group>
                <group name="Hospital_WardroomShell">
                  <group name="Hospital_WardroomFloor1">
                    <mesh
                      name="Hospital_WardroomFloor1_Floor_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Hospital_WardroomFloor1_Floor_0.geometry}
                      material={materials.Floor}
                    />
                  </group>
                  <group name="Hospital_WardroomWindow1">
                    <mesh
                      name="Hospital_WardroomWindow1_Window_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Hospital_WardroomWindow1_Window_0.geometry
                      }
                      material={materials.Window}
                    />
                  </group>
                  <group name="Hospital_WardroomWall2">
                    <mesh
                      name="Hospital_WardroomWall2_Wall_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Hospital_WardroomWall2_Wall_0.geometry}
                      material={materials.Wall}
                    />
                  </group>
                  <group name="Hospital_WardroomLine">
                    <mesh
                      name="Hospital_WardroomLine_Wall_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Hospital_WardroomLine_Wall_0.geometry}
                      material={materials.Wall}
                    />
                  </group>
                  <group name="Hospital_WardroomWindowFrame">
                    <mesh
                      name="Hospital_WardroomWindowFrame_Metal_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Hospital_WardroomWindowFrame_Metal_0.geometry
                      }
                      material={materials.Metal}
                    />
                  </group>
                </group>
                <group name="Hospital_WardroomSurgery_Equipmet4">
                  <mesh
                    name="Hospital_WardroomSurgery_Equipmet4_Table1_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Hospital_WardroomSurgery_Equipmet4_Table1_0.geometry
                    }
                    material={materials.Table1}
                  />
                </group>
                <group name="Hospital_WardroomBowl">
                  <mesh
                    name="Hospital_WardroomBowl_Table1_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Hospital_WardroomBowl_Table1_0.geometry}
                    material={materials.Table1}
                  />
                </group>
                <group name="Hospital_WardroomMedicine">
                  <mesh
                    name="Hospital_WardroomMedicine_Table1_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Hospital_WardroomMedicine_Table1_0.geometry}
                    material={materials.Table1}
                  />
                  <mesh
                    name="Hospital_WardroomMedicine_Window_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Hospital_WardroomMedicine_Window_0.geometry}
                    material={materials.Window}
                  />
                </group>
                <group name="Hospital_WardroomPlate1">
                  <mesh
                    name="Hospital_WardroomPlate1_Table1_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Hospital_WardroomPlate1_Table1_0.geometry}
                    material={materials.Table1}
                  />
                </group>
                <group name="Hospital_WardroomSurgery_Equipmet_trolly">
                  <mesh
                    name="Hospital_WardroomSurgery_Equipmet_trolly_Table1_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Hospital_WardroomSurgery_Equipmet_trolly_Table1_0
                        .geometry
                    }
                    material={materials.Table1}
                  />
                </group>
                <group name="Hospital_WardroomCurtain2">
                  <mesh
                    name="Hospital_WardroomCurtain2_Curtain_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Hospital_WardroomCurtain2_Curtain_0.geometry
                    }
                    material={materials.Curtain}
                  />
                </group>
                <group name="Hospital_WardroomChair">
                  <mesh
                    name="Hospital_WardroomChair_Chair1_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Hospital_WardroomChair_Chair1_0.geometry}
                    material={materials.Chair1}
                  />
                </group>
                <group name="Hospital_WardroomMonitor">
                  <mesh
                    name="Hospital_WardroomMonitor_Monitor1_0"
                    castShadow
                    receiveShadow
                    geometry={
                      nodes.Hospital_WardroomMonitor_Monitor1_0.geometry
                    }
                    material={materials.Monitor1}
                  />
                </group>
                <group name="Medicine">
                  <mesh
                    name="Medicine_Table1_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Medicine_Table1_0.geometry}
                    material={materials.Table1}
                  />
                  <mesh
                    name="Medicine_Window_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Medicine_Window_0.geometry}
                    material={materials.Window}
                  />
                </group>
                <group name="Medicine1">
                  <mesh
                    name="Medicine1_Table1_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Medicine1_Table1_0.geometry}
                    material={materials.Table1}
                  />
                  <mesh
                    name="Medicine1_Window_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Medicine1_Window_0.geometry}
                    material={materials.Window}
                  />
                </group>
                <group name="Bed6">
                  <mesh
                    name="Bed6_Bed_0"
                    castShadow
                    receiveShadow
                    geometry={nodes.Bed6_Bed_0.geometry}
                    material={materials.material_11}
                  />
                </group>
                <group name="Set1">
                  <group name="Hospital_WardroomDroor">
                    <mesh
                      name="Hospital_WardroomDroor_lambert2_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Hospital_WardroomDroor_lambert2_0.geometry
                      }
                      material={materials.lambert2}
                    />
                  </group>
                  <group name="Hospital_WardroomBed5">
                    <mesh
                      name="Hospital_WardroomBed5_Bed_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Hospital_WardroomBed5_Bed_0.geometry}
                      material={materials.material_11}
                    />
                  </group>
                  <group name="Hospital_WardroomCurtainFrame">
                    <mesh
                      name="Hospital_WardroomCurtainFrame_Metal_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Hospital_WardroomCurtainFrame_Metal_0.geometry
                      }
                      material={materials.Metal}
                    />
                  </group>
                  <group name="Hospital_WardroomCeilingLight">
                    <mesh
                      name="Hospital_WardroomCeilingLight_Metal_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Hospital_WardroomCeilingLight_Metal_0.geometry
                      }
                      material={materials.Metal}
                    />
                    <mesh
                      name="Hospital_WardroomCeilingLight_Emmision_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Hospital_WardroomCeilingLight_Emmision_0.geometry
                      }
                      material={materials.Emmision}
                    />
                  </group>
                  <group name="Hospital_WardroomStand1">
                    <mesh
                      name="Hospital_WardroomStand1_Stand_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Hospital_WardroomStand1_Stand_0.geometry}
                      material={materials.Stand}
                    />
                  </group>
                  <group name="Hospital_WardroomECG_Machine">
                    <mesh
                      name="Hospital_WardroomECG_Machine_ECG_Monitor_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Hospital_WardroomECG_Machine_ECG_Monitor_0
                          .geometry
                      }
                      material={materials.ECG_Monitor}
                    />
                  </group>
                  <group name="Hospital_WardroomGlass1">
                    <mesh
                      name="Hospital_WardroomGlass1_Glass_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Hospital_WardroomGlass1_Glass_0.geometry}
                      material={materials.Glass}
                    />
                  </group>
                  <group name="Hospital_WardroomModutec_Power_Maquet">
                    <mesh
                      name="Hospital_WardroomModutec_Power_Maquet_Modutec_Power_Maquet1_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes
                          .Hospital_WardroomModutec_Power_Maquet_Modutec_Power_Maquet1_0
                          .geometry
                      }
                      material={materials.Modutec_Power_Maquet1}
                    />
                  </group>
                  <group name="Curtain2">
                    <mesh
                      name="Curtain2_Curtain_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Curtain2_Curtain_0.geometry}
                      material={materials.Curtain}
                    />
                  </group>
                  <group name="CeilingLight">
                    <mesh
                      name="CeilingLight_Metal_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight_Metal_0.geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      name="CeilingLight_Emmision_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight_Emmision_0.geometry}
                      material={materials.Emmision}
                    />
                  </group>
                  <group name="Hospital_WardroomRoundStool">
                    <mesh
                      name="Hospital_WardroomRoundStool_Stool_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Hospital_WardroomRoundStool_Stool_0.geometry
                      }
                      material={materials.Stool}
                    />
                  </group>
                  <group name="Hospital_WardroomTrolly_Table1">
                    <mesh
                      name="Hospital_WardroomTrolly_Table1_TrollyTable1_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Hospital_WardroomTrolly_Table1_TrollyTable1_0
                          .geometry
                      }
                      material={materials.TrollyTable1}
                    />
                  </group>
                </group>
                <group name="Set2" position={[0, 0, 306.386]}>
                  <group name="Droor">
                    <mesh
                      name="Droor_lambert2_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Droor_lambert2_0.geometry}
                      material={materials.lambert2}
                    />
                  </group>
                  <group name="Bed5">
                    <mesh
                      name="Bed5_Bed_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Bed5_Bed_0.geometry}
                      material={materials.material_11}
                    />
                  </group>
                  <group name="CurtainFrame">
                    <mesh
                      name="CurtainFrame_Metal_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.CurtainFrame_Metal_0.geometry}
                      material={materials.Metal}
                    />
                  </group>
                  <group name="CeilingLight_1">
                    <mesh
                      name="CeilingLight_Metal_0_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight_Metal_0_1.geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      name="CeilingLight_Emmision_0_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight_Emmision_0_1.geometry}
                      material={materials.Emmision}
                    />
                  </group>
                  <group name="Stand1">
                    <mesh
                      name="Stand1_Stand_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Stand1_Stand_0.geometry}
                      material={materials.Stand}
                    />
                  </group>
                  <group name="ECG_Machine">
                    <mesh
                      name="ECG_Machine_ECG_Monitor_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.ECG_Machine_ECG_Monitor_0.geometry}
                      material={materials.ECG_Monitor}
                    />
                  </group>
                  <group name="Glass1">
                    <mesh
                      name="Glass1_Glass_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Glass1_Glass_0.geometry}
                      material={materials.Glass}
                    />
                  </group>
                  <group name="Modutec_Power_Maquet">
                    <mesh
                      name="Modutec_Power_Maquet_Modutec_Power_Maquet1_0"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Modutec_Power_Maquet_Modutec_Power_Maquet1_0
                          .geometry
                      }
                      material={materials.Modutec_Power_Maquet1}
                    />
                  </group>
                  <group name="Curtain2_1">
                    <mesh
                      name="Curtain2_Curtain_0_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.Curtain2_Curtain_0_1.geometry}
                      material={materials.Curtain}
                    />
                  </group>
                  <group name="CeilingLight1">
                    <mesh
                      name="CeilingLight1_Metal_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight1_Metal_0.geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      name="CeilingLight1_Emmision_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight1_Emmision_0.geometry}
                      material={materials.Emmision}
                    />
                  </group>
                  <group name="RoundStool">
                    <mesh
                      name="RoundStool_Stool_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.RoundStool_Stool_0.geometry}
                      material={materials.Stool}
                    />
                  </group>
                  <group name="Trolly_Table1">
                    <mesh
                      name="Trolly_Table1_TrollyTable1_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.Trolly_Table1_TrollyTable1_0.geometry}
                      material={materials.TrollyTable1}
                    />
                  </group>
                </group>
                <group name="Set3" position={[0, 0, 612.772]}>
                  <group name="Droor_1">
                    <mesh
                      name="Droor_lambert2_0_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.Droor_lambert2_0_1.geometry}
                      material={materials.lambert2}
                    />
                  </group>
                  <group name="Bed5_1">
                    <mesh
                      name="Bed5_Bed_0_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.Bed5_Bed_0_1.geometry}
                      material={materials.material_11}
                    />
                  </group>
                  <group name="CurtainFrame_1">
                    <mesh
                      name="CurtainFrame_Metal_0_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.CurtainFrame_Metal_0_1.geometry}
                      material={materials.Metal}
                    />
                  </group>
                  <group name="CeilingLight_2">
                    <mesh
                      name="CeilingLight_Metal_0_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight_Metal_0_2.geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      name="CeilingLight_Emmision_0_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight_Emmision_0_2.geometry}
                      material={materials.Emmision}
                    />
                  </group>
                  <group name="Stand1_1">
                    <mesh
                      name="Stand1_Stand_0_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.Stand1_Stand_0_1.geometry}
                      material={materials.Stand}
                    />
                  </group>
                  <group name="ECG_Machine_1">
                    <mesh
                      name="ECG_Machine_ECG_Monitor_0_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.ECG_Machine_ECG_Monitor_0_1.geometry}
                      material={materials.ECG_Monitor}
                    />
                  </group>
                  <group name="Glass1_1">
                    <mesh
                      name="Glass1_Glass_0_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.Glass1_Glass_0_1.geometry}
                      material={materials.Glass}
                    />
                  </group>
                  <group name="Modutec_Power_Maquet_1">
                    <mesh
                      name="Modutec_Power_Maquet_Modutec_Power_Maquet1_0_1"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Modutec_Power_Maquet_Modutec_Power_Maquet1_0_1
                          .geometry
                      }
                      material={materials.Modutec_Power_Maquet1}
                    />
                  </group>
                  <group name="Curtain2_2">
                    <mesh
                      name="Curtain2_Curtain_0_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.Curtain2_Curtain_0_2.geometry}
                      material={materials.Curtain}
                    />
                  </group>
                  <group name="CeilingLight1_1">
                    <mesh
                      name="CeilingLight1_Metal_0_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight1_Metal_0_1.geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      name="CeilingLight1_Emmision_0_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight1_Emmision_0_1.geometry}
                      material={materials.Emmision}
                    />
                  </group>
                  <group name="RoundStool_1">
                    <mesh
                      name="RoundStool_Stool_0_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.RoundStool_Stool_0_1.geometry}
                      material={materials.Stool}
                    />
                  </group>
                  <group name="Trolly_Table1_1">
                    <mesh
                      name="Trolly_Table1_TrollyTable1_0_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.Trolly_Table1_TrollyTable1_0_1.geometry}
                      material={materials.TrollyTable1}
                    />
                  </group>
                  <group name="CeilingLight2">
                    <mesh
                      name="CeilingLight2_Metal_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight2_Metal_0.geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      name="CeilingLight2_Emmision_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight2_Emmision_0.geometry}
                      material={materials.Emmision}
                    />
                  </group>
                  <group name="CeilingLight3">
                    <mesh
                      name="CeilingLight3_Metal_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight3_Metal_0.geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      name="CeilingLight3_Emmision_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight3_Emmision_0.geometry}
                      material={materials.Emmision}
                    />
                  </group>
                  <group name="CeilingLight4">
                    <mesh
                      name="CeilingLight4_Metal_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight4_Metal_0.geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      name="CeilingLight4_Emmision_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight4_Emmision_0.geometry}
                      material={materials.Emmision}
                    />
                  </group>
                  <group name="CeilingLight5">
                    <mesh
                      name="CeilingLight5_Metal_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight5_Metal_0.geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      name="CeilingLight5_Emmision_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight5_Emmision_0.geometry}
                      material={materials.Emmision}
                    />
                  </group>
                  <group name="CeilingLight6">
                    <mesh
                      name="CeilingLight6_Metal_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight6_Metal_0.geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      name="CeilingLight6_Emmision_0"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight6_Emmision_0.geometry}
                      material={materials.Emmision}
                    />
                  </group>
                </group>
                <group name="Set4" position={[0, 0, 919.158]}>
                  <group name="Droor_2">
                    <mesh
                      name="Droor_lambert2_0_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.Droor_lambert2_0_2.geometry}
                      material={materials.lambert2}
                    />
                  </group>
                  <group name="Bed5_2">
                    <mesh
                      name="Bed5_Bed_0_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.Bed5_Bed_0_2.geometry}
                      material={materials.material_11}
                    />
                  </group>
                  <group name="CurtainFrame_2">
                    <mesh
                      name="CurtainFrame_Metal_0_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.CurtainFrame_Metal_0_2.geometry}
                      material={materials.Metal}
                    />
                  </group>
                  <group name="CeilingLight_3">
                    <mesh
                      name="CeilingLight_Metal_0_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight_Metal_0_3.geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      name="CeilingLight_Emmision_0_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight_Emmision_0_3.geometry}
                      material={materials.Emmision}
                    />
                  </group>
                  <group name="Stand1_2">
                    <mesh
                      name="Stand1_Stand_0_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.Stand1_Stand_0_2.geometry}
                      material={materials.Stand}
                    />
                  </group>
                  <group name="ECG_Machine_2">
                    <mesh
                      name="ECG_Machine_ECG_Monitor_0_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.ECG_Machine_ECG_Monitor_0_2.geometry}
                      material={materials.ECG_Monitor}
                    />
                  </group>
                  <group name="Glass1_2">
                    <mesh
                      name="Glass1_Glass_0_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.Glass1_Glass_0_2.geometry}
                      material={materials.Glass}
                    />
                  </group>
                  <group name="Modutec_Power_Maquet_2">
                    <mesh
                      name="Modutec_Power_Maquet_Modutec_Power_Maquet1_0_2"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Modutec_Power_Maquet_Modutec_Power_Maquet1_0_2
                          .geometry
                      }
                      material={materials.Modutec_Power_Maquet1}
                    />
                  </group>
                  <group name="Curtain2_3">
                    <mesh
                      name="Curtain2_Curtain_0_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.Curtain2_Curtain_0_3.geometry}
                      material={materials.Curtain}
                    />
                  </group>
                  <group name="CeilingLight1_2">
                    <mesh
                      name="CeilingLight1_Metal_0_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight1_Metal_0_2.geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      name="CeilingLight1_Emmision_0_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight1_Emmision_0_2.geometry}
                      material={materials.Emmision}
                    />
                  </group>
                  <group name="RoundStool_2">
                    <mesh
                      name="RoundStool_Stool_0_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.RoundStool_Stool_0_2.geometry}
                      material={materials.Stool}
                    />
                  </group>
                  <group name="Trolly_Table1_2">
                    <mesh
                      name="Trolly_Table1_TrollyTable1_0_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.Trolly_Table1_TrollyTable1_0_2.geometry}
                      material={materials.TrollyTable1}
                    />
                  </group>
                </group>
                <group name="Set5" position={[0, 0, 1225.544]}>
                  <group name="Droor_3">
                    <mesh
                      name="Droor_lambert2_0_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.Droor_lambert2_0_3.geometry}
                      material={materials.lambert2}
                    />
                  </group>
                  <group name="Bed5_3">
                    <mesh
                      name="Bed5_Bed_0_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.Bed5_Bed_0_3.geometry}
                      material={materials.material_11}
                    />
                  </group>
                  <group name="CurtainFrame_3">
                    <mesh
                      name="CurtainFrame_Metal_0_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.CurtainFrame_Metal_0_3.geometry}
                      material={materials.Metal}
                    />
                  </group>
                  <group name="CeilingLight_4">
                    <mesh
                      name="CeilingLight_Metal_0_4"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight_Metal_0_4.geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      name="CeilingLight_Emmision_0_4"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight_Emmision_0_4.geometry}
                      material={materials.Emmision}
                    />
                  </group>
                  <group name="Stand1_3">
                    <mesh
                      name="Stand1_Stand_0_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.Stand1_Stand_0_3.geometry}
                      material={materials.Stand}
                    />
                  </group>
                  <group name="ECG_Machine_3">
                    <mesh
                      name="ECG_Machine_ECG_Monitor_0_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.ECG_Machine_ECG_Monitor_0_3.geometry}
                      material={materials.ECG_Monitor}
                    />
                  </group>
                  <group name="Glass1_3">
                    <mesh
                      name="Glass1_Glass_0_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.Glass1_Glass_0_3.geometry}
                      material={materials.Glass}
                    />
                  </group>
                  <group name="Modutec_Power_Maquet_3">
                    <mesh
                      name="Modutec_Power_Maquet_Modutec_Power_Maquet1_0_3"
                      castShadow
                      receiveShadow
                      geometry={
                        nodes.Modutec_Power_Maquet_Modutec_Power_Maquet1_0_3
                          .geometry
                      }
                      material={materials.Modutec_Power_Maquet1}
                    />
                  </group>
                  <group name="Curtain2_4">
                    <mesh
                      name="Curtain2_Curtain_0_4"
                      castShadow
                      receiveShadow
                      geometry={nodes.Curtain2_Curtain_0_4.geometry}
                      material={materials.Curtain}
                    />
                  </group>
                  <group name="CeilingLight1_3">
                    <mesh
                      name="CeilingLight1_Metal_0_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight1_Metal_0_3.geometry}
                      material={materials.Metal}
                    />
                    <mesh
                      name="CeilingLight1_Emmision_0_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.CeilingLight1_Emmision_0_3.geometry}
                      material={materials.Emmision}
                    />
                  </group>
                  <group name="RoundStool_3">
                    <mesh
                      name="RoundStool_Stool_0_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.RoundStool_Stool_0_3.geometry}
                      material={materials.Stool}
                    />
                  </group>
                  <group name="Trolly_Table1_3">
                    <mesh
                      name="Trolly_Table1_TrollyTable1_0_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.Trolly_Table1_TrollyTable1_0_3.geometry}
                      material={materials.TrollyTable1}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
});

useGLTF.preload("/Models/Room/scene.gltf");
