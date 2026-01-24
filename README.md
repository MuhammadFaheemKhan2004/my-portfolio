# MERN Portfolio Website

Professional portfolio website for **Muhammad Faheem Khan** - Mobile & Full-Stack Developer

## 🌟 Features

- ⚛️ Modern React 18 with TypeScript
- 🎨 Beautiful UI with Tailwind CSS
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🔗 RESTful API backend with Node.js + Express
- 💾 MongoDB database integration
- 📧 Contact form with email notifications
- 🚀 Optimized for production deployment
- 🔒 Error handling and validation

## 📂 Project Structure

```
mern-portfolio/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── services/      # API calls
│   │   ├── hooks/         # Custom React hooks
│   │   ├── styles/        # Global styles
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                 # Express Backend
│   ├── src/
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # API endpoints
│   │   ├── controllers/   # Business logic
│   │   ├── middleware/    # Custom middleware
│   │   ├── config/        # Configuration
│   │   ├── utils/         # Utility functions
│   │   └── index.js       # Server entry point
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── package.json           # Root package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- MongoDB (local or cloud via MongoDB Atlas)
- Gmail account (for email notifications)

### Installation

1. **Clone and install dependencies:**

```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

2. **Environment Setup:**

```bash
# Backend (.env in server directory)
cd server
cp .env.example .env
# Edit .env with your values

# Frontend (.env in client directory)
cd ../client
cp .env.example .env
```

3. **Start Development:**

```bash
# Option 1: From root directory (runs both)
npm run dev

# Option 2: In separate terminals
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

Visit `http://localhost:5173` for the frontend.

## 📦 Build for Production

```bash
# Build both
npm run client:build
npm run server:build

# Or individual builds
cd client && npm run build
cd server && npm run start
```

## 🌐 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set `VITE_API_URL` environment variable
4. Deploy

```bash
# Or deploy directly
npm i -g vercel
vercel
```

### Backend (Render or Heroku)

1. Push code to GitHub
2. Create new Web Service on Render
3. Set environment variables
4. Deploy

**Environment Variables:**
- `MONGODB_URI`
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- `CLIENT_URL`
- `NODE_ENV=production`

## 📋 API Documentation

### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Contact
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages
- `PUT /api/contact/:id` - Mark message as read
- `DELETE /api/contact/:id` - Delete message

## 🛠️ Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- Nodemailer
- Joi (validation)
- CORS

## 📝 Portfolio Sections

1. **Hero** - Introduction with CTAs
2. **About** - Professional summary and stats
3. **Skills** - Grouped technical skills
4. **Projects** - Featured portfolio projects
5. **Experience** - Work history and education
6. **Contact** - Contact form with validation

## 👤 Contact

**Muhammad Faheem Khan**
- 📧 Email: faheemniazi2004@gmail.com
- 📱 Phone: +92 307 9079023
- 📍 Location: Islamabad, Pakistan

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ by Muhammad Faheem Khan
