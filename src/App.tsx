import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState, Suspense } from "react";
import { Physics, RapierRigidBody } from "@react-three/rapier";

import Lamborghini from "./components/Lamborghini";
import ColorfulVillage from "./components/ColorfulVillage";
import CameraFollow from "./components/CameraFollow";
import MusicPlayer from "./components/MusicPlayer";
import AboutMeMenu from "./components/AboutMeMenu";
import EducationMenu from "./components/EducationMenu";
import ExperienceMenu from "./components/ExperienceMenu";
import ProjectsMenu from "./components/ProjectsMenu";
import AchievementsMenu from "./components/AchievementsMenu";
import LoadingScreen from "./components/LoadingScreen";

const App: React.FC = () => {
  const carRef = useRef<RapierRigidBody>(null);

  // State to manage modals/menus
  const [isMusicPlayerOpen, setMusicPlayerOpen] = useState(false);
  const [isAboutMeMenuOpen, setAboutMeMenuOpen] = useState(false);
  const [isEducationMenuOpen, setEducationMenuOpen] = useState(false);
  const [isExperienceMenuOpen, setExperienceMenuOpen] = useState(false);
  const [isProjectsMenuOpen, setProjectsMenuOpen] = useState(false);
  const [isAchievementsMenuOpen, setAchievementsMenuOpen] = useState(false);

  return (
    <>
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        shadows
        camera={{ position: [0, 5, 10], fov: 60 }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <Physics gravity={[0, -9.81, 0]}>
            {/* Car */}
            <Lamborghini ref={carRef} />

            {/* Optional sky or environment can go here */}
            {/* <Sky ... /> */}

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

            {/* Main Scene */}
            <ColorfulVillage
              onOpenMusicPlayer={() => setMusicPlayerOpen(true)}
              onOpenAboutMeMenu={() => setAboutMeMenuOpen(true)}
              onOpenEducationMenu={() => setEducationMenuOpen(true)}
              onOpenExperienceMenu={() => setExperienceMenuOpen(true)}
              onOpenProjectsMenu={() => setProjectsMenuOpen(true)}
              onOpenAchievementsMenu={() => setAchievementsMenuOpen(true)}
            />

            {/* Camera follows the car */}
            <CameraFollow target={carRef} offset={[0, 5, 10]} />
          </Physics>
        </Suspense>
      </Canvas>

      {/* Music Player UI */}
      {isMusicPlayerOpen && (
        <MusicPlayer onClose={() => setMusicPlayerOpen(false)} />
      )}

      {/* About Me Menu UI */}
      {isAboutMeMenuOpen && (
        <AboutMeMenu onClose={() => setAboutMeMenuOpen(false)} />
      )}

      {/* Education Menu UI */}
      {isEducationMenuOpen && (
        <EducationMenu onClose={() => setEducationMenuOpen(false)} />
      )}

      {/* Experience Menu UI */}
      {isExperienceMenuOpen && (
        <ExperienceMenu onClose={() => setExperienceMenuOpen(false)} />
      )}

      {/* Projects Menu UI */}
      {isProjectsMenuOpen && (
        <ProjectsMenu onClose={() => setProjectsMenuOpen(false)} />
      )}

      {/* Achievements Menu UI */}
      {isAchievementsMenuOpen && (
        <AchievementsMenu onClose={() => setAchievementsMenuOpen(false)} />
      )}
    </>
  );
};

export default App;
