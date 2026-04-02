import { Navbar, Hero, About, Skills, Projects, Experience, Contact, Footer } from './components';

function App() {
    return (
        <div className="relative overflow-hidden bg-primary text-slate-100">
            <div className="pointer-events-none fixed inset-0 -z-10 mesh-bg" />
            <div className="pointer-events-none fixed inset-0 -z-10 grid-overlay opacity-40" />

            <Navbar />

            <main className="space-y-8 sm:space-y-12">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
            </main>

            <Footer />
        </div>
    );
}

export default App;
