import { Canvas  } from "@react-three/fiber";
import { PlaneGeometry } from "three";
import { OrbitControls, Stage, Sky, Cloud } from "@react-three/drei";
// import {  } from "three";
import { Vehicle } from '@types/yuka';


export default function App() {
return (
    <Canvas style={{ width: '100vw', height: '100vh' }} > 

      {/* <mesh><Sky></Sky></mesh> */}


      <Sky distance={100}
        sunPosition={[0, 1, 0]} // Sun directly overhead
        inclination={0} // Sun at zenith
        azimuth={0.25} // Sun in the south
        turbidity={10} // Low turbidity for clear sky
        rayleigh={0.9} // Enhances blue scattering
        mieCoefficient={0.005}
        mieDirectionalG={0.8} />

      {/*Cloud mesh */}
      <mesh><Cloud color = "white" position={[3, 5, 4]}></Cloud> </mesh>
      
      {/* Orbit Controls with Restricted Polar Angles */}
      <OrbitControls
        minPolarAngle={0} // Allow looking straight up
        maxPolarAngle={28349043} // Prevent looking below the horizon
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
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100, 100, 100]} />
        <meshBasicMaterial color="green" />
      </mesh>


    </Canvas>
);
}