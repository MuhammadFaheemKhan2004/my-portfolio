import { Navbar, Hero, About, Skills, Projects, Experience, Contact, Footer } from './components';

function App() {
    return (
        <div className="bg-primary text-white">
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
            <Footer />
        </div>
    );
}

export default App;
