# 📱 MERN Portfolio Complete Setup Guide

**Portfolio for Muhammad Faheem Khan - Mobile & Full-Stack Developer**

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Quick Start](#quick-start)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Configuration](#configuration)
6. [Development](#development)
7. [Deployment](#deployment)
8. [Customization](#customization)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

This is a **production-grade MERN stack portfolio website** for Muhammad Faheem Khan featuring:

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB
- **Deployment**: Vercel (Frontend) + Render (Backend)
- **Features**: Projects showcase, contact form, smooth animations

**Perfect for showcasing:**
- Mobile app development (Kotlin, Flutter)
- Full-stack projects (MERN)
- Real-time applications
- AI/API integrations

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ (download from https://nodejs.org/)
- MongoDB (local or MongoDB Atlas)
- Gmail account (for contact form emails)
- Git

### 1. Automatic Setup (Recommended)

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### 2. Manual Setup

```bash
# Install dependencies
npm install
cd client && npm install
cd ../server && npm install

# Configure environment (see Configuration section)
# Then start development
npm run dev
```

### 3. Access the Application

```
Frontend: http://localhost:5173
Backend:  http://localhost:5000/api
```

---

## 📂 Project Structure

```
mern-portfolio/
│
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx          # Navigation bar
│   │   │   ├── Hero.tsx            # Hero section
│   │   │   ├── About.tsx           # About section
│   │   │   ├── Skills.tsx          # Skills showcase
│   │   │   ├── Projects.tsx        # Projects gallery
│   │   │   ├── Experience.tsx      # Experience timeline
│   │   │   ├── Contact.tsx         # Contact form
│   │   │   └── Footer.tsx          # Footer
│   │   ├── services/
│   │   │   └── api.ts              # API client
│   │   ├── hooks/
│   │   │   └── useIntersectionObserver.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.tsx                 # Main app component
│   │   └── main.tsx                # Entry point
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── server/                          # Express Backend
│   ├── src/
│   │   ├── models/
│   │   │   ├── Project.js          # Project schema
│   │   │   └── Contact.js          # Contact message schema
│   │   ├── routes/
│   │   │   ├── projects.js         # Project endpoints
│   │   │   └── contact.js          # Contact endpoints
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   ├── config/
│   │   │   └── database.js         # MongoDB connection
│   │   ├── utils/
│   │   │   └── emailService.js     # Email sending
│   │   └── index.js                # Server entry point
│   ├── .env                        # Environment variables
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── package.json                    # Root package.json
├── README.md                       # Full documentation
├── QUICKSTART.md                   # Quick start guide
├── DEPLOYMENT.md                   # Deployment guide
├── SETUP_GUIDE.md                  # This file
├── setup.bat                       # Windows setup script
├── setup.sh                        # Mac/Linux setup script
├── vercel.json                     # Vercel config
└── Procfile                        # Heroku config
```

---

## ✨ Features

### Frontend
- ✅ **Responsive Design** - Mobile, tablet, desktop
- ✅ **Smooth Animations** - Framer Motion transitions
- ✅ **Component-Based** - Modular React architecture
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Fast Bundling** - Vite development server
- ✅ **Tailwind CSS** - Utility-first styling
- ✅ **API Integration** - Axios HTTP client

### Backend
- ✅ **RESTful API** - Clean endpoint design
- ✅ **MongoDB Database** - Document-based storage
- ✅ **Email Notifications** - Nodemailer integration
- ✅ **Error Handling** - Centralized error middleware
- ✅ **CORS Enabled** - Cross-origin requests
- ✅ **Input Validation** - Joi/manual validation
- ✅ **Environment Config** - Dotenv management

---

## ⚙️ Configuration

### Frontend Configuration

**`client/.env`:**
```env
VITE_API_URL=http://localhost:5000/api
```

For production:
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Backend Configuration

**`server/.env`:**

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/portfolio
# OR MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Email (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Client
CLIENT_URL=http://localhost:5173

# Security
JWT_SECRET=your-secret-key
```

### Setting up Gmail App Password

1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" → "Windows Computer" (or your OS)
3. Google generates 16-character password
4. Copy and paste into `EMAIL_PASSWORD`

### MongoDB Setup

**Option A: Local MongoDB**
```bash
# Windows: Download from https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: Follow MongoDB documentation

# Start MongoDB
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free tier cluster
3. Create database user
4. Get connection string
5. Update `MONGODB_URI` in `.env`

---

## 💻 Development

### Commands

```bash
# Start all (frontend + backend)
npm run dev

# Frontend only
npm run client:dev

# Backend only
npm run server:dev

# Build frontend
npm run client:build

# Build backend
npm run server:build

# Preview frontend build
npm run preview
```

### Development Workflow

1. **Make changes** in `client/` or `server/`
2. **Frontend**: Automatic HMR (hot reload)
3. **Backend**: Automatic restart with nodemon
4. **Test features** in browser at http://localhost:5173
5. **Check backend logs** in terminal

### File Changes
- Edit components in `client/src/components/`
- Update API calls in `client/src/services/api.ts`
- Modify backend routes in `server/src/routes/`
- Change styles in `client/tailwind.config.js`

---

## 🌐 Deployment

### Frontend → Vercel

```bash
npm i -g vercel
vercel
```

**Or via GitHub:**
1. Push code to GitHub
2. Go to https://vercel.com/new
3. Select repository
4. Configure build settings
5. Add `VITE_API_URL` environment variable
6. Deploy!

### Backend → Render

1. Push code to GitHub (entire repo)
2. Go to https://render.com
3. New Web Service
4. Connect GitHub
5. Configure:
   - Build: `npm install`
   - Start: `npm start`
   - Root: `server`
6. Add environment variables:
   - `MONGODB_URI`
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `CLIENT_URL`
   - `NODE_ENV=production`
7. Deploy!

### Updates After Deployment

- Push changes to GitHub
- Vercel/Render automatically redeploy
- Changes live in 1-3 minutes

See `DEPLOYMENT.md` for detailed instructions.

---

## 🎨 Customization

### Update Portfolio Data

**Hero Section** - `client/src/components/Hero.tsx`
```typescript
// Change headline
<motion.h1>Your Name</motion.h1>

// Change subheadline
<motion.p>Your title</motion.p>

// Update social links
<a href="https://github.com/your-username">
```

**About Section** - `client/src/components/About.tsx`
```typescript
// Update professional summary
<p className="text-lg text-gray-300">Your bio here</p>
```

**Skills Section** - `client/src/components/Skills.tsx`
```typescript
const skills: Skill[] = [
  {
    category: 'Your Category',
    items: ['Skill 1', 'Skill 2'],
  },
  // Add more...
];
```

**Contact Info** - `client/src/components/Contact.tsx`
```typescript
// Update email
<a href="mailto:your-email@gmail.com">

// Update phone
<a href="tel:+1234567890">

// Update location
<p>Your Location</p>
```

### Add Projects via API

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Project Name",
    "description": "Project description",
    "image": "https://...",
    "technologies": ["React", "Node.js"],
    "github": "https://github.com/...",
    "demo": "https://...",
    "featured": true
  }'
```

**Using Postman:**
1. Create POST request to `http://localhost:5000/api/projects`
2. Select Body → JSON
3. Paste project object
4. Send!

### Update Styling

**Colors:**
- Edit `client/tailwind.config.js`
- Update `theme.extend.colors`

**Animations:**
- Edit component files
- Modify Framer Motion variants
- See https://www.framer.com/motion/

---

## 🐛 Troubleshooting

### Port Already in Use

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Failed

- [ ] MongoDB is running (`mongod` command)
- [ ] Connection string is correct in `.env`
- [ ] If using Atlas: IP is whitelisted
- [ ] Database name is correct

### CORS Errors

- [ ] Backend is running
- [ ] `CLIENT_URL` correct in `server/.env`
- [ ] `VITE_API_URL` correct in `client/.env`
- [ ] Backend CORS configuration is correct

### Email Not Sending

- [ ] Gmail app password (not regular password)
- [ ] 2FA enabled on Gmail account
- [ ] Email credentials correct in `.env`
- [ ] Check inbox spam folder

### Build Fails

- [ ] Clear `node_modules`: `rm -rf node_modules && npm install`
- [ ] Check Node version: `node --version` (16+)
- [ ] Check all `.env` variables
- [ ] Check browser console for errors

### API Returns 404

- [ ] Backend running on port 5000
- [ ] API endpoint exists in backend
- [ ] Correct route path in API call
- [ ] Check server console for logs

---

## 📚 Additional Resources

- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org
- **Vite**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion/
- **Node.js**: https://nodejs.org
- **Express**: https://expressjs.com
- **MongoDB**: https://www.mongodb.com
- **Vercel**: https://vercel.com
- **Render**: https://render.com

---

## 🎓 Learning Outcomes

After setting up this portfolio, you'll have learned:

✅ Full-stack web development with MERN
✅ React hooks and component composition
✅ TypeScript for type-safe code
✅ REST API design with Express
✅ Database design with MongoDB
✅ Email integration with Nodemailer
✅ Responsive design with Tailwind CSS
✅ Animation with Framer Motion
✅ Deployment to Vercel and Render
✅ Environment configuration and secrets management

---

## ✅ Checklist Before Deployment

- [ ] All contact form fields validate properly
- [ ] Email sending works locally
- [ ] Projects load from API
- [ ] Responsive design looks good on all devices
- [ ] All links work (GitHub, LinkedIn, etc.)
- [ ] No console errors in browser
- [ ] Backend returns correct API responses
- [ ] Environment variables configured
- [ ] MongoDB backup created
- [ ] Git repo initialized
- [ ] README updated with your info
- [ ] Portfolio data is your actual data

---

## 📞 Support & Contact

**Muhammad Faheem Khan**
- 📧 Email: faheemniazi2004@gmail.com
- 📱 Phone: +92 307 9079023
- 📍 Location: Islamabad, Pakistan
- 💼 LinkedIn: (Add your profile)
- 🐙 GitHub: (Add your profile)

---

## 📄 License

MIT License - Feel free to use this portfolio for your own purposes!

---

**Built with ❤️ using MERN Stack**

Last updated: January 24, 2026
