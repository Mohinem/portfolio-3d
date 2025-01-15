// src/components/Lamborghini.tsx

import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useLoader } from '@react-three/fiber';
import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { Group, Vector3, Quaternion } from 'three';

const Lamborghini: React.FC = () => {
  // Load the Lamborghini model from the public (or src) directory
  // Make sure your model is in ../src/assets/lamborghini_urus_car_gltf/scene.gltf
  const gltf = useLoader(GLTFLoader, "../src/assets/lamborghini_urus_car_gltf/scene.gltf") as any;

  const modelRef = useRef<Group>(null);
  const rigidBodyRef = useRef<RapierRigidBody>(null);

  // Track pressed keys
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  // Set up keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressed.current[event.code] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed.current[event.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // UseFrame runs on every animation frame
  useFrame(() => {
    if (!rigidBodyRef.current) return;

    const body = rigidBodyRef.current;

    // Movement and turning parameters
    const forceMagnitude = 0.02;     // Force to move forward/backward
    const torqueMagnitude = 0.002;    // Torque to turn left/right

    // 1. Get the car's current orientation as a Quaternion
    const { x, y, z, w } = body.rotation(); // rapier returns { x, y, z, w }
    const orientation = new Quaternion(x, y, z, w);

    // 2. Create a forward vector (Z- axis in Three.js) and apply the car's current orientation
    const forwardVector = new Vector3(0, 0, -1).applyQuaternion(orientation);

    // Movement (W / S / ArrowUp / ArrowDown)
    if (keysPressed.current['KeyW'] || keysPressed.current['ArrowUp']) {
      // Apply forward impulse in the direction the car is facing
      body.applyImpulse(
        { x: -forwardVector.x * forceMagnitude, y: 0, z: -forwardVector.z * forceMagnitude },
        true
      );
    }

    if (keysPressed.current['KeyS'] || keysPressed.current['ArrowDown']) {
      // Apply backward impulse
      body.applyImpulse(
        { x: forwardVector.x * forceMagnitude, y: 0, z: forwardVector.z * forceMagnitude },
        true
      );
    }

    // Steering (A / D / ArrowLeft / ArrowRight)
    // Instead of turning in world space, we'll apply torque around the local Y-axis.
    // That means a positive Y torque turns left, negative Y torque turns right.
    if (keysPressed.current['KeyA'] || keysPressed.current['ArrowLeft']) {
      body.applyTorqueImpulse({ x: 0, y: torqueMagnitude, z: 0 }, true);
    }
    if (keysPressed.current['KeyD'] || keysPressed.current['ArrowRight']) {
      body.applyTorqueImpulse({ x: 0, y: -torqueMagnitude, z: 0 }, true);
    }
  });

  // Adjust the model’s scale or rotation once it’s loaded
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.scale.set(0.5, 0.5, 0.5);
      // modelRef.current.rotation.y = Math.PI; // Rotate if needed
    }
  }, []);

  return (
    <RigidBody
      ref={rigidBodyRef}
      mass={1500}           // Approximate mass of a car in kg
      position={[0, 1, 0]} // Start slightly above the ground
      colliders="hull"      // Use hull colliders for a convex shape
      restitution={0.1}     // Bounciness
      friction={2.0}        // Increase friction to reduce sliding
    >
      <primitive object={gltf.scene} ref={modelRef} castShadow />
    </RigidBody>
  );
};

export default Lamborghini;
