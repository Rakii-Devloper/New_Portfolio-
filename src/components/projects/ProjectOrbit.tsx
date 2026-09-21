'use client';

import { Suspense, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Canvas, useFrame } from '@react-three/fiber';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as THREE from 'three';
import { PROJECTS } from '@/data/projects';
import OrbitCard from './OrbitCard';

const RADIUS = 4.4;
const AUTO_ROTATE_SPEED = 0.12; // Auto spin speed

function Ring({
  targetAngle,
  onSelect,
}: {
  targetAngle: number;
  onSelect: (slug: string) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const currentAngle = useRef(0);
  const count = PROJECTS.length;
  const anglePer = (Math.PI * 2) / count;

  useFrame((_, delta) => {
    if (groupRef.current) {
      currentAngle.current = THREE.MathUtils.lerp(
        currentAngle.current,
        targetAngle,
        delta * 6
      );
      groupRef.current.rotation.y = currentAngle.current;
    }
  });

  const items = useMemo(
    () =>
      PROJECTS.map((project, i) => {
        const base = i * anglePer;
        return { project, base };
      }),
    [anglePer]
  );

  return (
    <group ref={groupRef}>
      {items.map(({ project, base }) => {
        const effective = base + targetAngle;
        const proximity = (Math.cos(effective) + 1) / 2;
        const x = Math.sin(base) * RADIUS;
        const z = Math.cos(base) * RADIUS;
        const front = proximity > 0.94;

        return (
          <group key={project.slug} position={[x, 0, z]}>
            <OrbitCard
              project={project}
              front={front}
              proximity={proximity}
              onSelect={() => onSelect(project.slug)}
            />
          </group>
        );
      })}
    </group>
  );
}

function OrbitSceneInner() {
  const router = useRouter();
  const [angle, setAngle] = useState(0);
  const angleRef = useRef(0);
  const isDragging = useRef(false);
  const isHovering = useRef(false);
  const dragStartX = useRef(0);
  const dragDistance = useRef(0);

  const handleSelect = (slug: string) => {
    if (dragDistance.current > 8) return;
    router.push(`/projects/${slug}`);
  };

  const step = (dir: 1 | -1) => {
    const anglePer = (Math.PI * 2) / PROJECTS.length;
    angleRef.current -= dir * anglePer;
    setAngle(angleRef.current);
  };

  return (
    <div
      className="relative h-[380px] w-full cursor-grab active:cursor-grabbing"
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => {
        isHovering.current = false;
        isDragging.current = false;
      }}
      onPointerDown={(e) => {
        isDragging.current = true;
        dragStartX.current = e.clientX;
        dragDistance.current = 0;
      }}
      onPointerMove={(e) => {
        if (!isDragging.current) return;
        const dx = e.clientX - dragStartX.current;
        dragDistance.current += Math.abs(dx);
        angleRef.current += dx * 0.005;
        setAngle(angleRef.current);
        dragStartX.current = e.clientX;
      }}
      onPointerUp={() => {
        isDragging.current = false;
      }}
    >
      <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, RADIUS + 5], fov: 40 }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <Ring targetAngle={angle} onSelect={handleSelect} />
          <AutoRotate
            angleRef={angleRef}
            isDragging={isDragging}
            isHovering={isHovering}
            setAngle={setAngle}
          />
        </Suspense>
      </Canvas>

      <button
        onClick={() => step(-1)}
        aria-label="Previous project"
        className="focus-ring absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/80 backdrop-blur transition hover:border-accent/60"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={() => step(1)}
        aria-label="Next project"
        className="focus-ring absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/80 backdrop-blur transition hover:border-accent/60"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

function AutoRotate({
  angleRef,
  isDragging,
  isHovering,
  setAngle,
}: {
  angleRef: React.MutableRefObject<number>;
  isDragging: React.MutableRefObject<boolean>;
  isHovering: React.MutableRefObject<boolean>;
  setAngle: (a: number) => void;
}) {
  useFrame((_, delta) => {
    if (isDragging.current || isHovering.current) return;
    angleRef.current += delta * AUTO_ROTATE_SPEED;
    setAngle(angleRef.current);
  });
  return null;
}

export default dynamic(() => Promise.resolve(OrbitSceneInner), { ssr: false });