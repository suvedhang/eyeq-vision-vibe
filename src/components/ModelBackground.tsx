// src/components/ModelBackground.tsx

import * as THREE from 'three';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function Model() {
  // 1. Load your model from the /public folder
  const { scene } = useGLTF('/eye on monitor 3d model.glb');
  const modelRef = useRef<THREE.Group>(null);

  // Add a subtle rotation animation
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.1; // Slow rotation
    }
  });

  // Adjust scale and position of your model as needed
  return <primitive ref={modelRef} object={scene} scale={1.8} position={[0, 0, 0]} />;
}

export function ModelBackground() {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      pointerEvents: 'none', // Ensure it doesn't interfere with interactions
    }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} gl={{ alpha: true }}>
        {/* Add some lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        
        {/* Suspense is for fallback while model is loading */}
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}