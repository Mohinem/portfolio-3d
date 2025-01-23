import { Canvas } from "@react-three/fiber";
import { Sky, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { Physics, RapierRigidBody } from "@react-three/rapier";

import Lamborghini from './components/Lamborghini';
import ColorfulVillage from './components/ColorfulVillage';
import CameraFollow from "./components/CameraFollow";
import MusicPlayer from "./components/MusicPlayer"; // Import MusicPlayer
import AboutMeMenu from "./components/AboutMeMenu"; // Import About Me menu
import EducationMenu from "./components/EducationMenu"; // Import Education menu
import ExperienceMenu from "./components/ExperienceMenu"; // Import Experience menu
import ProjectsMenu from "./components/ProjectsMenu"; // Import Projects menu
import AchievementsMenu from "./components/AchievementsMenu"; // Import Achievements menu
 
const App: React.FC = () => {
  const carRef = useRef<RapierRigidBody>(null);
    // State to manage MusicPlayer visibility
    const [isMusicPlayerOpen, setMusicPlayerOpen] = useState(false);

    // State to manage AboutMeMenu visibility
    const [isAboutMeMenuOpen, setAboutMeMenuOpen] = useState(false);

    // State to manage EducationMenu visibility
    const [isEducationMenuOpen, setEducationMenuOpen] = useState(false);

    // State to manage ExperienceMenu visibility
    const [isExperienceMenuOpen, setExperienceMenuOpen] = useState(false);

    // State to manage ProjectsMenu visibility
    const [isProjectsMenuOpen, setProjectsMenuOpen] = useState(false);

    // State to manage AchievementsMenu visibility
    const [isAchievementsMenuOpen, setAchievementsMenuOpen] = useState(false);
  return (
    <>
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
          

          {/* Main Scene */}
          <ColorfulVillage onOpenMusicPlayer={() => setMusicPlayerOpen(true)} 
            onOpenAboutMeMenu={() => setAboutMeMenuOpen(true)}
            onOpenEducationMenu={() => setEducationMenuOpen(true)}
            onOpenExperienceMenu={() => setExperienceMenuOpen(true)}
            onOpenProjectsMenu={() => setProjectsMenuOpen(true)}
            onOpenAchievementsMenu={() => setAchievementsMenuOpen(true)}
          />

          <CameraFollow target={carRef} offset={[0, 5, 10]} />
          
        </Physics>
      </Canvas>

      {/* Music Player UI - Rendered Outside Canvas */}
      {isMusicPlayerOpen && (
        <MusicPlayer onClose={() => setMusicPlayerOpen(false)} />
      )}

      {/* About Me Menu UI - Rendered Outside Canvas */}
      {isAboutMeMenuOpen && (
        <AboutMeMenu onClose={() => setAboutMeMenuOpen(false)} />
      )}

      {/* Education Menu UI - Rendered Outside Canvas */}
      {isEducationMenuOpen && (
        <EducationMenu onClose={() => setEducationMenuOpen(false)} />
      )}

      {/* Experience Menu UI - Rendered Outside Canvas */}
      {isExperienceMenuOpen && (
        <ExperienceMenu onClose={() => setExperienceMenuOpen(false)} />
      )}

      {/* Projects Menu UI - Rendered Outside Canvas */}
      {isProjectsMenuOpen && (
        <ProjectsMenu onClose={() => setProjectsMenuOpen(false)} />
      )}

      {/* Achievements Menu UI - Rendered Outside Canvas */}
      {isAchievementsMenuOpen && (
        <AchievementsMenu onClose={() => setAchievementsMenuOpen(false)} />
      )}      
    </>
  );
}

export default App;