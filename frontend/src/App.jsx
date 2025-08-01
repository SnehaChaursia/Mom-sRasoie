import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import RecipeDetails from './pages/RecipeDetails'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import { API_ENDPOINTS } from './config/api'

const getAllRecipes = async () => {
    try {
        const response = await fetch(API_ENDPOINTS.RECIPES)
        const allRecipes = await response.json()
        return allRecipes
    } catch (error) {
        console.error('Error fetching recipes:', error)
        return []
    }
}

const getMyRecipes = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"))
        if (!user) return []
        
        const allRecipes = await getAllRecipes()
        return allRecipes.filter(item => item.createdBy?._id === user._id)
    } catch (error) {
        console.error('Error fetching my recipes:', error)
        return []
    }
}

const getFavRecipes = () => {
    try {
        return JSON.parse(localStorage.getItem("fav")) || []
    } catch (error) {
        console.error('Error parsing favorites:', error)
        return []
    }
}

const getRecipe = async ({ params }) => {
    try {
        const response = await fetch(API_ENDPOINTS.RECIPE_BY_ID(params.id))
        if (!response.ok) {
            throw new Error('Recipe not found')
        }
        const recipe = await response.json()
        return recipe
    } catch (error) {
        console.error('Error fetching recipe:', error)
        throw error
    }
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainNavigation />,
        children: [
            { path: "/", element: <Home />, loader: getAllRecipes },
            { 
                path: "/myRecipe", 
                element: <ProtectedRoute><Home /></ProtectedRoute>, 
                loader: getMyRecipes 
            },
            { 
                path: "/favRecipe", 
                element: <ProtectedRoute><Home /></ProtectedRoute>, 
                loader: getFavRecipes 
            },
            { 
                path: "/addRecipe", 
                element: <ProtectedRoute><AddFoodRecipe /></ProtectedRoute> 
            },
            { 
                path: "/editRecipe/:id", 
                element: <ProtectedRoute><EditRecipe /></ProtectedRoute> 
            },
            { path: "/recipe/:id", element: <RecipeDetails />, loader: getRecipe }
        ]
    }
])

export default function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    )
}
