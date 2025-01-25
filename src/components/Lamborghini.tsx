// src/components/Lamborghini.tsx

import {
  useEffect,
  useRef,
  forwardRef,
  MutableRefObject
} from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { Group, Vector3, Quaternion } from "three";

interface LamborghiniProps {
  // Define any additional props if necessary
}

const Lamborghini = forwardRef<RapierRigidBody, LamborghiniProps>((_, ref) => {
  // Load the Lamborghini model
  const gltf = useLoader(
    GLTFLoader,
    "../src/assets/lamborghini_urus_car_gltf/scene.gltf"
  ) as any;

  const modelRef = useRef<Group>(null);
  const rigidBodyLocalRef = useRef<RapierRigidBody>(null);

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

  // **Directly assign userData**
  useEffect(() => {
    if (rigidBodyLocalRef.current) {
      rigidBodyLocalRef.current.userData = "car"; // Correct assignment
    }
  }, []);

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

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // UseFrame runs on every animation frame
  useFrame(() => {
    if (!rigidBodyLocalRef.current) return;

    const body = rigidBodyLocalRef.current;

    // Movement/turning parameters (tweak to adjust realism)
    const forceMagnitude = 0.6;     // stronger forward/back force
    const torqueMagnitude = 0.02;   // stronger turning torque

    // Get the car's current orientation
    const { x, y, z, w } = body.rotation();
    const orientation = new Quaternion(x, y, z, w);

    // Forward vector in local Z- direction in Three.js, apply orientation
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
  });

  // Adjust the model’s scale or rotation once it’s loaded
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.scale.set(2.5, 2.5, 2.5);
      // modelRef.current.rotation.y = Math.PI; // if needed
    }
  }, []);

  return (
    <RigidBody
      ref={rigidBodyLocalRef}
      mass={15000}            // approximate mass (kg)
      position={[0, 1, 0]}
      colliders="hull"
      restitution={0.5}         // bounciness
      friction={1.8}          // higher friction to reduce sliding
      linearDamping={30.0}    // mild damping to slow rolling
      angularDamping={250.0}  // helps reduce flips/spins
    >
      <primitive object={gltf.scene} ref={modelRef} castShadow />
    </RigidBody>
  );
});

export default Lamborghini;
