import mongoose from 'mongoose';
import Project from './src/models/Project.js';
import dotenv from 'dotenv';

dotenv.config();

const defaultProjects = [
    {
        title: 'Exam Master App',
        description: 'Practice app for CSS, PMS, PPSC, FPPSC, NTS, PTS, ECAT, MDCAT with 50,000+ MCQs and job alerts.',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
        technologies: ['Flutter', 'Firebase', 'Kotlin'],
        github: 'https://github.com',
        demo: 'https://exammaster.com',
        featured: true,
    },
    {
        title: 'AI Lawyer App',
        description: 'AI-powered legal assistant providing case-specific roadmaps and legal insights using trained AI models.',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
        technologies: ['React', 'Node.js', 'AI/ML', 'MongoDB'],
        github: 'https://github.com',
        demo: 'https://ailawyer.com',
        featured: true,
    },
    {
        title: 'News App',
        description: 'Real-time news aggregator with category-based filtering powered by News API.',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop',
        technologies: ['Flutter', 'News API', 'Firebase'],
        github: 'https://github.com',
        demo: 'https://newsapp.com',
        featured: false,
    },
    {
        title: 'Google Maps Integration App',
        description: 'Location-based services with navigation and real-time tracking capabilities.',
        image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=300&fit=crop',
        technologies: ['Kotlin', 'Google Maps API', 'Android SDK'],
        github: 'https://github.com',
        demo: 'https://mapsapp.com',
        featured: false,
    },
    {
        title: 'Event Management App',
        description: 'Complete wedding and event planning platform with booking and scheduling system.',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        github: 'https://github.com',
        demo: 'https://eventmanager.com',
        featured: true,
    },
    {
        title: 'Real-Time Chat App',
        description: 'Instant messaging application using Firebase Realtime Database with seamless UX.',
        image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=300&fit=crop',
        technologies: ['React', 'Firebase', 'JavaScript'],
        github: 'https://github.com',
        demo: 'https://chatapp.com',
        featured: false,
    },
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');

        // Delete existing projects
        await Project.deleteMany({});
        console.log('🗑️  Cleared existing projects');

        // Insert new projects
        const insertedProjects = await Project.insertMany(defaultProjects);
        console.log(`✅ Added ${insertedProjects.length} projects to database`);

        // Show what was added
        console.log('\n📝 Projects added:');
        insertedProjects.forEach((project, index) => {
            console.log(`${index + 1}. ${project.title}`);
        });

        console.log('\n✅ Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    }
};

seedDatabase();
