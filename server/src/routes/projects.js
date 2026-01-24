import express from 'express';
import Project from '../models/Project.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

// Get all projects
router.get('/', async (req, res, next) => {
    try {
        const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
        res.json(projects);
    } catch (error) {
        next(new AppError('Failed to fetch projects', 500));
    }
});

// Get single project
router.get('/:id', async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return next(new AppError('Project not found', 404));
        }
        res.json(project);
    } catch (error) {
        next(new AppError('Invalid project ID', 400));
    }
});

// Create project (admin)
router.post('/', async (req, res, next) => {
    try {
        const { title, description, technologies, github, demo, featured, image } = req.body;

        if (!title || !description) {
            return next(new AppError('Title and description are required', 400));
        }

        const project = new Project({
            title,
            description,
            technologies: technologies || [],
            github: github || '',
            demo: demo || '',
            featured: featured || false,
            image: image || 'https://via.placeholder.com/400x300',
        });

        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (error) {
        next(new AppError('Failed to create project', 500));
    }
});

// Update project
router.put('/:id', async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!project) {
            return next(new AppError('Project not found', 404));
        }

        res.json(project);
    } catch (error) {
        next(new AppError('Failed to update project', 500));
    }
});

// Delete project
router.delete('/:id', async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return next(new AppError('Project not found', 404));
        }

        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        next(new AppError('Failed to delete project', 500));
    }
});

export default router;
