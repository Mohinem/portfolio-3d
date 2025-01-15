import { Canvas, useLoader  } from "@react-three/fiber";
import { PlaneGeometry } from "three";
import { OrbitControls, Stage, Sky, Cloud, useGLTF } from "@react-three/drei";
// import {  } from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Vehicle } from 'yuka';

import { Physics, RigidBody} from "@react-three/rapier";

import Lamborghini from './components/Lamborghini';

// import {lamborghini} from "../src/assets/lamborghini.gltf";


export default function App() {
  const gltf = useLoader(GLTFLoader, "../src/assets/lamborghini_urus_car_gltf/scene.gltf");
return (
    
    <Canvas style={{ width: '100vw', height: '100vh' }} > 

      {/* <mesh><Sky></Sky></mesh> */}

      {/* lamborghini = useGLTF(); */}
      <Physics gravity={[0, -9.81, 0]}>

      {/* <RigidBody><primitive object={gltf.scene} position={[0, 0.5, 0]}/></RigidBody> */}
      <Lamborghini /> 
        {/* console.log("Katta"); */}

        <Sky distance={100}
          sunPosition={[0, 1, 0]} // Sun directly overhead
          inclination={0} // Sun at zenith
          azimuth={0.25} // Sun in the south
          turbidity={10} // Low turbidity for clear sky
          rayleigh={0.9} // Enhances blue scattering
          mieCoefficient={0.005}
          mieDirectionalG={0.8} />

        {/*Cloud mesh */}
        {/* <mesh><Cloud color = "pink" position={[30, 5, 40]}></Cloud> </mesh> */}

        <mesh></mesh>
        
        {/* Orbit Controls with Restricted Polar Angles */}
        <OrbitControls
          minPolarAngle={Math.PI / 3.3} // Allow looking straight up
          maxPolarAngle={Math.PI / 3} // Prevent looking below the horizon
          enablePan={false} // Optional: Disable panning if not needed
          enableZoom={true} // Optional: Allow zooming
        />

        {/* Directional Light: Simulates sunlight */}
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

        {/* Floor */}
        <RigidBody type="fixed">
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[100, 100, 100, 100]} />
            <meshBasicMaterial color="green" />
          </mesh>
        </RigidBody>
      </Physics>


    </Canvas>
);
}