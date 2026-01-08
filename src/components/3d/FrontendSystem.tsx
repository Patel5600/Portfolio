import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { TorusKnot } from '@react-three/drei'
import * as THREE from 'three'

export const FrontendSystem = () => {
    const meshRef = useRef<THREE.Mesh>(null)
    const [hovered, setHover] = useState(false)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
        }
    })

    return (
        <group>
            {/* Main morphing object */}
            <TorusKnot
                ref={meshRef}
                args={[2, 0.6, 128, 32]}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                {/* 
                   We can simulate "morphing" by having two materials or changing wireframe prop
                   based on scroll, but for now let's just show a controlled aesthetic 
                */}
                <meshStandardMaterial
                    color="#1a1a1a"
                    wireframe={!hovered} // Interactive element: solidify on hover
                    emissive={hovered ? "#4f46e5" : "#000"}
                    emissiveIntensity={0.5}
                />
            </TorusKnot>

            {/* Surrounding UI elements in 3D */}
            <mesh position={[3, 2, -1]}>
                <planeGeometry args={[2, 3]} />
                <meshBasicMaterial color="#4f46e5" wireframe opacity={0.3} transparent />
            </mesh>
            <mesh position={[-3, -2, -1]}>
                <planeGeometry args={[2, 3]} />
                <meshBasicMaterial color="#4f46e5" wireframe opacity={0.3} transparent />
            </mesh>
        </group>
    )
}
