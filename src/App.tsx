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
          <h1>Patel<span style={{ color: '#4f46e5' }}>.dev</span></h1>
          <h3>Systems for Blockchain & Automation</h3>
          <p>
            I build automated Web3 systems, on-chain verification tools,<br />
            and frontend infrastructure designed for reliability, not hype.
          </p>
          <div style={{ pointerEvents: 'auto' }}>
            <a href="#projects" className="btn">View Projects</a>
            <a href="https://github.com/Patel5600" target="_blank" className="btn">GitHub</a>
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
        <section className="section section-4 center-text" style={{ paddingTop: '5vh' }}>
          <h3 style={{ letterSpacing: '0.2em', opacity: 0.7, fontSize: '0.9rem' }}>FRONTEND ENGINEERING</h3>
          <h2>VISUAL SYSTEMS</h2>
          <p>
            UI engineering. Animation orchestration.<br />
            Performance-aware rendering. Control over chaos.
          </p>
        </section>

        {/* SECTION 5: PROJECTS */}
        <section className="section section-5 center-text" id="projects">
          <h3>Selected Work</h3>
          <h2>Projects Gallery</h2>
          <p style={{ marginBottom: '2rem' }}>Interactive 3D systems representing real blockchain and automation projects.</p>
          <span style={{ fontSize: '0.8rem', color: '#666', border: '1px solid #333', padding: '0.5rem 1rem', borderRadius: '4px' }}>
            Hover to inspect • Click to access system details
          </span>
        </section>

        {/* SECTION 6: PHILOSOPHY */}
        <section className="section section-6 center-text">
          <h3>Philosophy</h3>
          <h2>Stability Zone</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ borderLeft: 'none', padding: 0, color: '#e5e5e5', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Zero-budget execution.</li>
            <li style={{ borderLeft: 'none', padding: 0, color: '#e5e5e5', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Automation over manpower.</li>
            <li style={{ borderLeft: 'none', padding: 0, color: '#e5e5e5', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Systems over shortcuts.</li>
            <li style={{ borderLeft: 'none', padding: 0, color: '#e5e5e5', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Utility over hype.</li>
          </ul>
          <p style={{ opacity: 0.5, fontSize: '0.9rem', marginTop: '2rem' }}>Designing for reliability when resources are limited.</p>
        </section>

        {/* SECTION 7: CONTACT */}
        <section className="section section-7 center-text">
          <h3>Contact</h3>
          <h2>END OF SYSTEM</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 2rem auto', color: '#a3a3a3' }}>
            If you’re building something that values reliability over noise,<br />
            you know where to reach me.
          </p>
          <div style={{ pointerEvents: 'auto', display: 'flex', gap: '3rem', justifyContent: 'center' }}>
            <a href="https://github.com/Patel5600" target="_blank" className="link-arrow">→ GitHub</a>
            <a href="mailto:irshad@example.com" className="link-arrow">→ Email</a>
          </div>
          <p style={{ marginTop: '4rem', fontSize: '0.75rem', opacity: 0.2 }}>
            System Halted.
          </p>
        </section>

      </main>

      {modalContent && (
        <div className="ui-layer">
          <div className="modal">
            {/* 
               Simple lookup for modal content. 
               In a real app this would be a separate data object, but we'll inline for simplicity. 
            */}
            {(() => {
              const data = {
                "On-Chain Document Verification": {
                  desc: "Hash-based document verification using smart contracts to prove integrity without exposing data.",
                  tags: ["Blockchain", "Smart Contracts", "Verification", "Web3"]
                },
                "Automation & Wallet Systems": {
                  desc: "Automated workflows for testnets, faucets, and multi-wallet interactions designed to simulate real-user behavior.",
                  tags: ["Automation", "Bots", "Web3", "Systems"]
                },
                "3D Frontend Systems": {
                  desc: "Performance-focused 3D interfaces using React, Three.js, and GSAP to visualize complex systems.",
                  tags: ["Three.js", "Frontend", "Animation", "UI Systems"]
                }
              }[modalContent]

              // Fallback
              const desc = data?.desc || "System details restricted."
              const tags = data?.tags || []

              return (
                <>
                  <h2 style={{ marginBottom: '1rem', color: '#fff' }}>{modalContent}</h2>
                  <p style={{ color: '#a3a3a3', marginBottom: '1.5rem' }}>
                    {desc}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    {tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '0.8rem',
                        padding: '0.25rem 0.75rem',
                        border: '1px solid #333',
                        borderRadius: '100px',
                        color: '#888'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => setModalContent(null)} className="btn" style={{ marginTop: 0, fontSize: '0.9rem', padding: '0.5rem 1.5rem' }}>
                      Close System
                    </button>
                    <a href="https://github.com/Patel5600" target="_blank" className="btn" style={{ marginTop: 0, fontSize: '0.9rem', padding: '0.5rem 1.5rem', background: '#fff', color: '#000' }}>
                      View Code
                    </a>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </>
  )
}

export default App
