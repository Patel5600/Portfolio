import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const AutomationSystem = () => {
    const pipeRef = useRef<THREE.Group>(null)

    useFrame(() => {
        if (pipeRef.current) {
            // Mechanical rotation
            pipeRef.current.rotation.z += 0.005
        }
    })

    const nodes = [
        { id: 1, pos: [-4, 2, 0] },
        { id: 2, pos: [0, 0, 0] },
        { id: 3, pos: [4, -2, 0] },
        { id: 4, pos: [-4, -2, 0] },
        { id: 5, pos: [4, 2, 0] },
    ]

    return (
        <group ref={pipeRef}>
            {/* Connecting Lines (Pipeline) */}
            <mesh rotation={[0, 0, Math.PI / 4]}>
                <cylinderGeometry args={[0.1, 0.1, 15, 8]} />
                <meshStandardMaterial color="#444" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh rotation={[0, 0, -Math.PI / 4]}>
                <cylinderGeometry args={[0.1, 0.1, 15, 8]} />
                <meshStandardMaterial color="#444" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Nodes */}
            {nodes.map((node) => (
                <mesh key={node.id} position={new THREE.Vector3(...node.pos)}>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshStandardMaterial color="#0a0a0a" emissive="#4f46e5" emissiveIntensity={0.5} />
                </mesh>
            ))}

            {/* Moving Packets (simulating data flow) */}
            <MovingPackets />
        </group>
    )
}

const MovingPackets = () => {
    const packets = useRef<THREE.InstancedMesh>(null)

    useFrame((state) => {
        if (packets.current) {
            // Logic to move instances along paths could go here.
            // For now, simple oscillation
            packets.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.5
        }
    })

    return (
        <instancedMesh ref={packets} args={[undefined, undefined, 10]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshBasicMaterial color="#fff" />
        </instancedMesh>
    )
}
