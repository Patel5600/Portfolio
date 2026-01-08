import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const FrontendSystem = () => {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((_, delta) => {
        if (meshRef.current) {
            // Algorithmic, slow rotation (reduced speed)
            meshRef.current.rotation.x += delta * 0.1
            meshRef.current.rotation.y += delta * 0.15

            // Morphing effect (Vertex-level control simulation)
            // Keeping it subtle
            // meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime) * 0.1)
        }
    })

    return (
        <group>
            {/* Main Complexity Object */}
            <mesh ref={meshRef}>
                {/* 
                   TorusKnot is good complex topology.
                   Reduced segments [64,16] for performance, but 100,16 looks better for wireframe clarity?
                   Let's stick to performance 64,16 but thinner tube for elegance.
                */}
                <torusKnotGeometry args={[1.8, 0.4, 100, 16]} />
                <meshStandardMaterial
                    color="#ffffff"
                    wireframe
                    transparent
                    opacity={0.15} // Reduced opacity for clarity
                    emissive="#4f46e5"
                    emissiveIntensity={0.2}
                />
            </mesh>

        </group>
    )
}
