# MERN Portfolio - Deployment Guide

## Pre-Deployment Checklist

### Frontend Setup
- [ ] Update portfolio data in components
- [ ] Replace placeholder images
- [ ] Update social media links (GitHub, LinkedIn, etc.)
- [ ] Set correct API URL in `.env`
- [ ] Test all responsive breakpoints
- [ ] Build and test locally: `npm run client:build`

### Backend Setup
- [ ] Configure MongoDB connection
- [ ] Set up email credentials (Gmail app password)
- [ ] Verify all routes work locally
- [ ] Test contact form functionality
- [ ] Test API endpoints with Postman/curl

---

## Deployment to Vercel (Frontend)

### Option 1: GitHub + Vercel Auto-Deploy

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git push -u origin main
```

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Select your GitHub repository
   - Configure project:
     - Framework: Vite
     - Root directory: `client`
   - Add environment variables:
     - `VITE_API_URL`: Your backend API URL
   - Deploy!

3. **Custom Domain:**
   - In Vercel dashboard → Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Option 2: Direct Vercel CLI

```bash
npm i -g vercel
cd client
vercel
```

---

## Deployment to Render (Backend)

### Setup MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`

### Deploy Backend to Render

1. **Create GitHub repository with backend code**

2. **Go to Render:**
   - https://dashboard.render.com/
   - Click "New+" → "Web Service"
   - Connect GitHub repository
   - Configure:
     - Environment: Node
     - Build command: `npm install`
     - Start command: `npm start`
   - Add environment variables:
     - `MONGODB_URI`: MongoDB Atlas connection string
     - `EMAIL_USER`: Gmail address
     - `EMAIL_PASSWORD`: Gmail app password
     - `CLIENT_URL`: Your Vercel frontend URL
     - `NODE_ENV`: `production`
   - Deploy!

3. **Get backend URL:**
   - After deployment, you'll get: `https://your-app-name.onrender.com`
   - Update frontend `VITE_API_URL` to this URL

---

## Alternative: Heroku Deployment

### Frontend to Vercel (recommended above)

### Backend to Heroku

```bash
# Install Heroku CLI
npm i -g heroku

# Login and create app
heroku login
heroku create your-app-name

# Configure environment variables
heroku config:set MONGODB_URI="your-mongodb-uri"
heroku config:set EMAIL_USER="your-email@gmail.com"
heroku config:set EMAIL_PASSWORD="your-app-password"
heroku config:set CLIENT_URL="https://your-frontend-url"

# Deploy
git push heroku main
```

---

## Environment Variables Summary

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Backend (.env)
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
CLIENT_URL=https://your-frontend-url.vercel.app
```

---

## Post-Deployment

1. **Test all features:**
   - [ ] Navigate all pages
   - [ ] Test contact form
   - [ ] Verify email notifications
   - [ ] Check responsive design
   - [ ] Test project links

2. **Monitor:**
   - Check Render/Heroku logs for errors
   - Monitor Vercel performance
   - Set up error tracking (optional)

3. **Updates:**
   - Push changes to GitHub
   - Vercel/Render auto-redeploy
   - Changes live in 1-3 minutes

---

## Troubleshooting

### API 404 Errors
- Verify backend URL in frontend `.env`
- Check CORS settings in backend
- Ensure backend is running

### Email Not Sending
- Verify Gmail app password (not regular password)
- Check SMTP credentials
- Enable "Less secure apps" (alternative to app password)

### MongoDB Connection Error
- Test connection string separately
- Check IP whitelist on MongoDB Atlas
- Ensure database name is correct

### Build Failures
- Check Node version (16+)
- Clear `node_modules` and reinstall
- Check for missing environment variables

---

## Performance Tips

1. **Frontend:**
   - Enable gzip compression
   - Optimize images
   - Use CDN for static files

2. **Backend:**
   - Enable caching headers
   - Use MongoDB indexes
   - Implement rate limiting

3. **General:**
   - Monitor bundle size
   - Use lazy loading for components
   - Cache API responses

---

## Security Checklist

- [ ] No secrets in code (use .env)
- [ ] Enable CORS properly
- [ ] Validate all inputs
- [ ] Use HTTPS everywhere
- [ ] Update dependencies regularly
- [ ] Monitor API logs

---

Need help? Check the README.md or create an issue!
