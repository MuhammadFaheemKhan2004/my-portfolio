// Sample projects to seed into MongoDB
// Use this to quickly populate the database with portfolio projects

const sampleProjects = [
    {
        title: "Exam Master App",
        description:
            "Comprehensive practice platform for CSS, PMS, PPSC, FPPSC, NTS, PTS, ECAT, MDCAT with 50,000+ MCQs, real-time job alerts, and Firebase-powered backend.",
        image: "https://via.placeholder.com/400x300?text=Exam+Master",
        technologies: ["Flutter", "Firebase", "Kotlin", "Android SDK"],
        github: "https://github.com/faheemkhan/exam-master",
        demo: "https://exammaster.example.com",
        featured: true,
    },
    {
        title: "AI Lawyer App",
        description:
            "Intelligent legal assistant powered by AI providing case-specific roadmaps, legal insights, document analysis, and recommendations using trained AI models.",
        image: "https://via.placeholder.com/400x300?text=AI+Lawyer",
        technologies: ["React", "Node.js", "AI/ML", "MongoDB", "TensorFlow"],
        github: "https://github.com/faheemkhan/ai-lawyer",
        demo: "https://ailawyer.example.com",
        featured: true,
    },
    {
        title: "News App",
        description:
            "Real-time news aggregator with intelligent category-based filtering, personalized recommendations, and offline reading powered by News API.",
        image: "https://via.placeholder.com/400x300?text=News+App",
        technologies: ["Flutter", "News API", "Firebase", "Dart"],
        github: "https://github.com/faheemkhan/news-app",
        demo: "https://newsapp.example.com",
        featured: false,
    },
    {
        title: "Google Maps Integration App",
        description:
            "Advanced location-based services application with real-time navigation, route optimization, location sharing, and GPS tracking capabilities.",
        image: "https://via.placeholder.com/400x300?text=Maps+App",
        technologies: ["Kotlin", "Google Maps API", "Android SDK", "Firebase"],
        github: "https://github.com/faheemkhan/maps-app",
        demo: "https://mapsapp.example.com",
        featured: false,
    },
    {
        title: "Event Management Platform",
        description:
            "Complete wedding and event planning solution with vendor management, budget tracking, real-time collaboration, and secure payment integration.",
        image: "https://via.placeholder.com/400x300?text=Event+Manager",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Socket.io"],
        github: "https://github.com/faheemkhan/event-manager",
        demo: "https://eventmanager.example.com",
        featured: true,
    },
    {
        title: "Real-Time Chat Application",
        description:
            "Instant messaging platform with typing indicators, read receipts, group chats, media sharing, and seamless UX built on Firebase Realtime Database.",
        image: "https://via.placeholder.com/400x300?text=Chat+App",
        technologies: ["React", "Firebase", "TypeScript", "Tailwind CSS"],
        github: "https://github.com/faheemkhan/chat-app",
        demo: "https://chatapp.example.com",
        featured: false,
    },
];

// MongoDB insert command
// db.projects.insertMany(sampleProjects)

// Or use this Node.js script:
/*
import mongoose from 'mongoose';
import Project from './src/models/Project.js';

mongoose.connect('mongodb://localhost:27017/portfolio');

const seedProjects = async () => {
  try {
    await Project.deleteMany({});
    const inserted = await Project.insertMany(sampleProjects);
    console.log(`${inserted.length} projects inserted`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
};

seedProjects();
*/

export default sampleProjects;
