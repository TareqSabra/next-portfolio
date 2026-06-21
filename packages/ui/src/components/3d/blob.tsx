"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  MeshDistortMaterial,
  Sphere,
  GradientTexture,
} from "@react-three/drei";

export const Blob = () => {
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

        {/* Pink key light matching the primary button gradient */}
        <pointLight position={[10, 10, 10]} intensity={2.5} color="#ff8a9f" />

        {/* Neon blue fill light matching the background accent blue */}
        <pointLight position={[-10, -10, -10]} intensity={2} color="#00f2fe" />
        <Sphere args={[1, 100, 200]} scale={3}>
          <MeshDistortMaterial attach="material" distort={0.55} speed={3}>
            <GradientTexture
              stops={[0, 1]}
              colors={["#e29b9f", "#ff8a9f"]}
              size={1024}
            />
          </MeshDistortMaterial>
        </Sphere>
      </Canvas>
    </div>
  );
};
