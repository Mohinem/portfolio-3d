// src/components/MusicBuilding.tsx

import React, { useRef, useEffect } from "react";
import { RigidBody } from "@react-three/rapier";
import { useGLTF, Text } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

type MusicBuildingProps = {
  position: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  onClick: () => void;
  onCollisionWithCar?: () => void; // Callback when collision with car occurs
};

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

// **Define a custom interface for the collision event with optional userData**
interface CollisionHandlerEvent {
  other: {
    rigidBody?: {
      userData?: any;
    };
  };
}

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

  // **Ref and state for the text animation**
  const textRef = useRef<THREE.Object3D>(null);
  const { camera } = useThree();
  const hoverSpeed = 1; // Speed of the floating motion
  const hoverAmplitude = 0.03; // Height of the floating motion

  // **Animate the text and make it face the camera**
  useFrame((state, delta) => {
    if (textRef.current) {
      // Floating animation with adjusted base y-position
      textRef.current.position.y = baseYPosition + Math.sin(state.clock.elapsedTime * hoverSpeed) * hoverAmplitude;

      // Make text face the camera
      textRef.current.lookAt(camera.position);
    }
  });

  // **Define the base Y position based on the building's height**
  // Adjust this value based on your actual building model's height
  const baseYPosition = 0.7; // Example: 2.5 units above the group's origin

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
      onCollisionEnter={handleCollisionEnter} // Use the collision handler
    >
      {/* Clickable Group with Rotation and Scale */}
      <group onClick={onClick} scale={scale} rotation={rotation}>
        {/* Render the loaded GLTF scene */}
        <primitive object={gltf.scene} />

        {/* "Music" Text Label */}
        <Text
          ref={textRef}
          position={[0, baseYPosition, 0]} // Position just above the building
          font="/fonts/Montserrat-SemiBold.ttf" // Path to the font file in the public directory
          fontSize={0.05} // Reasonable font size for visibility
          color="#FFD700" // Gold color for the text
          anchorX="center" // Horizontal alignment
          anchorY="middle" // Vertical alignment
          outlineWidth={0.01} // Outline width for better visibility
          outlineColor="#000000" // Black outline to contrast with gold
          material-toneMapped={false} // Prevent color alteration
        >
          Music
        </Text>
      </group>
    </RigidBody>
  );
};

// Preload the GLTF model for performance optimization
useGLTF.preload("../src/assets/buildings/music-building.glb");

export default MusicBuilding;
