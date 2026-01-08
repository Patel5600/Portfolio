import { useRef } from 'react'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import * as THREE from 'three'

import { Intro } from './components/3d/Intro'
import { BlockchainCore } from './components/3d/BlockchainCore'
import { AutomationSystem } from './components/3d/AutomationSystem'
import { FrontendSystem } from './components/3d/FrontendSystem'
import { Projects } from './components/3d/Projects'
import { Philosophy } from './components/3d/Philosophy'

import { ContactSignal } from './components/3d/ContactSignal'

gsap.registerPlugin(ScrollTrigger)

export const Experience = () => {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null)
    const sceneRef = useRef<THREE.Group>(null)

    useGSAP(() => {
        if (!cameraRef.current) return

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
            },
        })

        // Scroll total height is 700vh, so we have 6 transitions effectively.
        // Positions matches the group positions below.

        // 1 -> 2: Blockchain
        tl.to(cameraRef.current.position, { x: 0, y: -12, z: 12, duration: 1 })

        // 2 -> 3: Automation
        tl.to(cameraRef.current.position, { x: 0, y: -24, z: 14, duration: 1 })

        // 3 -> 4: Frontend
        tl.to(cameraRef.current.position, { x: 0, y: -36, z: 10, duration: 1 })

        // 4 -> 5: Projects
        tl.to(cameraRef.current.position, { x: 0, y: -48, z: 12, duration: 1 })

        // 5 -> 6: Philosophy
        tl.to(cameraRef.current.position, { x: 0, y: -60, z: 8, duration: 1 })

        // 6 -> 7: Contact (Pull back)
        tl.to(cameraRef.current.position, { x: 0, y: -72, z: 20, duration: 1 })

    }, { dependencies: [] })

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} ref={cameraRef} />

            {/* Functional, restrained lighting - No Shadows for high FPS */}
            <ambientLight intensity={0.1} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />

            {/* Lower resolution environment if possible, or keep default. City is fine, but maybe 'night' is lighter? stick to City for reflection. */}
            <Environment preset="city" />

            <group ref={sceneRef}>
                {/* 1. Intro */}
                <group position={[0, 0, 0]}>
                    <Intro />
                </group>

                {/* 2. Blockchain Infrastructure */}
                <group position={[2, -12, 0]}>
                    <BlockchainCore />
                </group>

                {/* 3. Automation Systems */}
                <group position={[-2, -24, 0]}>
                    <AutomationSystem />
                </group>

                {/* 4. Frontend Engineering */}
                <group position={[0, -36, 0]}>
                    <FrontendSystem />
                </group>

                {/* 5. Projects */}
                <group position={[0, -48, 0]}>
                    <Projects />
                </group>

                {/* 6. Philosophy */}
                <group position={[0, -60, 0]}>
                    <Philosophy />
                </group>

                {/* 7. Contact / Exit */}
                <group position={[0, -72, 0]}>
                    <ContactSignal />
                </group>
            </group>
        </>
    )
}
