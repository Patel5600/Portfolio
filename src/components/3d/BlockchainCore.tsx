import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Instances, Instance } from '@react-three/drei'
import * as THREE from 'three'

export const BlockchainCore = () => {
    const groupRef = useRef<THREE.Group>(null)

    // Generate Voxel Grid for the Spine
    const { voxels } = useMemo(() => {
        const tempVoxels: THREE.Vector3[] = []
        const stride = 0.4

        // Dimensions of one block in voxels
        const w = 5 // width
        const h = 3 // height
        const d = 3 // depth

        const numBlocks = 15
        const blockSpacing = 2.0 // Vertical space between block centers

        for (let b = 0; b < numBlocks; b++) {
            const blockCenterY = (b * blockSpacing) - (numBlocks * blockSpacing / 2)

            // Construct one block
            for (let x = -Math.floor(w / 2); x <= Math.floor(w / 2); x++) {
                for (let y = -Math.floor(h / 2); y <= Math.floor(h / 2); y++) {
                    for (let z = -Math.floor(d / 2); z <= Math.floor(d / 2); z++) {
                        tempVoxels.push(new THREE.Vector3(
                            x * stride,
                            blockCenterY + (y * stride),
                            z * stride
                        ))
                    }
                }
            }
        }
        return { voxels: tempVoxels }
    }, [])

    useFrame((state) => {
        if (groupRef.current) {
            // Slow, heavy rotation
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
        }
    })

    return (
        <group ref={groupRef}>
            <Instances range={voxels.length}>
                <boxGeometry args={[0.35, 0.35, 0.35]} />
                <meshStandardMaterial
                    color="#111"
                    emissive="#4f46e5"
                    emissiveIntensity={0.15}
                    roughness={0.1}
                    metalness={0.9}
                />

                {voxels.map((pos, i) => (
                    <Instance key={i} position={pos} />
                ))}
            </Instances>

            {/* Central Data Beam - Pixelated Stream */}
            <VoxelStream />
        </group>
    )
}

const VoxelStream = () => {
    const streamRef = useRef<THREE.Group>(null)
    const { particles } = useMemo(() => {
        const p: THREE.Vector3[] = []
        // Create a vertical line of scattered pixels
        for (let i = 0; i < 100; i++) {
            p.push(new THREE.Vector3(
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 30, // Tall span
                (Math.random() - 0.5) * 0.5
            ))
        }
        return { particles: p }
    }, [])

    useFrame((state) => {
        if (streamRef.current) {
            // Flow upwards
            streamRef.current.position.y = (state.clock.elapsedTime * 2) % 5
        }
    })

    return (
        <group ref={streamRef}>
            <Instances range={particles.length}>
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <meshBasicMaterial color="#6366f1" />
                {particles.map((pos, i) => <Instance key={i} position={pos} />)}
            </Instances>
        </group>
    )
}
