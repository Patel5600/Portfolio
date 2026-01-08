import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles, useCursor } from '@react-three/drei'
import * as THREE from 'three'

export const Philosophy = () => {
    const meshRef = useRef<THREE.Group>(null)
    const [hovered, setHover] = useState(false)

    useCursor(hovered)

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Normal: Slow reverse rotation -0.35
            // Ignited: Fast forward rotation 2.0 + Turbulence
            const targetSpeed = hovered ? 2.5 : -0.35
            meshRef.current.rotation.y += delta * targetSpeed

            // Jitter scale when ignited
            const time = state.clock.elapsedTime
            const baseScale = hovered ? 1.05 + Math.sin(time * 20) * 0.05 : 1 + Math.sin(time * 0.8) * 0.01
            meshRef.current.scale.lerp(new THREE.Vector3(baseScale, baseScale, baseScale), 0.1)
        }
    })

    return (
        <group
            ref={meshRef}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            {/* Core Object */}
            <mesh rotation={[0, Math.PI / 4, 0]}>
                <octahedronGeometry args={[2, 0]} />
                {/* 
                    Material Transition:
                    Normal: Matte Gray
                    Ignited: Emissive Blue "Star" core
                */}
                <meshStandardMaterial
                    color={hovered ? "#000" : "#222"}
                    emissive={hovered ? "#3b82f6" : "#000"} // Blue flame color
                    emissiveIntensity={hovered ? 4.0 : 0}
                    roughness={hovered ? 0.2 : 0.9}
                    metalness={hovered ? 1.0 : 0.1}
                    flatShading={!hovered}
                    wireframe={hovered} // Turn to energy structure when ignited? Or keep solid? Let's try solid core + wireframe glow. 
                // Actually user said "blue star flame". Wireframe looks more like energy.
                />
            </mesh>

            {/* Inner "Fuel" - Visible only when NOT ignited to give depth, OR used as the flame aura when ignited */}
            <mesh rotation={[0, Math.PI / 4, 0]} scale={[1.2, 1.2, 1.2]}>
                <octahedronGeometry args={[2, 0]} />
                <meshBasicMaterial
                    color="#60a5fa"
                    wireframe
                    transparent
                    opacity={hovered ? 0.3 : 0} // Glow aura when ignited
                />
            </mesh>

            {/* Sparkles - The Flame */}
            {hovered && (
                <Sparkles
                    count={50}
                    scale={6}
                    size={4}
                    speed={2}
                    opacity={1}
                    color="#93c5fd"
                />
            )}
        </group>
    )
}
