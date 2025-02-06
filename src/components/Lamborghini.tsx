// src/components/Lamborghini.tsx

import {
  useEffect,
  useRef,
  forwardRef,
  MutableRefObject
} from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { AudioListener, PositionalAudio, Group, Vector3, Quaternion } from "three";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";

interface LamborghiniProps {
  // Any additional props if necessary
}

const Lamborghini = forwardRef<RapierRigidBody, LamborghiniProps>((_, ref) => {
  // Load the Lamborghini model
  const gltf = useLoader(
    GLTFLoader,
    "../lamborghini_urus_car_gltf/scene.gltf"
  ) as any;

  const modelRef = useRef<Group>(null);
  const rigidBodyLocalRef = useRef<RapierRigidBody>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  const { camera } = useThree();

  // Assign the local ref to the forwarded ref
  useEffect(() => {
    if (rigidBodyLocalRef.current && ref) {
      if (typeof ref === "function") {
        ref(rigidBodyLocalRef.current);
      } else {
        (ref as MutableRefObject<RapierRigidBody | null>).current =
          rigidBodyLocalRef.current;
      }
    }
  }, [ref]);

  // Set userData = "car"
  useEffect(() => {
    if (rigidBodyLocalRef.current) {
      rigidBodyLocalRef.current.userData = "car";
    }
  }, []);

  // Initialize generated engine sound and attach it to the car model
  useEffect(() => {
    if (modelRef.current) {
      let listener = camera.getObjectByProperty("type", "AudioListener") as AudioListener;
      if (!listener) {
        listener = new AudioListener();
        camera.add(listener);
      }
      const engineAudio = new PositionalAudio(listener);
      const oscillator = listener.context.createOscillator();
      oscillator.type = 'sine'; // Using a sine wave for smoother, high-quality sound
      oscillator.frequency.value = 60; // Set idle frequency to 60 Hz (more audible)
      oscillator.start();
      oscillatorRef.current = oscillator;
      engineAudio.setNodeSource(oscillator);
      engineAudio.setLoop(true);
      engineAudio.setRefDistance(20);
      engineAudio.setVolume(0.15); // Slightly noticeable but not very loud
      engineAudio.play();
      modelRef.current.add(engineAudio);
    }
  }, [modelRef, camera]);

  // Track pressed keys
  const keysPressed = useRef<{ [key: string]: boolean }>({});

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressed.current[event.code] = true;

      // If 'R' is pressed, reset car position/rotation
      if (event.code === "KeyR" && rigidBodyLocalRef.current) {
        const body = rigidBodyLocalRef.current;
        // Reset translation
        body.setTranslation({ x: 0, y: 1, z: 0 }, true);
        // Reset rotation
        body.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
        // Clear velocities
        body.setLinvel({ x: 0, y: 0, z: 0 }, true);
        body.setAngvel({ x: 0, y: 0, z: 0 }, true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed.current[event.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Every frame
  useFrame(() => {
    if (!rigidBodyLocalRef.current) return;

    const body = rigidBodyLocalRef.current;

    // Movement/turning parameters
    const forceMagnitude = 0.6;
    const torqueMagnitude = 0.02;

    // Current orientation
    const { x, y, z, w } = body.rotation();
    const orientation = new Quaternion(x, y, z, w);

    // Forward vector in local -Z
    const forwardVector = new Vector3(0, 0, -1).applyQuaternion(orientation);

    // Forward/back movement
    if (keysPressed.current["KeyW"] || keysPressed.current["ArrowUp"]) {
      body.applyImpulse(
        {
          x: -forwardVector.x * forceMagnitude,
          y: 0,
          z: -forwardVector.z * forceMagnitude
        },
        true
      );
    }
    if (keysPressed.current["KeyS"] || keysPressed.current["ArrowDown"]) {
      body.applyImpulse(
        {
          x: forwardVector.x * forceMagnitude,
          y: 0,
          z: forwardVector.z * forceMagnitude
        },
        true
      );
    }

    // Left/right turning
    if (keysPressed.current["KeyA"] || keysPressed.current["ArrowLeft"]) {
      body.applyTorqueImpulse({ x: 0, y: torqueMagnitude, z: 0 }, true);
    }
    if (keysPressed.current["KeyD"] || keysPressed.current["ArrowRight"]) {
      body.applyTorqueImpulse({ x: 0, y: -torqueMagnitude, z: 0 }, true);
    }

    // Update engine sound frequency for realistic sound mechanics
    if (oscillatorRef.current) {
      let targetFreq = 60; // idle frequency
      if (keysPressed.current["KeyW"] || keysPressed.current["ArrowUp"]) {
        targetFreq = 120; // accelerating: increase frequency
      } else if (keysPressed.current["KeyS"] || keysPressed.current["ArrowDown"]) {
        targetFreq = 50; // reversing/braking: lower frequency
      }
      const currentFreq = oscillatorRef.current.frequency.value;
      const lerpFactor = 0.1;
      oscillatorRef.current.frequency.value = currentFreq + (targetFreq - currentFreq) * lerpFactor;
    }
  });

  // Once model is loaded, adjust scale
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.scale.set(2.5, 2.5, 2.5);
    }
  }, []);

  return (
    <RigidBody
      ref={rigidBodyLocalRef}
      mass={15000}
      position={[0, 1, 0]}
      colliders="hull"
      restitution={0.5}
      friction={1.8}
      linearDamping={30.0}
      angularDamping={250.0}
      // ** Lock X and Z rotations to prevent flipping **
      enabledRotations={[false, true, false]}
    >
      <primitive object={gltf.scene} ref={modelRef} castShadow />
    </RigidBody>
  );
});

export default Lamborghini;
