import { Canvas } from "@react-three/fiber";

export default function App() {
return (
    <Canvas>
      <mesh>
        <boxGeometry args={[2, 2, 3]} />
        <meshPhongMaterial />
      </mesh>
      <ambientLight intensity={0.9} />
      <directionalLight position={[0, 0, 29]} color="blue" />
    </Canvas>
);
}