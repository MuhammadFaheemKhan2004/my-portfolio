# 🚀 Backend Server Setup & Configuration Guide

## ✅ Server Changes Made

### Root Route Added
I added a helpful root route (`GET /`) that displays:
- Server status
- All available endpoints
- API documentation

**Now when you visit `http://localhost:5000/`, you'll see:**
```json
{
  "success": true,
  "message": "Muhammad Faheem Khan - Portfolio API",
  "version": "1.0.0",
  "status": "Server is running",
  "endpoints": {
    "health": "/api/health",
    "projects": {
      "getAll": "GET /api/projects",
      "getOne": "GET /api/projects/:id",
      "create": "POST /api/projects",
      "update": "PUT /api/projects/:id",
      "delete": "DELETE /api/projects/:id"
    },
    "contact": {
      "send": "POST /api/contact",
      "getAll": "GET /api/contact",
      "markAsRead": "PUT /api/contact/:id",
      "delete": "DELETE /api/contact/:id"
    }
  }
}
```

---

## 📋 Current Server Configuration

### .env File Setup
Your `.env` is configured with:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CLIENT_URL=http://localhost:5173
JWT_SECRET=your-super-secret-key
```

**Status**: ⚠️ **Needs Configuration**
- MongoDB URI: OK (local)
- Email: Needs Gmail app password
- JWT: Can be any random string

---

## 🗄️ MongoDB Setup Required

### Option 1: Local MongoDB (Recommended for Development)

**Installation:**
```bash
# Windows: Download from mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb
```

**Start MongoDB:**
```bash
# Windows (if installed)
mongod

# Or run as service
net start MongoDB
```

**Verify it's running:**
```bash
mongosh
```

If you see `mongosh>` prompt, it's running! Then exit with `exit`

---

### Option 2: MongoDB Atlas (Cloud - Easiest)

**Free tier with 512MB storage:**

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority`
5. Update `.env` with this URI

**Update `.env`:**
```env
MONGODB_URI=mongodb+srv://youruser:yourpass@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## 📧 Email Setup (Optional for Contact Form)

If you want contact form emails to work:

**Using Gmail:**

1. Enable 2-Factor Authentication on Gmail
2. Create App Password:
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password
3. Update `.env`:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxxxxxxxxxxxxxx
```

**Or use another email service:**
- SendGrid, Mailgun, AWS SES, etc.
- Update `server/src/utils/emailService.js` accordingly

---

## 🚀 How to Run Server

### Step 1: Install Dependencies
```bash
cd server
npm install
```

### Step 2: Configure Database
- Start MongoDB (see above)
- OR use MongoDB Atlas connection string

### Step 3: Start Server
```bash
npm run dev
```

**Expected Output:**
```
MongoDB Connected: localhost:27017
Server running on http://localhost:5000
```

### Step 4: Test Endpoints

**Test root route:**
```bash
curl http://localhost:5000/
```

**Test health check:**
```bash
curl http://localhost:5000/api/health
```

**Test projects (empty if no data):**
```bash
curl http://localhost:5000/api/projects
```

---

## 📊 Current API Status

| Endpoint | Method | Status | Purpose |
|----------|--------|--------|---------|
| `/` | GET | ✅ NEW | API docs & status |
| `/api/health` | GET | ✅ Ready | Health check |
| `/api/projects` | GET | ✅ Ready | Get all projects |
| `/api/projects/:id` | GET | ✅ Ready | Get one project |
| `/api/projects` | POST | ✅ Ready | Create project |
| `/api/projects/:id` | PUT | ✅ Ready | Update project |
| `/api/projects/:id` | DELETE | ✅ Ready | Delete project |
| `/api/contact` | GET | ✅ Ready | Get all messages |
| `/api/contact` | POST | ✅ Ready | Send message |
| `/api/contact/:id` | PUT | ✅ Ready | Mark as read |
| `/api/contact/:id` | DELETE | ✅ Ready | Delete message |

---

## 🔗 Frontend ↔ Backend Connection

**Frontend** (running on `http://localhost:5173`)
- Calls API at `http://localhost:5000/api/...`
- Configured in `client/src/services/api.js`:
```javascript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

**Backend** (running on `http://localhost:5000`)
- Accepts requests from frontend
- CORS enabled for `http://localhost:5173`
- Returns JSON responses

---

## 📝 Complete Setup Checklist

### Database Setup
- [ ] Install MongoDB locally OR
- [ ] Create MongoDB Atlas account
- [ ] Get connection string
- [ ] Update `.env` MONGODB_URI
- [ ] Verify connection works

### Email Setup (Optional)
- [ ] Set up Gmail app password OR
- [ ] Configure alternative email service
- [ ] Update `.env` EMAIL_USER and EMAIL_PASSWORD

### Server Start
- [ ] `cd server` directory
- [ ] Run `npm install` (if not done)
- [ ] Run `npm run dev`
- [ ] See "Server running on http://localhost:5000"

### Test Server
- [ ] Visit `http://localhost:5000/` → See API docs
- [ ] Visit `http://localhost:5000/api/health` → See OK status
- [ ] Try `http://localhost:5000/api/projects` → Empty array (no data yet)

### Add Sample Data
- [ ] Start MongoDB
- [ ] Run seed script OR
- [ ] Use sample-projects.js file to populate data

### Frontend Connection
- [ ] Frontend running on `http://localhost:5173`
- [ ] Click "View Projects" → Should fetch from API
- [ ] Test contact form → Should save to MongoDB

---

## 🐛 Troubleshooting

### MongoDB Connection Error
**Error:** `MongooseError: Cannot connect to MongoDB`

**Solution:**
1. Check MongoDB is running: `mongosh`
2. Verify MONGODB_URI in `.env`
3. Check firewall settings
4. Use MongoDB Atlas if local fails

### Port 5000 Already in Use
**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Change in .env:
PORT=5001
```

### CORS Errors
**Error:** `Access to XMLHttpRequest blocked by CORS`

**Solution:**
- Check `CLIENT_URL` in `.env` matches frontend URL
- Currently set to `http://localhost:5173` ✅

### Email Not Sending
**Error:** `Email not received`

**Solution:**
- Verify Gmail app password is 16 characters
- Check EMAIL_USER matches your email
- Check spam/promotions folder
- Or skip email setup for now

---

## 🎯 Next Steps

### Option 1: Quick Start (No Database)
- Frontend already works with sample data
- Backend can be skipped for now
- Contact form won't save (uses fallback)

### Option 2: Full Stack Setup (Recommended)
1. **Install MongoDB locally** (easiest)
   ```bash
   # Download from mongodb.com and install
   # Run: mongod
   ```

2. **Start backend**
   ```bash
   cd server
   npm run dev
   ```

3. **Start frontend** (already running on 5173/5174)
   - Projects will fetch from API
   - Contact form will save to MongoDB

4. **Add sample data**
   - Use MongoDB Compass to import sample-projects.js
   - Or POST to `/api/projects` manually

---

## 📚 Useful Resources

- **MongoDB Docs:** [docs.mongodb.com](https://docs.mongodb.com)
- **Express.js Guide:** [expressjs.com](https://expressjs.com)
- **Mongoose ORM:** [mongoosejs.com](https://mongoosejs.com)
- **Nodemailer:** [nodemailer.com](https://nodemailer.com)

---

## ✨ What's Ready

✅ Server code written and configured
✅ All endpoints defined
✅ Models created
✅ Error handling implemented
✅ CORS configured
✅ Environment variables ready
✅ Root route added with API docs
✅ Health check endpoint ready

## ⏳ What Needs Your Action

⏳ Install/start MongoDB
⏳ Start server with `npm run dev`
⏳ Configure email (optional)
⏳ Add sample data to database
⏳ Test API endpoints

---

**Your backend is ready to run! Just need to set up MongoDB.** 🚀
