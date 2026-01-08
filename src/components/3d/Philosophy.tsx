import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const Philosophy = () => {
    const meshRef = useRef<THREE.Group>(null)

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Rotation -3.5/10 intensity (approx -0.35 rad/s)
            meshRef.current.rotation.y += delta * -0.35

            // Very slow breathing scale (±1% over ~8s)
            const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.01
            meshRef.current.scale.set(scale, scale, scale)
        }
    })

    return (
        <group ref={meshRef}>
            {/* Stable, heavy object - Static */}
            <mesh rotation={[0, Math.PI / 4, 0]}>
                <octahedronGeometry args={[2, 0]} />
                {/* Matte, Neutral Gray, Slight Roughness */}
                <meshStandardMaterial
                    color="#222"
                    roughness={0.9}
                    metalness={0.1}
                    flatShading
                />
            </mesh>

            {/* Subtle inner structure for depth, but static */}
            <mesh rotation={[0, Math.PI / 4, 0]} scale={[0.98, 0.98, 0.98]}>
                <octahedronGeometry args={[2, 0]} />
                <meshBasicMaterial color="#333" wireframe transparent opacity={0.05} />
            </mesh>
        </group>
    )
}
