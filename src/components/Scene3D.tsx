import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

// Animated 3D sphere component
const AnimatedSphere = ({ position, color, speed, distort }: { 
  position: [number, number, number], 
  color: string, 
  speed: number,
  distort: number
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Animation with useSpring
  const { scale } = useSpring({
    scale: hovered ? 1.2 : 1,
    config: { tension: 300, friction: 10 }
  });
  
  // Rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * speed * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * speed * 0.3;
    }
  });
  
  return (
    <animated.mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
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
    </animated.mesh>
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
