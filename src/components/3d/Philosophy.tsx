import { Float } from '@react-three/drei'

export const Philosophy = () => {
    return (
        <group>
            {/* Stable, slow moving heavy object */}
            <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
                <mesh>
                    <octahedronGeometry args={[1.5, 0]} />
                    <meshStandardMaterial color="#050505" roughness={0.8} />
                </mesh>
                <mesh scale={[1.01, 1.01, 1.01]}>
                    <octahedronGeometry args={[1.5, 0]} />
                    <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
                </mesh>

                {/* Inner core - subtle stability */}
                <mesh scale={[0.5, 0.5, 0.5]}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#0a0a0a" emissive="#4f46e5" emissiveIntensity={0.1} wireframe />
                </mesh>
            </Float>
        </group>
    )
}
