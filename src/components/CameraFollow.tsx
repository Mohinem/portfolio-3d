// src/components/CameraFollow.tsx

import React from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RapierRigidBody } from '@react-three/rapier';
import { Vector3, Quaternion } from 'three';

interface CameraFollowProps {
  target: React.RefObject<RapierRigidBody>;
  offset?: [number, number, number]; // [x, y, z] offset from the car
}

const CameraFollow: React.FC<CameraFollowProps> = ({ target, offset = [0, 5, 10] }) => {
  const { camera } = useThree();

  useFrame(() => {
    if (target.current) {
      // Get the car's current position and rotation
      const carPosition = target.current.translation();
      const carRotation = target.current.rotation();

      // Convert rotation to Quaternion
      const orientation = new Quaternion(carRotation.x, carRotation.y, carRotation.z, carRotation.w);

      // Calculate the forward direction of the car
      const forward = new Vector3(0, 0, -1).applyQuaternion(orientation);

      // Desired camera position: behind and above the car
      const desiredPosition = new Vector3()
        .copy(carPosition)
        .add(forward.clone().multiplyScalar(-offset[2])) // Behind the car
        .add(new Vector3(offset[0], offset[1], 0));      // Above the car

      // Smoothly interpolate the camera's position
      camera.position.lerp(desiredPosition, 0.1); // Adjust the lerp factor for smoothness

      // Make the camera look at the car's position
      camera.lookAt(carPosition.x, carPosition.y, carPosition.z);
    }
  });

  return null; // This component doesn't render anything
};

export default CameraFollow;
