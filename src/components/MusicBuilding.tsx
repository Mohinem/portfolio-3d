// src/components/MusicBuilding.tsx

import React, { useRef, useEffect } from "react";
import { RigidBody } from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import * as THREE from "three";

type MusicBuildingProps = {
  position: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  onClick: () => void;
  onCollisionWithCar?: () => void; // Added prop
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
  onCollisionWithCar,
}) => {
  // Load the GLB model from the assets directory
  const gltf = useGLTF("../src/assets/buildings/music-building.glb") as GLTFResult;

  // Optional: Log to verify model loading
  console.log("MusicBuilding loaded:", gltf);

  // **Prevent multiple triggers during continuous collisions**
  const hasCollided = useRef(false);

  // **Handle collision events with 'any' type to bypass TypeScript errors**
  const handleCollisionEnter = (event: any) => {
    const otherBody = event.other.rigidBody;
    if (otherBody && otherBody.userData === "car" && !hasCollided.current) {
      hasCollided.current = true; // Prevent multiple triggers
      onCollisionWithCar && onCollisionWithCar();
    }
  };

  // Optionally, reset the collision flag when necessary
  useEffect(() => {
    if (!onCollisionWithCar) {
      hasCollided.current = false;
    }
  }, [onCollisionWithCar]);

  return (
    <RigidBody
      type="fixed"
      colliders="trimesh"
      position={position}
      onCollisionEnter={handleCollisionEnter} // Use the handler
    >
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
