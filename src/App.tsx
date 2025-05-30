// src/App.tsx
import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
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

// 2) HUD with conditional content for mobile vs desktop
interface HUDProps {
  isMobile: boolean;
}
function HUD({ isMobile }: HUDProps) {
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
        fontSize: "16px",
        userSelect: "none",
        pointerEvents: "none",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.6)",
      }}
    >
      {isMobile ? (
        <>
          Use <strong>on-screen arrows</strong> to move the car.
          <br />
          <br />
          To know more about me, tap the named buildings
          <br />
          or collide the car with them.
        </>
      ) : (
        <>
          Use <strong>W, A, S, D</strong> or arrow keys to move the car.
          <br />
          Press <strong>R</strong> to reset the car.
          <br />
          <br />
          To know more about me, click on the named buildings
          <br />
          or collide the car with them.
        </>
      )}
    </div>
  );
}

// 3) Main App
const App: React.FC = () => {
  const carRef = useRef<RapierRigidBody>(null);

  // Menus/Modals state
  const [isMusicPlayerOpen, setMusicPlayerOpen] = useState(false);
  const [isAboutMeMenuOpen, setAboutMeMenuOpen] = useState(false);
  const [isEducationMenuOpen, setEducationMenuOpen] = useState(false);
  const [isExperienceMenuOpen, setExperienceMenuOpen] = useState(false);
  const [isProjectsMenuOpen, setProjectsMenuOpen] = useState(false);
  const [isAchievementsMenuOpen, setAchievementsMenuOpen] = useState(false);

  // detect touch device
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const touch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      setIsMobile(touch);
    }
  }, []);

  return (
    <>
      <Canvas style={{ width: "100vw", height: "100vh" }} shadows camera={{ position: [0, 5, 10], fov: 60 }}>
        <Suspense fallback={<LoadingScreen />}>
          <Physics gravity={[0, -9.81, 0]}>
            {/* Car */}
            <Lamborghini ref={carRef} />

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
      <HUD isMobile={isMobile} />

      {/* Mobile touch controls with pointer capture */}
      {isMobile && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            display: "grid",
            gridTemplateColumns: "60px 60px 60px",
            gridTemplateRows: "60px 60px",
            gap: 10,
            userSelect: "none",
            touchAction: "none",
          }}
        >
          <div />
          <button
            style={{ fontSize: 24 }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              window.dispatchEvent(
                new KeyboardEvent("keydown", { code: "KeyW" })
              );
            }}
            onPointerUp={(e) => {
              window.dispatchEvent(
                new KeyboardEvent("keyup", { code: "KeyW" })
              );
              e.currentTarget.releasePointerCapture(e.pointerId);
            }}
            onPointerCancel={(e) => {
              window.dispatchEvent(
                new KeyboardEvent("keyup", { code: "KeyW" })
              );
            }}
          >
            ↑
          </button>
          <div />

          <button
            style={{ fontSize: 24 }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              window.dispatchEvent(
                new KeyboardEvent("keydown", { code: "KeyA" })
              );
            }}
            onPointerUp={(e) => {
              window.dispatchEvent(
                new KeyboardEvent("keyup", { code: "KeyA" })
              );
              e.currentTarget.releasePointerCapture(e.pointerId);
            }}
            onPointerCancel={(e) => {
              window.dispatchEvent(
                new KeyboardEvent("keyup", { code: "KeyA" })
              );
            }}
          >
            ←
          </button>
          <button
            style={{ fontSize: 24 }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              window.dispatchEvent(
                new KeyboardEvent("keydown", { code: "KeyS" })
              );
            }}
            onPointerUp={(e) => {
              window.dispatchEvent(
                new KeyboardEvent("keyup", { code: "KeyS" })
              );
              e.currentTarget.releasePointerCapture(e.pointerId);
            }}
            onPointerCancel={(e) => {
              window.dispatchEvent(
                new KeyboardEvent("keyup", { code: "KeyS" })
              );
            }}
          >
            ↓
          </button>
          <button
            style={{ fontSize: 24 }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              window.dispatchEvent(
                new KeyboardEvent("keydown", { code: "KeyD" })
              );
            }}
            onPointerUp={(e) => {
              window.dispatchEvent(
                new KeyboardEvent("keyup", { code: "KeyD" })
              );
              e.currentTarget.releasePointerCapture(e.pointerId);
            }}
            onPointerCancel={(e) => {
              window.dispatchEvent(
                new KeyboardEvent("keyup", { code: "KeyD" })
              );
            }}
          >
            →
          </button>
        </div>
      )}

      {/* Modals / Menus */}
      {isMusicPlayerOpen && <MusicPlayer onClose={() => setMusicPlayerOpen(false)} />}
      {isAboutMeMenuOpen && <AboutMeMenu onClose={() => setAboutMeMenuOpen(false)} />}
      {isEducationMenuOpen && <EducationMenu onClose={() => setEducationMenuOpen(false)} />}
      {isExperienceMenuOpen && <ExperienceMenu onClose={() => setExperienceMenuOpen(false)} />}
      {isProjectsMenuOpen && <ProjectsMenu onClose={() => setProjectsMenuOpen(false)} />}
      {isAchievementsMenuOpen && <AchievementsMenu onClose={() => setAchievementsMenuOpen(false)} />}
    </>
  );
};

export default App;
