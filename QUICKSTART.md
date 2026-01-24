# 🚀 Quick Start Guide

## For Windows/Mac/Linux

### 1. Install Dependencies

```bash
# Install root dependencies (optional, for convenience commands)
npm install

# Install frontend dependencies
cd client
npm install

# Install backend dependencies  
cd ../server
npm install
```

### 2. Setup Environment Variables

**Frontend** (`client/.env` - Already configured):
```
VITE_API_URL=http://localhost:5000/api
```

**Backend** (`server/.env` - Configure these):
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
CLIENT_URL=http://localhost:5173
```

**How to get Gmail App Password:**
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Copy the 16-character password
4. Paste into `EMAIL_PASSWORD` in `.env`

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# Windows
mongod

# Mac/Linux
brew services start mongodb-community
```

**Option B: MongoDB Atlas Cloud**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 4. Run Development Servers

**From Root Directory** (easiest):
```bash
npm run dev
```

**Or Manually in Separate Terminals:**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

---

## 🧪 Testing Features

### Test Contact Form
1. Navigate to Contact section
2. Fill in all fields
3. Submit
4. Check email for confirmation
5. Check backend console for received message

### Test Projects Section
- Projects load from backend API
- If backend is down, fallback to default projects
- Update projects via API (admin only)

### Test Responsive Design
- Desktop: Full sidebar and animations
- Tablet: Responsive grid layout
- Mobile: Full-width stacked layout
- Hamburger menu on mobile

---

## 📝 Customization Guide

### Update Portfolio Data

**In `client/src/components/`:
- `Hero.tsx` - Change headline/subheadline
- `About.tsx` - Update professional summary
- `Skills.tsx` - Add/remove skill categories
- `Projects.tsx` - Update default projects
- `Experience.tsx` - Update work experience
- `Contact.tsx` - Update contact info

**Add Projects via API:**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "Description here",
    "technologies": ["React", "Node.js"],
    "github": "https://github.com/...",
    "demo": "https://...",
    "featured": true
  }'
```

---

## 🐛 Common Issues & Fixes

### Port Already in Use
```bash
# Windows - Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- For Atlas: whitelist your IP

### CORS Error
- Ensure backend is running
- Check `CLIENT_URL` in backend `.env`
- Verify API URL in frontend `.env`

### Email Not Sending
- Use Gmail app password (not regular password)
- Enable 2FA on Gmail first
- Check inbox's spam folder

---

## 📦 Build for Production

### Build Both
```bash
npm run client:build
npm run server:build
```

### Frontend Only
```bash
cd client
npm run build
npm run preview
```

### Backend Only
```bash
cd server
npm run build
npm start
```

---

## 🌐 Deployment

See `DEPLOYMENT.md` for:
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas Setup
- Custom Domain Configuration

---

## 📞 Support

Need help? Check:
1. `README.md` - Full documentation
2. `DEPLOYMENT.md` - Deployment guide
3. Server logs - Backend errors
4. Browser console - Frontend errors
5. MongoDB logs - Database issues

Happy coding! 🎉
