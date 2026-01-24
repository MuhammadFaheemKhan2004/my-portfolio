# 🎯 MERN Portfolio - Quick Reference Cheat Sheet

## 🚀 Getting Started (Copy-Paste Ready)

### Windows
```bash
setup.bat
```

### Mac/Linux
```bash
chmod +x setup.sh && ./setup.sh
```

### Manual Install
```bash
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
```

---

## ⚙️ Essential Configuration

### Server .env (MUST EDIT)
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### Client .env (Already Set)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Running the Application

### Development (All-in-One)
```bash
npm run dev
```

### Development (Separate Terminals)
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2 (new terminal)
cd client && npm run dev
```

### URLs
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000/api
- **Health**: http://localhost:5000/api/health

---

## 🔨 Common Commands

### Frontend
```bash
npm run client:dev        # Start dev server
npm run client:build      # Production build
npm run preview          # Preview build locally
```

### Backend
```bash
npm run server:dev       # Start with hot reload
npm start               # Start production
npm run server:build    # Build (no build needed)
```

### Root Commands
```bash
npm run dev            # Start both
npm run client:dev     # Frontend only
npm run server:dev     # Backend only
npm run client:build   # Build frontend
npm run preview        # Preview frontend
```

---

## 📝 Quick Edits

### Update Contact Info
**File**: `client/src/components/Contact.tsx`
```typescript
// Line 72: Email
<a href="mailto:your-email@gmail.com">

// Line 85: Phone
<a href="tel:+your-phone">

// Line 100: Location
<p>Your Location</p>
```

### Update Hero Section
**File**: `client/src/components/Hero.tsx`
```typescript
// Line 40: Name
<motion.h1>Your Name</motion.h1>

// Line 45: Title
<motion.p>Your Title</motion.p>

// Line 50: Bio
<motion.p>Your bio here</motion.p>
```

### Update Social Links
**File**: `client/src/components/Hero.tsx`
- Line 72: GitHub link
- Line 81: LinkedIn link
- Line 90: Email link

### Add Skills
**File**: `client/src/components/Skills.tsx`
```typescript
const skills: Skill[] = [
  {
    category: 'New Category',
    items: ['Skill 1', 'Skill 2'],
  },
];
```

### Update About
**File**: `client/src/components/About.tsx`
```typescript
// Line 33-50: Professional summary
<p className="text-lg text-gray-300">
  Your bio here...
</p>
```

---

## 🔌 API Endpoints

### Projects
```bash
# Get all projects
GET http://localhost:5000/api/projects

# Get one project
GET http://localhost:5000/api/projects/{id}

# Create project
POST http://localhost:5000/api/projects
Body: {
  "title": "Name",
  "description": "Desc",
  "technologies": ["React"],
  "github": "url",
  "demo": "url",
  "featured": true
}

# Update project
PUT http://localhost:5000/api/projects/{id}

# Delete project
DELETE http://localhost:5000/api/projects/{id}
```

### Contact
```bash
# Send message
POST http://localhost:5000/api/contact
Body: {
  "name": "Your Name",
  "email": "email@example.com",
  "subject": "Subject",
  "message": "Message text"
}

# Get all messages
GET http://localhost:5000/api/contact

# Mark as read
PUT http://localhost:5000/api/contact/{id}
Body: {"read": true}

# Delete message
DELETE http://localhost:5000/api/contact/{id}
```

---

## 🔑 Gmail App Password Setup

1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" (or your OS)
3. Copy the 16-character password
4. Paste into `server/.env` as `EMAIL_PASSWORD`

**Don't use regular Gmail password!**

---

## 🗄️ MongoDB Setup

### Option A: Local
```bash
# Windows: Download & install from mongodb.com
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB
mongod
```

### Option B: Cloud (Recommended)
1. https://www.mongodb.com/cloud/atlas
2. Create account → Create cluster
3. Copy connection string
4. Add to `server/.env`:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
```

---

## 📦 Project Structure Essentials

```
client/src/components/
├── Navbar.tsx      ← Navigation
├── Hero.tsx        ← Hero section
├── About.tsx       ← About section
├── Skills.tsx      ← Skills list
├── Projects.tsx    ← Projects gallery
├── Experience.tsx  ← Timeline
├── Contact.tsx     ← Contact form
└── Footer.tsx      ← Footer

server/src/
├── models/         ← MongoDB schemas
├── routes/         ← API endpoints
├── middleware/     ← Error handling
├── config/         ← DB connection
└── utils/          ← Email service
```

---

## 🚨 Error Fixes

### "Port 5000 already in use"
**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID 1234 /F
```

**Mac/Linux:**
```bash
lsof -ti:5000 | xargs kill -9
```

### "MongoDB connection failed"
- Start MongoDB: `mongod`
- Check URI in `.env`
- For Atlas: whitelist your IP

### "CORS error"
- Backend running? ✓
- `CLIENT_URL` correct? ✓
- `VITE_API_URL` correct? ✓
- Restart both servers

### "Email not sending"
- Using app password? (not regular password)
- Gmail 2FA enabled?
- Credentials correct in `.env`?

### "Module not found"
```bash
rm -rf node_modules
npm install
```

---

## 🌐 Deployment Commands

### Build for Production
```bash
npm run client:build
npm run server:build
```

### Deploy Frontend (Vercel)
```bash
npm i -g vercel
vercel
```

### Deploy Backend (Render)
1. Push to GitHub
2. Create Web Service on render.com
3. Add environment variables
4. Deploy!

---

## 📊 Technology Versions

**Frontend:**
- React 18.2.0
- TypeScript 5.2.2
- Vite 5.0.2
- Tailwind 3.3.0

**Backend:**
- Node.js 16+
- Express 4.18.2
- MongoDB 6+
- Mongoose 7.5.0

---

## 🎨 Customization Checklist

- [ ] Update name/email in Contact
- [ ] Update hero headline
- [ ] Update social links
- [ ] Update about section
- [ ] Update skills
- [ ] Add your projects
- [ ] Update experience
- [ ] Update education
- [ ] Change colors if needed
- [ ] Replace placeholder images

---

## 📚 Key File Locations

| What | Where |
|------|-------|
| React Components | `client/src/components/` |
| API Client | `client/src/services/api.ts` |
| Global CSS | `client/src/styles/globals.css` |
| Tailwind Config | `client/tailwind.config.js` |
| Express Server | `server/src/index.js` |
| MongoDB Models | `server/src/models/` |
| API Routes | `server/src/routes/` |
| Email Setup | `server/src/utils/emailService.js` |
| Environment | `.env` files in both directories |

---

## 🔐 Environment Variables

### Frontend (VITE_*)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=...
EMAIL_USER=...
EMAIL_PASSWORD=...
CLIENT_URL=http://localhost:5173
```

---

## 🧪 Testing Checklist

- [ ] All pages load
- [ ] Navigation works
- [ ] Contact form submits
- [ ] Email received
- [ ] Projects display
- [ ] Responsive on mobile
- [ ] API endpoints work
- [ ] No console errors
- [ ] Backend logs clean

---

## 📞 Quick Links

**Docs:**
- [QUICKSTART.md](./QUICKSTART.md) - 5 min setup
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Complete guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment
- [README.md](./README.md) - Full docs

**Tools:**
- Postman: https://postman.com
- MongoDB Compass: https://mongodb.com/products/compass
- Vercel: https://vercel.com
- Render: https://render.com

---

## 💡 Pro Tips

1. **VS Code Extensions**: Install "MongoDB for VS Code"
2. **API Testing**: Use Postman instead of curl
3. **Database**: Use MongoDB Atlas (no local setup)
4. **Email**: Save app password, you'll need it later
5. **Deploy**: Commit to GitHub before deploying
6. **Monitor**: Check Render/Vercel dashboard
7. **Updates**: Changes push to GitHub → auto-deploy

---

**Quick Start**: `setup.bat` → Configure `.env` → `npm run dev`

**Deploy**: Build locally → Push GitHub → Deploy

**Questions?** Check README.md or SETUP_GUIDE.md

---

*Last Updated: January 24, 2026*
