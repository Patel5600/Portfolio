import { useRef, useState } from 'react'
import { useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../store'

export const Projects = () => {
    return (
        <group>
            {/* Project 1: Blockchain Verification (Left) */}
            <ProjectItem
                position={[-4, 0, 0]}
                color="#6366f1" // Indigo
                label="Verification"
                modalData={{
                    title: "On-Chain Document Verification",
                    desc: "Hash-based document verification using smart contracts to prove integrity without exposing data.",
                    tags: ["Blockchain", "Smart Contracts", "Verification", "Web3"]
                }}
            >
                {/* Segmented Cube / Block */}
                <boxGeometry args={[1.5, 1.5, 1.5]} />
            </ProjectItem>

            {/* Project 2: Automation Infrastructure (Center) */}
            <ProjectItem
                position={[0, 0, 0]}
                color="#a3a3a3" // Grey/Metallic
                label="Automation"
                modalData={{
                    title: "Automation & Wallet Systems",
                    desc: "Automated workflows for testnets, faucets, and multi-wallet interactions designed to simulate real-user behavior.",
                    tags: ["Automation", "Bots", "Web3", "Systems"]
                }}
            >
                {/* Vertical Pillar */}
                {/* Using 8-sided cylinder to look like a machine part */}
                <cylinderGeometry args={[0.6, 0.6, 2.5, 8]} />
            </ProjectItem>

            {/* Project 3: Frontend / 3D (Right) */}
            <ProjectItem
                position={[4, 0, 0]}
                color="#4f46e5" // Deep Blue
                label="Visual Systems"
                modalData={{
                    title: "3D Frontend Systems",
                    desc: "Performance-focused 3D interfaces using React, Three.js, and GSAP to visualize complex systems.",
                    tags: ["Three.js", "Frontend", "Animation", "UI Systems"]
                }}
            >
                {/* Abstract Morphing Shape */}
                <icosahedronGeometry args={[1, 0]} />
            </ProjectItem>
        </group>
    )
}

const ProjectItem = ({ position, color, label, modalData, children }: any) => {
    const mesh = useRef<THREE.Mesh>(null)
    const [hovered, setHover] = useState(false)
    const setModalContent = useStore((state) => state.setModalContent)

    useCursor(hovered)

    useFrame((_, delta) => {
        if (mesh.current) {
            // Idle rotation
            mesh.current.rotation.y += delta * 0.2

            // Hover reaction
            if (hovered) {
                mesh.current.rotation.y += delta * 0.5
                mesh.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1)

                // Pulse emissive
                const material = mesh.current.material as THREE.MeshStandardMaterial
                material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, 0.5, 0.1)
            } else {
                mesh.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
                const material = mesh.current.material as THREE.MeshStandardMaterial
                material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, 0.2, 0.1)
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
                    setModalContent(modalData.title) // Storing just title key or object? user store types simple string.
                    // Ideally store would accept object, but let's pass Title for now as the ID.
                    // Wait, the App.tsx loop uses the string to display basic info. 
                    // Let's rely on the store update in next step if needed, currently just display title.
                }}
            >
                {children}
                <meshStandardMaterial
                    color={color}
                    roughness={0.2}
                    metalness={0.8}
                    emissive={color}
                    emissiveIntensity={0.2}
                    wireframe={label === "Visual Systems" && !hovered} // Wireframe toggle for frontend proj
                />
            </mesh>

            {/* Using simple HTML label or just relied on hover? 
                User said "Hover highlights object". "NO TEXT BAKED INTO MESHES".
                So we remove text. 
            */}
        </group>
    )
}
