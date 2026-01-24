import {
    Navbar,
    Hero,
    About,
    Skills,
    Projects,
    Experience,
    Contact,
    Footer,
} from './components';
import './styles/globals.css';

function App() {
    return (
        <div className="bg-primary min-h-screen">
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
