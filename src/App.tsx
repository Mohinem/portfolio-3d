// src/App.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState, Suspense, useEffect } from "react";
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

// 1) Hook to load Montserrat SemiBold from /fonts
function useFont() {
  useEffect(() => {
    const font = new FontFace(
      "MontserratSemiBold",
      'url("/fonts/Montserrat-SemiBold.ttf")'
    );
    font.load().then((loadedFace) => {
      document.fonts.add(loadedFace);
    });
  }, []);
}

// 2) HUD with improved visibility
function HUD() {
  useFont();

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        color: "yellow",
        fontFamily: "MontserratSemiBold, sans-serif",
        textAlign: "right",
        width: "300px",
        fontSize: "16px", // Bigger text
        userSelect: "none",
        pointerEvents: "none", // so it doesn't block clicks
        zIndex: 9999,

        // Highly visible background
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.6)",
      }}
    >
      Use <strong>W, A, S, D</strong> or arrow keys to move the car.
      <br />
      Press <strong>R</strong> to reset the car.
      <br />
      <br />
      To know more about me, click on the named buildings
      <br />
      or collide the car with them.
    </div>
  );
}

// 3) Main App
const App: React.FC = () => {
  const carRef = useRef<RapierRigidBody>(null);

  // Menus/Modals
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

            {/* Optional environment */}
            {/* <Sky ... /> */}

            {/* Orbit controls */}
            <OrbitControls
              minPolarAngle={Math.PI / 3.3}
              maxPolarAngle={Math.PI / 3}
              enablePan={false}
              enableZoom={true}
            />

            {/* Main light */}
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

            {/* Scene with buildings */}
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

      {/* HUD always on top */}
      <HUD />

      {/* Modals / Menus */}
      {isMusicPlayerOpen && (
        <MusicPlayer onClose={() => setMusicPlayerOpen(false)} />
      )}
      {isAboutMeMenuOpen && (
        <AboutMeMenu onClose={() => setAboutMeMenuOpen(false)} />
      )}
      {isEducationMenuOpen && (
        <EducationMenu onClose={() => setEducationMenuOpen(false)} />
      )}
      {isExperienceMenuOpen && (
        <ExperienceMenu onClose={() => setExperienceMenuOpen(false)} />
      )}
      {isProjectsMenuOpen && (
        <ProjectsMenu onClose={() => setProjectsMenuOpen(false)} />
      )}
      {isAchievementsMenuOpen && (
        <AchievementsMenu onClose={() => setAchievementsMenuOpen(false)} />
      )}
    </>
  );
};

export default App;
