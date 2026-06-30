"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  MeshDistortMaterial,
  Sphere,
  GradientTexture,
} from "@react-three/drei";

import { COLORS } from "../../constants/colors";

const variants = {
  pink: {
    gradient: [COLORS.pinkPrimary, COLORS.pinkSecondary] as [string, string],
    keyLight: COLORS.pinkSecondary,
    fillLight: COLORS.neonBlue,
  },
  neon: {
    gradient: [COLORS.neonBlue, COLORS.neonPurple] as [string, string],
    keyLight: COLORS.neonBlue,
    fillLight: COLORS.pinkSecondary,
  },
};

interface BlobProps {
  variant?: keyof typeof variants;
  distort?: number;
  speed?: number;
}

export const Blob = ({ variant = "pink", distort = 0.55, speed = 3 }: BlobProps) => {
  const colors = variants[variant];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    >
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={1.8} />
        <pointLight position={[10, 10, 10]} intensity={2.5} color={colors.keyLight} />
        <pointLight position={[-10, -10, -10]} intensity={2} color={colors.fillLight} />
        <Sphere args={[1, 100, 200]} scale={3}>
          <MeshDistortMaterial attach="material" distort={distort} speed={speed}>
            <GradientTexture
              stops={[0, 1]}
              colors={colors.gradient}
              size={1024}
            />
          </MeshDistortMaterial>
        </Sphere>
      </Canvas>
    </div>
  );
};
