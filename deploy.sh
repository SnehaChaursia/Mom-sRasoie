#!/bin/bash

# Deployment Script for Mom's Rasoie
# This script helps prepare and deploy your MERN stack application

echo "🚀 Starting deployment process for Mom's Rasoie..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install git first."
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_status "Checking current directory structure..."

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    print_error "Please run this script from the root directory of your project (where backend and frontend folders are located)"
    exit 1
fi

print_success "Directory structure looks good!"

# Check git status
print_status "Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted changes. Please commit them before deploying."
    echo "Current changes:"
    git status --short
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Deployment cancelled."
        exit 1
    fi
fi

# Install backend dependencies
print_status "Installing backend dependencies..."
cd backend
if npm install; then
    print_success "Backend dependencies installed successfully!"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi

# Install frontend dependencies
print_status "Installing frontend dependencies..."
cd ../frontend
if npm install; then
    print_success "Frontend dependencies installed successfully!"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi

# Build frontend
print_status "Building frontend..."
if npm run build; then
    print_success "Frontend built successfully!"
else
    print_error "Failed to build frontend"
    exit 1
fi

cd ..

print_success "Local build completed successfully!"

echo
echo "📋 Next steps for deployment:"
echo
echo "1. Set up MongoDB Atlas:"
echo "   - Go to https://www.mongodb.com/atlas"
echo "   - Create a free cluster"
echo "   - Get your connection string"
echo
echo "2. Deploy Backend (choose one):"
echo "   - Render: https://render.com"
echo "   - Railway: https://railway.app"
echo "   - Heroku: https://heroku.com"
echo
echo "3. Deploy Frontend (choose one):"
echo "   - Vercel: https://vercel.com"
echo "   - Netlify: https://netlify.com"
echo "   - Render: https://render.com"
echo
echo "4. Environment Variables to set:"
echo "   Backend:"
echo "   - CONNECTION_STRING=mongodb+srv://..."
echo "   - JWT_SECRET=your_secret_key"
echo "   - FRONTEND_URL=https://your-frontend-url.com"
echo
echo "   Frontend:"
echo "   - VITE_API_URL=https://your-backend-url.com"
echo
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo
print_success "Deployment preparation completed! 🎉" 