import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Stars, Instance, Instances } from '@react-three/drei'
import * as THREE from 'three'

export const Intro = () => {
    const characterRef = useRef<THREE.Mesh>(null)

    // Mouse reaction logic
    useFrame((state) => {
        if (characterRef.current) {
            const { x, y } = state.mouse
            // Slight rotation reacting to mouse
            characterRef.current.rotation.y = x * 0.1
            characterRef.current.rotation.x = -y * 0.1
        }
    })

    return (
        <group>
            {/* Background Atmosphere */}
            <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

            {/* Pixel Art Developer Character Placeholder */}
            {/* "Left side" means negative X */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.2, 0.2]}>
                <mesh ref={characterRef} position={[-3, 0, 0]}>
                    <planeGeometry args={[3, 4]} />
                    {/* Placeholder material until texture is available */}
                    <meshBasicMaterial color="#0a0a0a" side={THREE.DoubleSide} transparent opacity={0.8} />
                    <lineSegments>
                        <edgesGeometry args={[new THREE.PlaneGeometry(3, 4)]} />
                        <lineBasicMaterial color="#333" />
                    </lineSegments>
                    {/* Inner "Pixel" representation - grid */}
                    <gridHelper args={[3, 10, 0x333333, 0x111111]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.01]} />
                </mesh>
            </Float>

            {/* Floating Fragments (Systems Debris) */}
            <Float speed={1} rotationIntensity={1} floatIntensity={1}>
                <Fragments />
            </Float>
        </group>
    )
}

const Fragments = () => {
    const range = 20
    return (
        <Instances range={range}>
            <boxGeometry args={[0.05, 0.5, 0.05]} />
            <meshStandardMaterial color="#444" emissive="#4f46e5" emissiveIntensity={0.2} />
            {Array.from({ length: 40 }).map((_, i) => (
                <Instance
                    key={i}
                    position={[
                        (Math.random() - 0.5) * 15,
                        (Math.random() - 0.5) * 15,
                        (Math.random() - 0.5) * 10
                    ]}
                    rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
                />
            ))}
        </Instances>
    )
}
