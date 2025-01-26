import React, { useMemo } from "react";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { Vector3 } from "three";
import MusicBuilding from "./MusicBuilding";
import AboutMeBuilding from "./AboutMeBuilding";
import EducationBuilding from "./EducationBuilding";
import ExperienceBuilding from "./ExperienceBuilding";
import ProjectsBuilding from "./ProjectsBuilding";
import AchievementsBuilding from "./AchievementsBuilding";

type ColorfulVillageProps = {
  onOpenMusicPlayer: () => void; // Handler prop
  onOpenAboutMeMenu: () => void; // Handler prop
  onOpenEducationMenu: () => void; // Handler prop
  onOpenExperienceMenu: () => void; // Handler prop
  onOpenProjectsMenu: () => void; // Handler prop
  onOpenAchievementsMenu: () => void; // Handler prop
};

/**
 * Utility: Creates a CanvasTexture by drawing on an in-memory <canvas>.
 */
function createCanvasTexture(
  size: number,
  drawFn: (ctx: CanvasRenderingContext2D, size: number) => void,
  repeatX = 1,
  repeatY = 1
) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  drawFn(ctx, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  return texture;
}

/**
 * ------------------------------------------------
 * 1) "10000x" FASTER PROCEDURAL TEXTURES (REDUCED)
 * ------------------------------------------------
 */

/** Rich, layered grass texture but with drastically smaller size/loops */
function useImprovedGrassTexture() {
  return React.useMemo(() => {
    // Reduced from 2048 -> 64, drastically fewer speckles
    return createCanvasTexture(
      64,
      (ctx, size) => {
        // 1) Base gradient
        const grad = ctx.createLinearGradient(0, 0, 0, size);
        grad.addColorStop(0, "#2e7d32"); // top: dark green
        grad.addColorStop(1, "#66bb6a"); // bottom: lighter
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);

        // 2) Add random speckles
        // Reduced from size * 1200 => size * 3
        for (let i = 0; i < size * 3; i++) {
          const x = Math.random() * size;
          const y = Math.random() * size;
          const hue = 100 + Math.random() * 20;
          const light = 40 + Math.random() * 40;
          ctx.fillStyle = `hsl(${hue},60%,${light}%)`;
          ctx.fillRect(x, y, 1, 1);
        }

        // 3) Subtle radial shading
        ctx.save();
        ctx.globalAlpha = 0.2;
        const radialGrad = ctx.createRadialGradient(
          size / 2,
          size / 2,
          size * 0.1,
          size / 2,
          size / 2,
          size * 0.5
        );
        radialGrad.addColorStop(0, "rgba(255,255,255,0.2)");
        radialGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = radialGrad;
        ctx.fillRect(0, 0, size, size);
        ctx.restore();

        // 4) Horizontal streaks (low overhead, keep them)
        ctx.globalAlpha = 0.15;
        ctx.strokeStyle = "rgba(0, 60, 0, 0.3)";
        ctx.lineWidth = 2;
        for (let y = 0; y < size; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y + Math.random() * 5);
          ctx.lineTo(size, y + Math.random() * 5);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      },
      3,
      3
    );
  }, []);
}

/** Leaves texture (much smaller/faster) */
function useImprovedLeavesTexture() {
  return React.useMemo(() => {
    // Reduced from 1024 -> 64
    return createCanvasTexture(
      64,
      (ctx, size) => {
        const grad = ctx.createLinearGradient(0, 0, 0, size);
        grad.addColorStop(0, "#1e7f39");
        grad.addColorStop(1, "#4caf50");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);

        // Add specks
        // Reduced from size * 160 => size * 2
        for (let i = 0; i < size * 2; i++) {
          const x = Math.random() * size;
          const y = Math.random() * size;
          ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.25})`;
          ctx.beginPath();
          ctx.arc(x, y, Math.random() * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      },
      2,
      2
    );
  }, []);
}

/** Bark texture (vertical ridges, color variations), smaller loops */
function useImprovedBarkTexture() {
  return React.useMemo(() => {
    // Reduced from 1024 -> 64
    return createCanvasTexture(64, (ctx, size) => {
      // Base fill: mid-brown
      ctx.fillStyle = "#8d6e63";
      ctx.fillRect(0, 0, size, size);

      // Vertical ridges
      // Reduced from i=0..100 => i=0..3
      ctx.strokeStyle = "#5d4037";
      ctx.lineWidth = 3;
      for (let i = 0; i < 3; i++) {
        let x = (i * size) / 3 + Math.random() * 5;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        for (let y = 0; y < size; y += 15) {
          x += (Math.random() - 0.5) * 10;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Dark spots (knots)
      // Reduced from 600 => 20
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        ctx.fillStyle = "rgba(60,40,30,0.5)";
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 5 + 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }, []);
}

/** Water texture: drastically smaller canvas & fewer loops */
function useImprovedWaterTexture() {
  return React.useMemo(() => {
    // Reduced from 2048 -> 64
    return createCanvasTexture(
      64,
      (ctx, size) => {
        const grad = ctx.createLinearGradient(0, 0, 0, size);
        grad.addColorStop(0, "#1565c0"); // Deeper
        grad.addColorStop(1, "#4fc3f7"); // Lighter
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);

        // Wavy lines: reduced from 160 => 5
        ctx.strokeStyle = "rgba(255,255,255,0.4)";
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
          let x = 0;
          const y = (i * size) / 5 + Math.random() * 2;
          ctx.beginPath();
          ctx.moveTo(x, y);
          while (x < size) {
            x += 15;
            const wave = Math.sin(x / 25) * 8;
            ctx.lineTo(x, y + wave);
          }
          ctx.stroke();
        }

        // Foam patches: reduced from 160 => 5
        for (let i = 0; i < 5; i++) {
          const x = Math.random() * size;
          const y = Math.random() * size;
          ctx.fillStyle = `rgba(255,255,255,${0.2 + Math.random() * 0.2})`;
          ctx.beginPath();
          ctx.arc(x, y, Math.random() * 10 + 5, 0, Math.PI * 2);
          ctx.fill();
        }
      },
      2,
      2
    );
  }, []);
}

/** Animal fur/skin: smaller size & loops */
function useImprovedAnimalTexture() {
  return React.useMemo(() => {
    // Reduced from 1024 -> 64
    return createCanvasTexture(
      64,
      (ctx, size) => {
        // Base color
        ctx.fillStyle = `hsl(${Math.random() * 60}, 50%, 75%)`;
        ctx.fillRect(0, 0, size, size);

        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = "#000";
        ctx.fillStyle = "#000";
        ctx.lineWidth = 3;

        // Random stripes: originally spaced by 20 row, keep minimal overhead
        // We'll keep them but the smaller canvas means fewer lines anyway
        for (let y = 0; y < size; y += 32) {
          ctx.beginPath();
          ctx.moveTo(0, y + Math.random() * 5);
          let x = 0;
          while (x < size) {
            x += 10;
            const wiggle = Math.sin(x / 15) * 5;
            ctx.lineTo(x, y + wiggle + Math.random() * 2);
          }
          ctx.stroke();
        }

        // Random spots: reduced from 1200 => 20
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * size;
          const y = Math.random() * size;
          ctx.beginPath();
          ctx.arc(x, y, Math.random() * 4 + 1, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;
      },
      2,
      2
    );
  }, []);
}

/** Mountain rock with snow on top: smaller & fewer loops */
function useImprovedMountainTexture() {
  return React.useMemo(() => {
    // Reduced from 2048 -> 64
    return createCanvasTexture(
      64,
      (ctx, size) => {
        // Gradient from white to gray
        const grad = ctx.createLinearGradient(0, 0, 0, size);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(1, "#8d8d8d");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);

        // Noise: reduced from size*2500 => size*3
        for (let i = 0; i < size * 3; i++) {
          const x = Math.random() * size;
          const y = Math.random() * size;
          const val = Math.random() * 200;
          ctx.fillStyle = `rgb(${val},${val},${val})`;
          ctx.fillRect(x, y, 1, 1);
        }

        // Random cracks: reduced from 200 => 3
        ctx.strokeStyle = "rgba(0,0,0,0.1)";
        for (let i = 0; i < 3; i++) {
          let x = 0;
          const y = (i * size) / 3;
          ctx.beginPath();
          ctx.moveTo(x, y);
          while (x < size) {
            x += 10;
            const wiggle = (Math.random() - 0.5) * 5;
            ctx.lineTo(x, y + wiggle);
          }
          ctx.stroke();
        }
      },
      3,
      3
    );
  }, []);
}

/**
 * ------------------------------------------------
 * 2) SUPER-SMOOTH TERRAIN (GROUND + MOUNTAINS)
 * ------------------------------------------------
 */
function useUltraSmoothTerrain(
  width = 100,
  height = 100,
  segments = 100, // more segments => smoother
  amplitude = 0.0
) {
  return React.useMemo(() => {
    const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
    geometry.rotateX(-Math.PI / 2);

    const posAttr = geometry.attributes.position;
    const vertex = new Vector3();

    for (let i = 0; i < posAttr.count; i++) {
      vertex.fromBufferAttribute(posAttr, i);
      // mild random offset
      vertex.y += (Math.random() - 0.5) * amplitude;
      posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geometry.computeVertexNormals();
    return geometry;
  }, [width, height, segments, amplitude]);
}

function useUltraSmoothMountains(
  width = 200,
  height = 200,
  segments = 100,
  amplitude = 15
) {
  return React.useMemo(() => {
    const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
    geometry.rotateX(-Math.PI / 2);

    const posAttr = geometry.attributes.position;
    const vertex = new Vector3();

    // We'll push up vertices more at the edges, forming a ring of mountains
    for (let i = 0; i < posAttr.count; i++) {
      vertex.fromBufferAttribute(posAttr, i);
      const dist = Math.sqrt(vertex.x * vertex.x + vertex.z * vertex.z);
      const maxDist = Math.max(width, height) * 0.5;
      const factor = dist / maxDist; // 0 center, ~1 edges
      vertex.y = factor * factor * (Math.random() * amplitude);
      posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geometry.computeVertexNormals();
    return geometry;
  }, [width, height, segments, amplitude]);
}

/**
 * ------------------------------------------------
 * 3) Clouds
 * ------------------------------------------------
 */
function Clouds({ count = 10 }: { count?: number }) {
  const clouds = useMemo(() => {
    const temp: { x: number; y: number; z: number; scale: number }[] = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 100,
        y: 20 + Math.random() * 10,
        z: (Math.random() - 0.5) * 100,
        scale: 3 + Math.random() * 5,
      });
    }
    return temp;
  }, [count]);

  return (
    <>
      {clouds.map((c, i) => (
        <group position={[c.x, c.y, c.z]} key={i}>
          <mesh scale={[c.scale, c.scale, c.scale]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
          </mesh>
          {/* Additional lumps */}
          <mesh
            scale={[c.scale * 0.7, c.scale * 0.7, c.scale * 0.7]}
            position={[1, 1, 0]}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
          </mesh>
          <mesh
            scale={[c.scale * 0.6, c.scale * 0.6, c.scale * 0.6]}
            position={[-1, -0.5, 1]}
          >
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
          </mesh>
        </group>
      ))}
    </>
  );
}

/**
 * ------------------------------------------------
 * 4) WaterPlane, Animals, Trees, Mountains, Sun
 * ------------------------------------------------
 */
function WaterPlane({ waterTex }: { waterTex: THREE.CanvasTexture }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[800, 800]} />
      <meshStandardMaterial
        map={waterTex}
        roughness={0.2}
        metalness={0}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

function RandomAnimals({
  count = 6,
  animalTex,
}: {
  count?: number;
  animalTex: THREE.CanvasTexture;
}) {
  const arr = useMemo(() => {
    const temp: { position: [number, number, number] }[] = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 80,
          2 + Math.random() * 2,
          (Math.random() - 0.5) * 80,
        ],
      });
    }
    return temp;
  }, [count]);

  return (
    <>
      {arr.map((animal, i) => (
        <RigidBody
          key={i}
          type="dynamic"
          colliders="cuboid"
          position={animal.position}
        >
          <mesh castShadow>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial
              map={animalTex}
              roughness={0.8}
              metalness={0}
            />
          </mesh>
        </RigidBody>
      ))}
    </>
  );
}

function SmoothTrees({
  count = 15,
  barkTex,
  leavesTex,
}: {
  count?: number;
  barkTex: THREE.CanvasTexture;
  leavesTex: THREE.CanvasTexture;
}) {
  const trees = useMemo(() => {
    const data: {
      x: number;
      z: number;
      trunkH: number;
      foliageH: number;
    }[] = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * 80,
        z: (Math.random() - 0.5) * 80,
        trunkH: 2 + Math.random() * 1,
        foliageH: 4 + Math.random() * 2,
      });
    }
    return data;
  }, [count]);

  return (
    <>
      {trees.map((t, i) => (
        <group key={i} position={[t.x, 0, t.z]}>
          {/* Trunk */}
          <RigidBody type="fixed">
            <mesh castShadow position={[0, t.trunkH / 2, 0]}>
              <cylinderGeometry args={[0.3, 0.3, t.trunkH, 12]} />
              <meshStandardMaterial
                map={barkTex}
                roughness={0.9}
                metalness={0}
              />
            </mesh>
          </RigidBody>
          {/* Foliage */}
          <RigidBody type="fixed">
            <mesh castShadow position={[0, t.trunkH + t.foliageH / 2, 0]}>
              <coneGeometry args={[1.8, t.foliageH, 8]} />
              <meshStandardMaterial
                map={leavesTex}
                roughness={0.9}
                metalness={0}
              />
            </mesh>
          </RigidBody>
        </group>
      ))}
    </>
  );
}

function Mountains({
  mountainGeo,
  mountainTex,
}: {
  mountainGeo: THREE.PlaneGeometry;
  mountainTex: THREE.CanvasTexture;
}) {
  return (
    <RigidBody type="fixed" colliders="trimesh" position={[0, -2, 0]}>
      <mesh geometry={mountainGeo} receiveShadow castShadow>
        <meshStandardMaterial
          map={mountainTex}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </RigidBody>
  );
}

function Sun() {
  return (
    <directionalLight
      intensity={2}
      position={[50, 100, -50]}
      castShadow
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
    />
  );
}

/**
 * ------------------------------------------------
 * 5) Main scene: ColorfulVillage
 * ------------------------------------------------
 */
const ColorfulVillage: React.FC<ColorfulVillageProps> = ({
  onOpenMusicPlayer,
  onOpenAboutMeMenu,
  onOpenEducationMenu,
  onOpenExperienceMenu,
  onOpenProjectsMenu,
  onOpenAchievementsMenu,
}) => {
  // Load up the improved (but smaller) textures
  const grassTex = useImprovedGrassTexture();
  const leavesTex = useImprovedLeavesTexture();
  const barkTex = useImprovedBarkTexture();
  const waterTex = useImprovedWaterTexture();
  const animalTex = useImprovedAnimalTexture();
  const mountainTex = useImprovedMountainTexture();

  // Ground geometry
  const groundGeo = useUltraSmoothTerrain(100, 100, 100, 0.0);

  // Mountains geometry
  const mountainGeo = useUltraSmoothMountains(200, 200, 100, 15);

  return (
    <>
      {/* Lighting & environment */}
      <Sun />
      <ambientLight intensity={0.3} />
      <Clouds count={5} />
      <Mountains mountainGeo={mountainGeo} mountainTex={mountainTex} />

      {/* Ground */}
      <RigidBody type="fixed" colliders="trimesh">
        <mesh geometry={groundGeo} receiveShadow castShadow>
          <meshStandardMaterial
            map={grassTex}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      </RigidBody>

      {/* Water */}
      <WaterPlane waterTex={waterTex} />

      {/* Trees */}
      <SmoothTrees count={20} barkTex={barkTex} leavesTex={leavesTex} />

      {/* Animals */}
      <RandomAnimals count={6} animalTex={animalTex} />

      {/* Music Building */}
      <MusicBuilding
        position={[8, 0, 2]}
        scale={[6, 6, 6]}
        rotation={[0, Math.PI / 2, 0]}
        onClick={onOpenMusicPlayer}
        onCollisionWithCar={onOpenMusicPlayer}
      />

      {/* About Me Building */}
      <AboutMeBuilding
        position={[0, 0, 10]}
        scale={[0.005, 0.005, 0.005]}
        rotation={[0, Math.PI, 0]}
        onClick={onOpenAboutMeMenu}
        onCollisionWithCar={onOpenAboutMeMenu}
      />

      {/* Education Building */}
      <EducationBuilding
        position={[-3, 0, 8]}
        scale={[0.1, 0.5, 0.1]}
        rotation={[0, Math.PI, 0]}
        onClick={onOpenEducationMenu}
        onCollisionWithCar={onOpenEducationMenu}
      />

      {/* Experience Building */}
      <ExperienceBuilding
        position={[-6, 0, 1.8]}
        scale={[0.00095, 0.00095, 0.00095]}
        rotation={[0, Math.PI, 0]}
        onClick={onOpenExperienceMenu}
        onCollisionWithCar={onOpenExperienceMenu}
      />

      {/* Projects Building */}
      <ProjectsBuilding
        position={[10, 0, 10]}
        scale={[0.2, 0.4, 0.2]}
        rotation={[0, Math.PI, 0]}
        onClick={onOpenProjectsMenu}
        onCollisionWithCar={onOpenProjectsMenu}
      />

      {/* Achievements Building */}
      <AchievementsBuilding
        position={[1, 0, -5]}
        scale={[1, 1, 1]}
        rotation={[0, Math.PI, 0]}
        onClick={onOpenAchievementsMenu}
        onCollisionWithCar={onOpenAchievementsMenu}
      />
    </>
  );
};

export default ColorfulVillage;
