// src/components/AboutMeBuilding.tsx

import React, { useRef, useState, useMemo } from "react";
import { RigidBody } from "@react-three/rapier";
import { useGLTF, Text } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

type AboutMeBuildingProps = {
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

const AboutMeBuilding: React.FC<AboutMeBuildingProps> = ({
  position,
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  onClick,
  onCollisionWithCar,
}) => {
  // Load the GLB model from the assets directory
  const gltf = useGLTF("../src/assets/buildings/about-me-building.glb") as GLTFResult;

  // Optional: Log to verify model loading
  console.log("AboutMeBuilding loaded:", gltf);

  // **Handle collision events without using hasCollided**
  const handleCollisionEnter = (event: CollisionHandlerEvent) => {
    const otherBody = event.other.rigidBody;
    if (otherBody && otherBody.userData === "car") {
      onCollisionWithCar && onCollisionWithCar();
    }
  };

  // **Ref and state for the text animation**
  const textRef = useRef<THREE.Object3D>(null);
  const { camera } = useThree();
  const hoverSpeed = 1; // Speed of the floating motion
  const hoverAmplitude = 0.1; // Height of the floating motion

  // **Define the base Y position based on the building's height**
  const baseYPosition = 900; // Adjusted to position the text above the building

  // **Animate the text and make it face the camera**
  useFrame((state) => {
    if (textRef.current) {
      // Floating animation with adjusted base y-position
      textRef.current.position.y =
        baseYPosition + Math.sin(state.clock.elapsedTime * hoverSpeed) * hoverAmplitude;

      // Make text face the camera
      textRef.current.lookAt(camera.position);
    }
  });

  // **Hover state to control the outline visibility**
  const [hovered, setHovered] = useState(false);

  // **Event handlers for pointer events**
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  // **Create a duplicated scene for the outline effect**
  const outlineScene = useMemo(() => {
    // Clone the original GLTF scene
    const clonedScene = gltf.scene.clone();

    // Traverse the cloned scene to apply the outline material
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // Replace the material with a basic material for the outline
        mesh.material = new THREE.MeshBasicMaterial({
          color: "#FFD700", // Gold color for the outline
          side: THREE.BackSide, // Render the back side to create the outline behind
        });
      }
    });

    return clonedScene;
  }, [gltf.scene]);

  return (
    <RigidBody
      type="fixed"
      colliders="trimesh"
      position={position}
      onCollisionEnter={handleCollisionEnter} // Use the updated collision handler
    >
      {/* Clickable Group with Rotation and Scale */}
      <group
        onClick={onClick}
        scale={scale}
        rotation={rotation}
        onPointerOver={handlePointerOver} // Handle pointer over
        onPointerOut={handlePointerOut} // Handle pointer out
      >
        {/* Render the original loaded GLTF scene */}
        <primitive object={gltf.scene} />

        {/* Conditionally render the outline scene when hovered */}
        {hovered && (
          <primitive
            object={outlineScene}
            scale={[1.05, 1.05, 1.05]} // Slightly larger scale for the outline
          />
        )}

        {/* "About Me" Text Label */}
        <Text
          ref={textRef}
          position={[-350, baseYPosition, 0]} // Adjust Y value to place the text above the building
          font="/fonts/Montserrat-SemiBold.ttf" // Path to the font file in the public directory
          fontSize={70} // Required font size for visibility
          color="#FFD700" // Gold color for the text
          anchorX="center" // Horizontal alignment
          anchorY="top-baseline" // Vertical alignment
          outlineWidth={10} // Outline width for better visibility
          outlineColor="#000000" // Black outline to contrast with gold
          material-toneMapped={false} // Prevent color alteration
        >
          About Me
        </Text>
      </group>
    </RigidBody>
  );
};

// Preload the GLTF model for performance optimization
useGLTF.preload("../src/assets/buildings/about-me-building.glb");

export default AboutMeBuilding;
