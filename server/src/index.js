import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import projectRoutes from './routes/projects.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://muhammadfaheemkhan2004.github.io',
    process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
            return callback(null, true);
        }
        return callback(null, true); // Allow all for now
    },
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database (non-blocking)
connectDB().then(() => {
    console.log('✅ MongoDB connected');
}).catch((err) => {
    console.warn('⚠️  MongoDB connection failed, server running without database');
    console.warn('   Error:', err.message);
});

// Root route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Muhammad Faheem Khan - Portfolio API',
        version: '1.0.0',
        status: 'Server is running',
        endpoints: {
            health: '/api/health',
            projects: {
                getAll: 'GET /api/projects',
                getOne: 'GET /api/projects/:id',
                create: 'POST /api/projects',
                update: 'PUT /api/projects/:id',
                delete: 'DELETE /api/projects/:id',
            },
            contact: {
                send: 'POST /api/contact',
                getAll: 'GET /api/contact',
                markAsRead: 'PUT /api/contact/:id',
                delete: 'DELETE /api/contact/:id',
            },
        },
        docs: 'Visit http://localhost:5173 for the frontend',
    });
});

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`🔗 Frontend: http://localhost:5173`);
    console.log(`📚 API Docs: http://localhost:${PORT}`);
});

// Handle server errors
server.on('error', (err) => {
    console.error('❌ Server error:', err);
    process.exit(1);
});
