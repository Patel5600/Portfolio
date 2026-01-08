import { useEffect } from 'react'
import Lenis from 'lenis'
import { Canvas } from '@react-three/fiber'
import { Experience } from './Experience'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useStore } from './store'
import './index.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const modalContent = useStore((state) => state.modalContent)
  const setModalContent = useStore((state) => state.setModalContent)

  useEffect(() => {
    const lenis = new Lenis()

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker to drive Lenis for perfect sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  useGSAP(() => {
    gsap.to('.intro-text h1', { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 })
    gsap.to('.intro-text p', { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 1 })
  })

  return (
    <>
      <div id="canvas-container">
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true
          }}
          camera={{ position: [0, 0, 10], fov: 45 }}
        >
          <Experience />
        </Canvas>
      </div>

      <main className="scroll-content">

        {/* SECTION 1: HERO */}
        <section className="section section-1 intro-text">
          <h1>Patel.dev</h1>
          <h3>Systems for Blockchain & Automation</h3>
          <p>
            I build automated Web3 systems, on-chain verification tools,<br />
            and frontend infrastructure designed for reliability, not hype.
          </p>
          <div style={{ pointerEvents: 'auto' }}>
            <a href="#projects" className="btn">View Projects</a>
            <a href="https://github.com" target="_blank" className="btn">GitHub</a>
          </div>
        </section>

        {/* SECTION 2: BLOCKCHAIN */}
        <section className="section section-2 infra-text">
          <h3>Core Infrastructure</h3>
          <h2>Blockchain & Web3</h2>
          <ul>
            <li>On-chain document hashing & verification</li>
            <li>Smart contract interaction (ethers.js)</li>
            <li>Multi-wallet systems & testnet automation</li>
            <li>Transaction lifecycle tracking</li>
            <li>Integrity-first metadata design</li>
          </ul>
        </section>

        {/* SECTION 3: AUTOMATION */}
        <section className="section section-3 infra-text" style={{ alignItems: 'flex-end', paddingRight: '10%' }}>
          <h3>Automation Systems</h3>
          <h2>Pipeline & Bots</h2>
          <ul style={{ textAlign: 'right', alignItems: 'flex-end', display: 'flex', flexDirection: 'column' }}>
            <li>Selenium automation & RPA workflows</li>
            <li>Wallet rotation & faucet logic</li>
            <li>Testnet environment orchestration</li>
            <li>Mechanical, deterministic execution</li>
          </ul>
        </section>

        {/* SECTION 4: FRONTEND */}
        <section className="section section-4 center-text">
          <h3>Frontend Engineering</h3>
          <h2>Visual Systems</h2>
          <p>
            UI engineering. Animation orchestration.<br />
            Performance-aware rendering. Control over chaos.
          </p>
        </section>

        {/* SECTION 5: PROJECTS */}
        <section className="section section-5 center-text" id="projects">
          <h3>Selected Work</h3>
          <h2>Projects Gallery</h2>
          <p>Interactive 3D Objects represent distinct systems.</p>
        </section>

        {/* SECTION 6: PHILOSOPHY */}
        <section className="section section-6 center-text">
          <h3>Philosophy</h3>
          <h2>Stability Zone</h2>
          <p>
            Zero-budget execution.<br />
            Automation over manpower.<br />
            Systems over shortcuts.<br />
            Utility over hype.
          </p>
        </section>

        {/* SECTION 7: CONTACT */}
        <section className="section section-7 center-text">
          <h2>Contact</h2>
          <div style={{ pointerEvents: 'auto', display: 'flex', gap: '2rem', justifyContent: 'center' }}>
            <a href="https://github.com" className="btn">GitHub</a>
            <a href="mailto:irshad@example.com" className="btn">Email</a>
          </div>
        </section>

      </main>

      {modalContent && (
        <div className="ui-layer">
          <div className="modal">
            <h2 style={{ marginBottom: '1rem' }}>{modalContent} System</h2>
            <p>Detailed metrics, architectural diagrams, and live status of the {modalContent} system.</p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <button onClick={() => setModalContent(null)} style={{ padding: '0.5rem 1rem', background: 'white', color: 'black', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                Close Access
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
