import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Stars, Instance, Instances } from '@react-three/drei'
import * as THREE from 'three'

export const Intro = () => {
    return (
        <group>
            {/* Background Atmosphere */}
            <Stars radius={50} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />

            {/* Voxel/Digitized Character Representation */}
            {/* Reduced float intensity so interaction is easier to catch */}
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2} floatingRange={[-0.1, 0.1]}>
                <group position={[-3, -1, 0]} rotation={[0, 0.5, 0]}>
                    <VoxelCharacter />
                </group>
            </Float>

            {/* Floating Fragments (Systems Debris) */}
            <Float speed={1} rotationIntensity={1} floatIntensity={1}>
                <Fragments />
            </Float>
        </group>
    )
}

const VoxelCharacter = () => {
    const meshRef = useRef<THREE.InstancedMesh>(null)
    const { viewport } = useThree()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Generate voxel grid positions once
    const { voxels, originPos } = useMemo(() => {
        const tempVoxels: Array<{ x: number, y: number, z: number }> = []
        const stride = 0.4

        // Helper to push
        const add = (x: number, y: number, z: number) => tempVoxels.push({ x, y, z })

        // Head
        for (let x = -1; x <= 1; x++)
            for (let y = 4; y <= 5; y++)
                for (let z = -1; z <= 1; z++) add(x, y, z)

        // Body
        for (let x = -2; x <= 2; x++)
            for (let y = 0; y <= 3; y++)
                for (let z = -1; z <= 1; z++) add(x, y, z)

        // Arms
        for (let y = 0; y <= 3; y++) {
            add(-3, y, 0) // Left
            add(3, y, 0)  // Right
        }

        // Pre-calculate actual local positions
        const origins = tempVoxels.map(v => new THREE.Vector3(v.x * stride, v.y * stride, v.z * stride))
        return { voxels: tempVoxels, originPos: origins }
    }, [])

    // Persistent state for current positions to enable lerping
    const currentPositions = useRef<THREE.Vector3[]>([])

    // Initialize current positions
    useMemo(() => {
        currentPositions.current = originPos.map(pos => pos.clone())
    }, [originPos])

    // Reusable vectors to avoid GC stutter
    const tempVec = useMemo(() => new THREE.Vector3(), [])
    const tempDir = useMemo(() => new THREE.Vector3(), [])
    const tempTarget = useMemo(() => new THREE.Vector3(), [])

    useFrame((state, delta) => {
        if (!meshRef.current) return

        // 1. Calculate Mouse in Local Space (Allocation free)
        // Normalize mouse to viewport dimensions
        const mouseX = (state.pointer.x * viewport.width) / 2
        const mouseY = (state.pointer.y * viewport.height) / 2

        tempVec.set(mouseX, mouseY, 0)
        meshRef.current.worldToLocal(tempVec) // tempVec is now local mouse position

        // 2. Update each voxel
        for (let i = 0; i < originPos.length; i++) {
            const origin = originPos[i]
            const current = currentPositions.current[i]

            // Reset target to origin
            tempTarget.copy(origin)

            // Physics: Calculate Repulsion
            const dist = origin.distanceTo(tempVec)
            const forceRadius = 3.0 // Increased slightly for better feel

            if (dist < forceRadius) {
                // Non-linear cubic ease out for force (smoother edge)
                const t = 1 - (dist / forceRadius)
                const force = t * t * 3.5 // Stronger core repulsion

                // Direction from mouse to origin
                tempDir.subVectors(origin, tempVec).normalize().multiplyScalar(force)
                tempTarget.add(tempDir)
            }

            // 3. Smooth Lerp (Frame-rate independent dampening)
            // 1 - Math.exp(-lambda * dt)
            // Lambda ~ 6-8 feels good for magnetic systems.
            const smoothFactor = 1 - Math.exp(-8 * delta)
            current.lerp(tempTarget, smoothFactor)

            // 4. Update Matrix
            dummy.position.copy(current)
            // dummy.rotation.set(0,0,0) // No need to reset if we don't change it
            // dummy.scale.set(1,1,1)

            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)
        }

        meshRef.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, voxels.length]}>
            <boxGeometry args={[0.35, 0.35, 0.35]} />
            <meshStandardMaterial
                color="#222"
                emissive="#4f46e5"
                emissiveIntensity={0.1}
                roughness={0.1}
                metalness={0.9}
            />
        </instancedMesh>
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
