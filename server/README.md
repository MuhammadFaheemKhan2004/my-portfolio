# Portfolio Backend API

Node.js + Express API for Muhammad Faheem Khan's portfolio website.

## Features

- 📁 Project management endpoints
- 📧 Contact form with email notifications
- 💾 MongoDB integration with Mongoose
- 🔒 CORS enabled
- ⚡ Error handling middleware
- 🔗 RESTful API design

## Getting Started

```bash
npm install
npm run dev
```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages (admin)
- `PUT /api/contact/:id` - Mark as read
- `DELETE /api/contact/:id` - Delete message

## Environment Variables

See `.env.example` for required variables.

## Database

Uses MongoDB. Install locally or use MongoDB Atlas cloud service.

## Email Setup

Gmail app passwords are required:
1. Enable 2FA on Google account
2. Generate app password at https://myaccount.google.com/apppasswords
3. Use app password in `EMAIL_PASSWORD`
