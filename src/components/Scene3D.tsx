import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

// Animated 3D sphere component
const AnimatedSphere = ({ position, color, speed, distort }: { 
  position: [number, number, number], 
  color: string, 
  speed: number,
  distort: number
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(1);
  
  // Handle hover effect
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);
  
  // Animation frame
  useFrame((state) => {
    if (meshRef.current) {
      // Rotation animation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * speed * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * speed * 0.3;
      
      // Scale animation
      const targetScale = hovered ? 1.2 : 1;
      setScale(THREE.MathUtils.lerp(scale, targetScale, 0.1));
    }
  });
  
  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial 
          color={color} 
          attach="material" 
          distort={distort} 
          speed={speed} 
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </mesh>
  );
};

// Main 3D scene component
const Scene3D = () => {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#2c8769" />
        
        <AnimatedSphere position={[-3, 0, 0]} color="#2c8769" speed={0.5} distort={0.4} />
        <AnimatedSphere position={[0, 0, -2]} color="#bddbe8" speed={0.8} distort={0.6} />
        <AnimatedSphere position={[3, 0, 0]} color="#2c8769" speed={0.3} distort={0.2} />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
