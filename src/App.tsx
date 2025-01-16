import { Canvas } from "@react-three/fiber";
import { Sky, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { Physics, RapierRigidBody } from "@react-three/rapier";

import Lamborghini from './components/Lamborghini';
import ColorfulVillage from './components/ColorfulVillage';
import CameraFollow from "./components/CameraFollow";

export default function App() {
  const carRef = useRef<RapierRigidBody>(null);

  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      shadows
      camera={{ position: [0, 5, 10], fov: 60 }}
    >
      <Physics gravity={[0, -9.81, 0]}>
        {/* Lamborghini car */}
        <Lamborghini ref={carRef} />

        {/* Sky setup
        <Sky
          distance={100}
          sunPosition={[0, 1, 0]}
          inclination={0}
          azimuth={0.25}
          turbidity={10}
          rayleigh={0.9}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
        /> */}

        {/* Orbit controls */}
        <OrbitControls
          minPolarAngle={Math.PI / 3.3}
          maxPolarAngle={Math.PI / 3}
          enablePan={false}
          enableZoom={true}
        />

        {/* Directional light */}
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* Camera Follow */}
        

        {/* Floor */}
        <ColorfulVillage />

        <CameraFollow target={carRef} offset={[0, 5, 10]} />
        
      </Physics>
    </Canvas>
  );
}
