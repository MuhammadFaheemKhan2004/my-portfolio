import { Navbar, Hero, About, Skills, InteractiveSimulator, Projects, Experience, Contact, Footer } from './components';

function App() {
    return (
        <div className="relative overflow-hidden" style={{ background: '#050c12', color: '#f0f6fc' }}>
            {/* Background mesh */}
            <div className="pointer-events-none fixed inset-0 -z-10 mesh-bg" />
            {/* Grid overlay */}
            <div className="pointer-events-none fixed inset-0 -z-10 grid-overlay opacity-35" />

            <Navbar />

            <main>
                <Hero />

                <div className="section-divider" />
                <About />

                <div className="section-divider" />
                <Skills />

                <div className="section-divider" />
                <InteractiveSimulator />

                <div className="section-divider" />
                <Projects />

                <div className="section-divider" />
                <Experience />

                <div className="section-divider" />
                <Contact />
            </main>

            <Footer />
        </div>
    );
}

export default App;
