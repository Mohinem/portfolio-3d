// src/components/MusicBuilding.tsx

import React from "react";
import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

type MusicBuildingProps = {
  position: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  onClick: () => void;
};

// Extend the GLTF interface to include specific nodes and materials if needed
type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

const MusicBuilding: React.FC<MusicBuildingProps> = ({
  position,
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  onClick,
}) => {
  // Load the GLB model from the assets directory
  const gltf = useGLTF("../src/assets/buildings/music-building.glb") as GLTFResult;

  // Optional: Log to verify model loading
  console.log("MusicBuilding loaded:", gltf);

  return (
    <RigidBody type="fixed" colliders="trimesh" position={position}>
      {/* Clickable Group with Rotation and Scale */}
      <group onClick={onClick} scale={scale} rotation={rotation}>
        {/* Render the loaded GLTF scene */}
        <primitive object={gltf.scene} />
      </group>
    </RigidBody>
  );
};

// Preload the GLTF model for performance optimization
useGLTF.preload("../src/assets/buildings/music-building.glb");

export default MusicBuilding;
