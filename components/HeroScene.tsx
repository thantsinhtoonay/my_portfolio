'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function PortraitAvatar() {
  const texture = useTexture('/avatar-stylized.png');
  const [reducedMotion, setReducedMotion] = useState(false);
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const start = useRef<number | null>(null);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!group.current || !material.current) return;
    const time = clock.getElapsedTime();
    if (reducedMotion) {
      group.current.position.y = -0.08;
      group.current.rotation.set(0, 0, 0);
      group.current.scale.setScalar(1);
      material.current.opacity = 1;
      return;
    }
    start.current ??= time;
    const elapsed = time - start.current;
    const fade = THREE.MathUtils.smoothstep(elapsed, 0.05, 0.75);
    group.current.position.y = -0.08 + Math.sin(time * 1.55) * 0.014;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * 0.085, 2.8, 1 / 60);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.y * 0.035, 2.8, 1 / 60);
    group.current.rotation.z = Math.sin(time * 0.55) * 0.004;
    const entranceScale = 0.96 + fade * 0.04;
    group.current.scale.set(entranceScale, entranceScale, 1);
    material.current.opacity = fade;
  });

  return <group ref={group} position={[0, -0.08, 0]}>
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[2.84, 3.71]} />
      <meshBasicMaterial ref={material} map={texture} transparent alphaTest={0.015} depthWrite={false} toneMapped={false} />
    </mesh>
  </group>;
}

function Scene() {
  return <>
    <ambientLight intensity={1.2} />
    <pointLight position={[2, 2, 3]} intensity={3.5} color="#a78bfa" />
    <pointLight position={[-2.5, 0, 2]} intensity={2.2} color="#67d9e7" />
    <Sparkles count={42} scale={[4, 4.5, 2]} size={1.45} speed={0.15} color="#c4b5fd" />
    <PortraitAvatar />
  </>;
}

export default function HeroScene() {
  return <div className="hero-canvas" aria-hidden="true">
    <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0.05, 6.1], fov: 34 }} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}><Scene /></Suspense>
    </Canvas>
  </div>;
}
