import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Instances, Instance } from '@react-three/drei'
import * as THREE from 'three'

export const BlockchainCore = () => {
    const groupRef = useRef<THREE.Group>(null)

    // Pulse effect logic could go here later with useFrame
    useFrame((state) => {
        if (groupRef.current) {
            // subtle movement
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
        }
    })

    return (
        <group ref={groupRef}>
            {/* Main Spine */}
            <Instances range={20}>
                <boxGeometry args={[2, 1, 1]} />
                <meshStandardMaterial
                    color="#1a1a1a"
                    emissive="#4f46e5"
                    emissiveIntensity={0.2}
                    roughness={0.2}
                    metalness={0.8}
                />

                {Array.from({ length: 20 }).map((_, i) => (
                    <Instance
                        key={i}
                        position={[0, i * 1.5 - 15, 0]}
                        rotation={[0, 0, 0]}
                    />
                ))}
            </Instances>

            {/* Data Pulses (emissive bits) */}
            {/* Adding some smaller emissive blocks to simulate data flow */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.2, 30, 0.2]} />
                <meshBasicMaterial color="#6366f1" transparent opacity={0.5} />
            </mesh>
        </group>
    )
}
