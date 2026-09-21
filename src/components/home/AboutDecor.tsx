'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { useThemeStore } from '@/store/useThemeStore';

const THEME_COLORS: Record<string, { a: string; b: string }> = {
  nebula: { a: '#4da3ff', b: '#825cff' },
  bloom: { a: '#ff4a91', b: '#ff9a9e' },
  ink: { a: '#0a0a0a', b: '#6e6e69' },
};

function GlowOrb({ colorA, colorB }: { colorA: string; colorB: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.15;
    ref.current.rotation.x += delta * 0.05;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.5, 8]} />
      <MeshDistortMaterial
        color={colorA}
        emissive={colorB}
        emissiveIntensity={0.25}
        distort={0.4}
        speed={1.8}
        roughness={0.1}
        metalness={0.7}
      />
    </mesh>
  );
}

function Bracket({ color }: { color: string }) {
  return (
    <Float speed={1.6} floatIntensity={1.4} rotationIntensity={0.4}>
      <group position={[1.3, -1.1, 0.6]} rotation={[0, 0.3, -0.1]}>
        <mesh>
          <boxGeometry args={[0.9, 0.22, 0.22]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0.5]}>
          <boxGeometry args={[0.7, 0.2, 0.2]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function Cubes({ color }: { color: string }) {
  const positions: [number, number, number][] = [
    [-1.8, 1.2, -0.5],
    [1.9, 1.4, -0.8],
    [-1.6, -1.6, 0.3],
  ];
  return (
    <>
      {positions.map((p, i) => (
        <Float key={i} speed={1 + i * 0.3} floatIntensity={2} rotationIntensity={1}>
          <mesh position={p}>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} transparent opacity={0.85} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Scene() {
  const theme = useThemeStore((s) => s.theme);
  const colors = THEME_COLORS[theme] ?? THEME_COLORS.nebula;

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={35} color={colors.a} />
      <pointLight position={[-3, -2, -2]} intensity={20} color={colors.b} />
      <Float speed={1.2} floatIntensity={1} rotationIntensity={0.3}>
        <GlowOrb colorA={colors.a} colorB={colors.b} />
      </Float>
      <Bracket color={colors.a} />
      <Cubes color={colors.b} />
    </>
  );
}

function AboutDecorInner() {
  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 5.5], fov: 40 }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

// no SSR — WebGL only runs client-side
export default dynamic(() => Promise.resolve(AboutDecorInner), { ssr: false });
