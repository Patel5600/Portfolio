import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const ContactSignal = () => {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (groupRef.current) {
            // Very slow, idle rotation
            groupRef.current.rotation.z += 0.002
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        }
    })

    return (
        <group ref={groupRef}>
            {/* Outer Ring - The "Port" */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[3, 0.02, 16, 100]} />
                <meshBasicMaterial color="#333" transparent opacity={0.3} />
            </mesh>

            {/* Inner Ring - The "Signal" */}
            <mesh rotation={[Math.PI / 2, 0, 0]} scale={[0.8, 0.8, 0.8]}>
                <torusGeometry args={[3, 0.05, 16, 100]} />
                <meshStandardMaterial
                    color="#000"
                    emissive="#4f46e5"
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Central detailed node */}
            <mesh>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={1} />
            </mesh>

            {/* Faint wireframe sphere indicating range */}
            <mesh>
                <icosahedronGeometry args={[4, 1]} />
                <meshBasicMaterial color="#222" wireframe transparent opacity={0.05} />
            </mesh>
        </group>
    )
}
