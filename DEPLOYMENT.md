# Deployment Guide for Mom's Rasoie

This guide will help you deploy your MERN stack application to various platforms.

## Prerequisites

1. **MongoDB Atlas Account** (for cloud database)
2. **GitHub Account** (for code repository)
3. **Render/Railway/Vercel Account** (for hosting)

## Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user with read/write permissions
5. Get your connection string
6. Add your IP address to the whitelist (or use 0.0.0.0/0 for all IPs)

## Step 2: Prepare Your Code

### Backend Preparation

1. Update your `.env` file with production values:
```env
PORT=5000
CONNECTION_STRING=mongodb+srv://username:password@cluster.mongodb.net/rasoie?retryWrites=true&w=majority
JWT_SECRET=your_very_secure_jwt_secret_here
FRONTEND_URL=https://your-frontend-url.com
```

2. Make sure your `package.json` has the correct scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Frontend Preparation

1. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## Step 3: Deploy Backend

### Option A: Render (Recommended)

1. Go to [Render](https://render.com)
2. Sign up with your GitHub account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: `rasoie-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add environment variables:
   - `CONNECTION_STRING`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your JWT secret
   - `FRONTEND_URL`: Your frontend URL
7. Click "Create Web Service"
8. Wait for deployment and copy the URL

### Option B: Railway

1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set the root directory to `backend`
6. Add environment variables
7. Deploy

## Step 4: Deploy Frontend

### Option A: Vercel (Recommended)

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add environment variable:
   - `VITE_API_URL`: Your backend URL from Step 3
7. Click "Deploy"

### Option B: Netlify

1. Go to [Netlify](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Select your repository
5. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Add environment variable
7. Deploy

### Option C: Render

1. Go to [Render](https://render.com)
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `rasoie-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Add environment variable
6. Deploy

## Step 5: Update Environment Variables

After both deployments are complete:

1. Update your frontend environment variable with the actual backend URL
2. Update your backend environment variable with the actual frontend URL
3. Redeploy both services

## Step 6: Test Your Deployment

1. Visit your frontend URL
2. Test user registration and login
3. Test adding recipes
4. Test search functionality
5. Test all other features

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your backend has the correct frontend URL in CORS configuration
2. **Database Connection**: Verify your MongoDB Atlas connection string and IP whitelist
3. **Environment Variables**: Double-check all environment variables are set correctly
4. **Build Errors**: Check the build logs for any missing dependencies

### Debugging:

1. Check the deployment logs in your hosting platform
2. Use browser developer tools to check for API errors
3. Verify all environment variables are loaded correctly

## Security Considerations

1. **JWT Secret**: Use a strong, random JWT secret
2. **Database**: Use MongoDB Atlas with proper authentication
3. **Environment Variables**: Never commit sensitive data to your repository
4. **CORS**: Configure CORS to only allow your frontend domain

## Cost Optimization

- **Render**: Free tier available for both backend and frontend
- **Railway**: Free tier available
- **Vercel**: Free tier available for frontend
- **MongoDB Atlas**: Free tier available (512MB storage)

## Monitoring

1. Set up logging for your backend
2. Monitor your application performance
3. Set up alerts for errors
4. Monitor database usage

## Updates and Maintenance

1. Keep your dependencies updated
2. Regularly backup your database
3. Monitor for security updates
4. Test your application after updates

---

## Quick Deploy Commands

### For Render:
```bash
# Backend
git push origin main
# Frontend
git push origin main
```

### For Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel

# Deploy backend
cd backend
vercel
```

### For Railway:
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway up
```

---

**Note**: Always test your application thoroughly after deployment and keep your environment variables secure! 