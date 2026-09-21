'use client';

import { Suspense, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import * as THREE from 'three';
import { SKILL_NODES, SKILL_EDGES } from '@/data/skillsGraph';
import { useThemeStore } from '@/store/useThemeStore';
import GraphNode from './GraphNode';

const nodeById = Object.fromEntries(SKILL_NODES.map((n) => [n.id, n]));

function CameraRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.02;
    camera.position.y += (pointer.y * 0.4 - camera.position.y) * 0.02;
    camera.lookAt(1, 0, 0);
  });
  return null;
}

function Edges({ hoveredId, accent, muted }: { hoveredId: string | null; accent: string; muted: string }) {
  return (
    <>
      {SKILL_EDGES.map(([a, b], i) => {
        const nodeA = nodeById[a];
        const nodeB = nodeById[b];
        if (!nodeA || !nodeB) return null;
        const active = hoveredId === a || hoveredId === b;
        return (
          <Line
            key={i}
            points={[nodeA.position, nodeB.position]}
            color={active ? accent : muted}
            transparent
            opacity={active ? 0.9 : hoveredId ? 0.15 : 0.4}
            lineWidth={active ? 1.8 : 1}
          />
        );
      })}
    </>
  );
}

function Nodes({ hoveredId, setHoveredId }: { hoveredId: string | null; setHoveredId: (id: string | null) => void }) {
  const connected = useMemo(() => {
    if (!hoveredId) return new Set<string>();
    const set = new Set<string>([hoveredId]);
    SKILL_EDGES.forEach(([a, b]) => {
      if (a === hoveredId) set.add(b);
      if (b === hoveredId) set.add(a);
    });
    return set;
  }, [hoveredId]);

  return (
    <>
      {SKILL_NODES.map((node, i) => (
        <Float
          key={node.id}
          speed={1 + (i % 3) * 0.2}
          floatIntensity={0.6}
          rotationIntensity={0}
          floatingRange={[-0.08, 0.08]}
        >
          <group position={node.position}>
            <GraphNode
              node={node}
              hovered={hoveredId === node.id}
              dimmed={hoveredId !== null && !connected.has(node.id)}
              onHover={setHoveredId}
            />
          </group>
        </Float>
      ))}
    </>
  );
}

const THEME_LINE_COLORS: Record<string, { accent: string; muted: string }> = {
  nebula: { accent: '#4da3ff', muted: '#2b3a5c' },
  bloom: { accent: '#ff4a91', muted: '#ffd6e3' },
  ink: { accent: '#0a0a0a', muted: '#d2d2cc' },
};

function SceneInner() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const theme = useThemeStore((s) => s.theme);
  const colors = THEME_LINE_COLORS[theme] ?? THEME_LINE_COLORS.nebula;

  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [1, 0, 9], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <Edges hoveredId={hoveredId} accent={colors.accent} muted={colors.muted} />
        <Nodes hoveredId={hoveredId} setHoveredId={setHoveredId} />
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}

// WebGL only runs client-side
export default dynamic(() => Promise.resolve(SceneInner), { ssr: false });
