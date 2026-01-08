import { useRef, useState } from 'react'
import { useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../store'

export const Projects = () => {
    return (
        <group>
            {/* Fluxora - Left - Flow System */}
            <ProjectItem position={[-3, 0, 0]} color="#6366f1" label="Fluxora">
                <boxGeometry args={[1.5, 1.5, 1.5]} />
            </ProjectItem>

            {/* CampusChain - Center - Solid Block */}
            <ProjectItem position={[0, 0, 0]} color="#a3a3a3" label="CampusChain">
                <boxGeometry args={[1.2, 1.6, 0.2]} />
            </ProjectItem>

            {/* Automation - Right - Cylindrical Pipe */}
            <ProjectItem position={[3, 0, 0]} color="#4f46e5" label="AutoSys">
                <cylinderGeometry args={[0.8, 0.8, 1.5, 32]} />
            </ProjectItem>
        </group>
    )
}

const ProjectItem = ({ position, color, label, children }: any) => {
    const mesh = useRef<THREE.Mesh>(null)
    const [hovered, setHover] = useState(false)
    const setModalContent = useStore((state) => state.setModalContent)

    useCursor(hovered)

    useFrame((_, delta) => {
        if (mesh.current) {
            mesh.current.rotation.y += delta * 0.2
            if (hovered) {
                mesh.current.rotation.y += delta * 1 // Spin faster on hover
                mesh.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1)
            } else {
                mesh.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
            }
        }
    })

    return (
        <group position={position}>
            <mesh
                ref={mesh}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                onClick={(e) => {
                    e.stopPropagation()
                    setModalContent(label)
                }}
            >
                {children}
                <meshStandardMaterial
                    color={color}
                    roughness={0.2}
                    metalness={0.8}
                    emissive={hovered ? color : "#000"}
                    emissiveIntensity={0.2}
                />
            </mesh>
        </group>
    )
}
