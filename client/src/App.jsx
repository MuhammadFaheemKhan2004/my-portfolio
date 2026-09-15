import { useState } from 'react';
import { CarIntroAnimation, Navbar, Hero, About, Skills, Projects, Experience, Contact, Footer } from './components';

function App() {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <div className="relative overflow-hidden" style={{ background: '#050c12', color: '#f0f6fc' }}>
            {/* Opening Car Intro Animation */}
            {showIntro && <CarIntroAnimation onComplete={() => setShowIntro(false)} />}

            {/* Background mesh */}
            <div className="pointer-events-none fixed inset-0 -z-10 mesh-bg" />
            {/* Grid overlay */}
            <div className="pointer-events-none fixed inset-0 -z-10 grid-overlay opacity-35" />

            <Navbar onReplayIntro={() => setShowIntro(true)} />

            <main>
                <Hero />

                <div className="section-divider" />
                <About />

                <div className="section-divider" />
                <Skills />

                <div className="section-divider" />
                <Projects />

                <div className="section-divider" />
                <Experience />

                <div className="section-divider" />
                <Contact />
            </main>

            <Footer onReplayIntro={() => setShowIntro(true)} />
        </div>
    );
}

export default App;
