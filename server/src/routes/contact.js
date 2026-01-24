import express from 'express';
import Contact from '../models/Contact.js';
import { sendContactConfirmation, sendContactNotification } from '../utils/emailService.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

// Send contact message
router.post('/', async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return next(new AppError('All fields are required', 400));
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return next(new AppError('Invalid email address', 400));
        }

        // Create contact record
        const contact = new Contact({
            name,
            email,
            subject,
            message,
        });

        const savedContact = await contact.save();

        // Try to send emails (but don't fail if they can't be sent)
        Promise.all([
            sendContactConfirmation(email, name),
            sendContactNotification(name, email, subject, message),
        ]).catch((emailError) => {
            console.warn('Email notification failed (message still saved):', emailError.message);
        });

        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully!',
            data: savedContact,
        });
    } catch (error) {
        next(new AppError('Failed to send message', 500));
    }
});

// Get all contact messages (admin)
router.get('/', async (req, res, next) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        next(new AppError('Failed to fetch messages', 500));
    }
});

// Mark as read
router.put('/:id', async (req, res, next) => {
    try {
        const message = await Contact.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        if (!message) {
            return next(new AppError('Message not found', 404));
        }

        res.json(message);
    } catch (error) {
        next(new AppError('Failed to update message', 500));
    }
});

// Delete message
router.delete('/:id', async (req, res, next) => {
    try {
        const message = await Contact.findByIdAndDelete(req.params.id);

        if (!message) {
            return next(new AppError('Message not found', 404));
        }

        res.json({ success: true, message: 'Message deleted successfully' });
    } catch (error) {
        next(new AppError('Failed to delete message', 500));
    }
});

export default router;
