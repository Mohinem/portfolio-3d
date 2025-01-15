import React, { useMemo } from "react";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { Vector3 } from "three";
import Lamborghini from "./Lamborghini"; // <--- We'll use the Lamborghini model here

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
 * -----------------------------------------
 * 1) "10000x" IMPROVED PROCEDURAL TEXTURES
 * -----------------------------------------
 */

/** Rich, layered grass texture (high-quality) */
function useImprovedGrassTexture() {
  return React.useMemo(() => {
    return createCanvasTexture(
      2048, // bigger for higher resolution
      (ctx, size) => {
        // 1) Base gradient: darker at top, lighter at bottom
        const grad = ctx.createLinearGradient(0, 0, 0, size);
        grad.addColorStop(0, "#2e7d32"); // top: dark green
        grad.addColorStop(1, "#66bb6a"); // bottom: lighter
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);

        // 2) Add random speckles (like noise)
        for (let i = 0; i < size * 1200; i++) {
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

        // 4) Horizontal streaks
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

/** Enhanced leaves texture (for pine-like cones or broad leaves) */
function useImprovedLeavesTexture() {
  return React.useMemo(() => {
    return createCanvasTexture(
      1024,
      (ctx, size) => {
        // A gentle vertical gradient
        const grad = ctx.createLinearGradient(0, 0, 0, size);
        grad.addColorStop(0, "#1e7f39");
        grad.addColorStop(1, "#4caf50");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);

        // Specks
        for (let i = 0; i < size * 160; i++) {
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

/** Enhanced bark texture (vertical ridges, color variations) */
function useImprovedBarkTexture() {
  return React.useMemo(() => {
    return createCanvasTexture(1024, (ctx, size) => {
      // Base fill: mid-brown
      ctx.fillStyle = "#8d6e63";
      ctx.fillRect(0, 0, size, size);

      // Vertical ridges with random wiggle
      ctx.strokeStyle = "#5d4037";
      ctx.lineWidth = 3;
      for (let i = 0; i < 100; i++) {
        let x = (i * size) / 100 + Math.random() * 5;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        for (let y = 0; y < size; y += 15) {
          x += (Math.random() - 0.5) * 10;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Dark spots (knots)
      for (let i = 0; i < 600; i++) {
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

/** Enhanced water texture: multi-layer waves & foam. */
function useImprovedWaterTexture() {
  return React.useMemo(() => {
    return createCanvasTexture(
      2048,
      (ctx, size) => {
        // Base gradient: deeper at top, lighter at bottom
        const grad = ctx.createLinearGradient(0, 0, 0, size);
        grad.addColorStop(0, "#1565c0"); // deeper
        grad.addColorStop(1, "#4fc3f7"); // lighter
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);

        // Wavy lines
        ctx.strokeStyle = "rgba(255,255,255,0.4)";
        ctx.lineWidth = 2;
        for (let i = 0; i < 160; i++) {
          let x = 0;
          const y = (i * size) / 160 + Math.random() * 15;
          ctx.beginPath();
          ctx.moveTo(x, y);
          while (x < size) {
            x += 15;
            const wave = Math.sin(x / 25) * 8;
            ctx.lineTo(x, y + wave);
          }
          ctx.stroke();
        }

        // foam patches
        for (let i = 0; i < 160; i++) {
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

/** Enhanced animal fur/skin texture */
function useImprovedAnimalTexture() {
  return React.useMemo(() => {
    return createCanvasTexture(
      1024,
      (ctx, size) => {
        // Base color range
        ctx.fillStyle = `hsl(${Math.random() * 60}, 50%, 75%)`;
        ctx.fillRect(0, 0, size, size);

        // stripes/spots combo
        ctx.globalAlpha = 0.6;
        ctx.strokeStyle = "#000";
        ctx.fillStyle = "#000";
        ctx.lineWidth = 3;

        // random stripes
        for (let y = 0; y < size; y += 20) {
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
        // random spots
        for (let i = 0; i < 1200; i++) {
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

/** Mountain rock texture WITH SNOW at the top */
function useImprovedMountainTexture() {
  return React.useMemo(() => {
    return createCanvasTexture(
      2048,
      (ctx, size) => {
        // We'll start with white at top (snow),
        // fade to gray near the bottom
        const grad = ctx.createLinearGradient(0, 0, 0, size);
        grad.addColorStop(0, "#ffffff"); // top: snowy
        grad.addColorStop(1, "#8d8d8d"); // bottom: rocky
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);

        // add noise
        for (let i = 0; i < size * 2500; i++) {
          const x = Math.random() * size;
          const y = Math.random() * size;
          const val = Math.random() * 200;
          ctx.fillStyle = `rgb(${val},${val},${val})`;
          ctx.fillRect(x, y, 1, 1);
        }

        // random cracks (horizontal lines)
        ctx.strokeStyle = "rgba(0,0,0,0.1)";
        for (let i = 0; i < 200; i++) {
          let x = 0;
          const y = (i * size) / 200;
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
 * -----------------------------------------
 * 2) SUPER-SMOOTH TERRAIN (GROUND + MOUNTAINS)
 * -----------------------------------------
 */

/**
 * Ultra-smooth ground terrain
 */
function useUltraSmoothTerrain(
  width = 100,
  height = 100,
  segments = 100, // more segments => smoother
  amplitude = 0.0 // slightly more variation
) {
  return React.useMemo(() => {
    const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
    geometry.rotateX(-Math.PI / 2);

    const posAttr = geometry.attributes.position;
    const vertex = new Vector3();

    for (let i = 0; i < posAttr.count; i++) {
      vertex.fromBufferAttribute(posAttr, i);
      // mild random offset to create gentle rolling
      vertex.y += (Math.random() - 0.5) * amplitude;
      posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geometry.computeVertexNormals();
    return geometry;
  }, [width, height, segments, amplitude]);
}

/**
 * Fewer mountains but good texture, plus random shape
 */
function useUltraSmoothMountains(
  width = 200,
  height = 200,
  segments = 100,
  amplitude = 15 // enough for nice ridges
) {
  return React.useMemo(() => {
    const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
    geometry.rotateX(-Math.PI / 2);

    const posAttr = geometry.attributes.position;
    const vertex = new Vector3();

    // We'll push up vertices more at the edges, to form a ring of mountains
    for (let i = 0; i < posAttr.count; i++) {
      vertex.fromBufferAttribute(posAttr, i);
      const dist = Math.sqrt(vertex.x * vertex.x + vertex.z * vertex.z);
      const maxDist = Math.max(width, height) * 0.5;
      const factor = dist / maxDist; // 0 at center, ~1 at edges

      // random mountainous offset
      vertex.y = factor * factor * (Math.random() * amplitude);
      posAttr.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geometry.computeVertexNormals();
    return geometry;
  }, [width, height, segments, amplitude]);
}

/**
 * -----------------------------------------
 * 3) The Car - We now import & use <Lamborghini />
 * -----------------------------------------
 */

/**
 * -----------------------------------------
 * 4) Adding Clouds in the sky
 * -----------------------------------------
 */
function Clouds({ count = 10 }) {
  const clouds = React.useMemo(() => {
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
          {/* Additional small lumps for variety */}
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
 * -----------------------------------------
 * 5) The main scene: ColorfulVillage
 * -----------------------------------------
 */
export default function ColorfulVillage() {
  // Load up all “improved” textures
  const grassTex = useImprovedGrassTexture();
  const leavesTex = useImprovedLeavesTexture();
  const barkTex = useImprovedBarkTexture();
  const waterTex = useImprovedWaterTexture();
  const animalTex = useImprovedAnimalTexture();
  const mountainTex = useImprovedMountainTexture();

  // Ultra-smooth ground geometry
  const groundGeo = useUltraSmoothTerrain(100, 100, 100, 0.0);

  // Fewer mountains geometry (with snow at top)
  const mountainGeo = useUltraSmoothMountains(200, 200, 100, 15);

  function WaterPlane() {
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

  function RandomAnimals({ count = 6 }) {
    const arr = React.useMemo(() => {
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
              <meshStandardMaterial map={animalTex} roughness={0.8} metalness={0} />
            </mesh>
          </RigidBody>
        ))}
      </>
    );
  }

  function SmoothTrees({ count = 15 }) {
    const trees = React.useMemo(() => {
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
            {/* trunk */}
            <RigidBody type="fixed">
              <mesh castShadow position={[0, t.trunkH / 2, 0]}>
                <cylinderGeometry args={[0.3, 0.3, t.trunkH, 12]} />
                <meshStandardMaterial map={barkTex} roughness={0.9} metalness={0} />
              </mesh>
            </RigidBody>
            {/* foliage (cone) */}
            <RigidBody type="fixed">
              <mesh castShadow position={[0, t.trunkH + t.foliageH / 2, 0]}>
                <coneGeometry args={[1.8, t.foliageH, 8]} />
                <meshStandardMaterial map={leavesTex} roughness={0.9} metalness={0} />
              </mesh>
            </RigidBody>
          </group>
        ))}
      </>
    );
  }

  function Mountains() {
    return (
      <RigidBody type="fixed" colliders="trimesh" position={[0, -2, 0]}>
        <mesh geometry={mountainGeo} receiveShadow castShadow>
          <meshStandardMaterial map={mountainTex} roughness={0.8} metalness={0.1} />
        </mesh>
      </RigidBody>
    );
  }

  function Sun() {
    // A bright directional light from above
    return (
      <directionalLight
        intensity={2}
        position={[50, 100, 50]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    );
  }

  return (
    <>
      <Sun />
      <ambientLight intensity={0.3} />
      <Clouds count={5} />
      <Mountains />
      <RigidBody type="fixed" colliders="trimesh">
        <mesh geometry={groundGeo} receiveShadow castShadow>
          <meshStandardMaterial map={grassTex} roughness={0.8} metalness={0.1} />
        </mesh>
      </RigidBody>
      <WaterPlane />
      <SmoothTrees count={20} />
      <RandomAnimals count={6} />

      {/* The Car (Lamborghini) */}
      <Lamborghini />
    </>
  );
}
