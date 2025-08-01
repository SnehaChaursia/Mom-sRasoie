# Mom's Rasoie - Recipe Sharing Platform

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for sharing and discovering delicious recipes.

## 🌟 Features

- **User Authentication**: Secure signup and login with JWT
- **Recipe Management**: Add, edit, delete, and view recipes
- **Search Functionality**: Search recipes by name with real-time suggestions
- **Favorites System**: Save and manage favorite recipes
- **Image Upload**: Upload recipe images with validation
- **Responsive Design**: Works perfectly on desktop and mobile
- **Modern UI**: Beautiful, intuitive interface

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Mom-sRasoie
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**

   **Backend** (create `backend/.env`):
   ```env
   PORT=5000
   CONNECTION_STRING=mongodb://localhost:27017/rasoie
   JWT_SECRET=your_jwt_secret_here
   FRONTEND_URL=http://localhost:5174
   ```

   **Frontend** (create `frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the development servers**
   ```bash
   # Start backend (from backend directory)
   npm run dev
   
   # Start frontend (from frontend directory, in new terminal)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5174
   - Backend API: http://localhost:5000

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **CSS3** - Styling

## 📁 Project Structure

```
Mom-sRasoie/
├── backend/
│   ├── config/
│   │   └── connectionDb.js
│   ├── controller/
│   │   ├── user.js
│   │   └── recipe.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── user.js
│   │   └── recipe.js
│   ├── routes/
│   │   ├── user.js
│   │   └── recipe.js
│   ├── public/
│   │   └── images/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── config/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /signUp` - User registration
- `POST /login` - User login

### Recipes
- `GET /recipe` - Get all recipes
- `GET /recipe/search` - Search recipes
- `GET /recipe/:id` - Get recipe by ID
- `POST /recipe` - Add new recipe (protected)
- `PUT /recipe/:id` - Update recipe (protected)
- `DELETE /recipe/:id` - Delete recipe (protected)

## 🚀 Deployment

### Quick Deployment

1. **Run the deployment script**
   ```bash
   ./deploy.sh
   ```

2. **Follow the deployment guide**
   - See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions

### Deployment Options

#### Backend Hosting
- **Render** (Recommended) - Free tier available
- **Railway** - Good free tier
- **Heroku** - Reliable but paid

#### Frontend Hosting
- **Vercel** (Recommended) - Excellent for React apps
- **Netlify** - Great static site hosting
- **Render** - Can host both frontend and backend

#### Database
- **MongoDB Atlas** - Free tier with 512MB storage

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- File upload restrictions
- Environment variable protection

## 🎨 UI Features

- Responsive design
- Modern gradient backgrounds
- Smooth animations
- Intuitive navigation
- Search with suggestions
- Image upload with preview
- Loading states
- Error handling

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill processes on port 5000
   lsof -ti:5000 | xargs kill -9
   ```

2. **MongoDB connection issues**
   - Ensure MongoDB is running
   - Check connection string
   - Verify network access

3. **CORS errors**
   - Check frontend URL in backend CORS configuration
   - Verify environment variables

4. **Build errors**
   - Clear node_modules and reinstall
   - Check for missing dependencies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React.js community
- MongoDB Atlas for free database hosting
- Render for free hosting
- All contributors and users

---

**Happy Cooking! 🍳**
