'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Color, ConeGeometry, InstancedMesh, Matrix4, Object3D, Quaternion, Vector3 } from 'three';
import { createBoids, stepBoids, type Boid, type BoidsConfig } from './boids';
import { depthColorAt } from './viridis';

const BOUNDS = new Vector3(6, 3.2, 4);
const UP = new Vector3(0, 1, 0);

function makeConfig(count: number): BoidsConfig {
  return {
    count,
    bounds: BOUNDS,
    maxSpeed: 2.2,
    maxForce: 0.05,
    perceptionRadius: 1.6,
    separationRadius: 0.55,
    cursorAvoidRadius: 1.8,
  };
}

interface SchoolProps {
  count: number;
}

function School({ count }: SchoolProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const { camera } = useThree();
  const boids = useMemo<Boid[]>(() => createBoids(makeConfig(count)), [count]);
  const config = useMemo(() => makeConfig(count), [count]);
  const dummy = useMemo(() => new Object3D(), []);
  const cursorWorld = useRef(new Vector3(9999, 9999, 9999));
  const raycastPoint = useMemo(() => new Vector3(), []);
  const quaternion = useMemo(() => new Quaternion(), []);
  const color = useMemo(() => new Color(), []);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30); // clamp so tab-switches don't cause a lurch

    // Project pointer onto a plane at z=0 in world space, in front of the school.
    const pointerVec = new Vector3(state.pointer.x, state.pointer.y, 0.5).unproject(camera);
    const dir = pointerVec.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    raycastPoint.copy(camera.position).add(dir.multiplyScalar(distance));
    cursorWorld.current.copy(raycastPoint);

    stepBoids(boids, config, delta, cursorWorld.current);

    const mesh = meshRef.current;
    if (!mesh) return;

    for (let i = 0; i < boids.length; i++) {
      const boid = boids[i];
      dummy.position.copy(boid.position);

      // Orient along velocity direction.
      if (boid.velocity.lengthSq() > 0.0001) {
        const dirNorm = boid.velocity.clone().normalize();
        quaternion.setFromUnitVectors(UP, dirNorm);
        dummy.quaternion.copy(quaternion);
      }
      dummy.scale.setScalar(0.16);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix as Matrix4);

      // Color by distance from camera: near = warm end of colormap, far = cool.
      const dist = boid.position.distanceTo(camera.position);
      const nearDist = 3;
      const farDist = 12;
      const t = 1 - Math.min(1, Math.max(0, (dist - nearDist) / (farDist - nearDist)));
      depthColorAt(t, color);
      mesh.setColorAt(i, color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  const geometry = useMemo(() => new ConeGeometry(0.35, 1.1, 6), []);

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]} frustumCulled={false}>
      <meshStandardMaterial roughness={0.55} metalness={0.1} />
    </instancedMesh>
  );
}

function Rig() {
  useFrame(({ camera, clock }) => {
    // Very slow drift so the scene reads as alive without being distracting.
    camera.position.x = Math.sin(clock.elapsedTime * 0.05) * 0.6;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

interface DepthSceneProps {
  particleCount: number;
}

export default function DepthScene({ particleCount }: DepthSceneProps) {
  return (
    <Canvas
      dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1} />
      <Rig />
      <School count={particleCount} />
    </Canvas>
  );
}
