import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { FaHeart, FaEdit, FaTrash, FaClock, FaUser } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import './RecipeItems.css'

export default function RecipeItems({ recipes: propRecipes }) {
    const loaderRecipes = useLoaderData()
    const [allRecipes, setAllRecipes] = useState([])
    const [loading, setLoading] = useState(false)
    const { user, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    
    const path = window.location.pathname
    const isMyRecipes = path === "/myRecipe"
    const isFavorites = path === "/favRecipe"
    
    const favItems = JSON.parse(localStorage.getItem("fav")) || []

    useEffect(() => {
        // Use prop recipes if provided (for search), otherwise use loader recipes
        const recipesToUse = propRecipes !== undefined ? propRecipes : loaderRecipes
        if (recipesToUse) {
            setAllRecipes(Array.isArray(recipesToUse) ? recipesToUse : [])
        }
    }, [propRecipes, loaderRecipes])

    const onDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this recipe?')) {
            return
        }

        setLoading(true)
        try {
            await axios.delete(`http://localhost:5000/recipe/${id}`)
            setAllRecipes(prev => prev.filter(recipe => recipe._id !== id))
            
            // Remove from favorites if it exists there
            const updatedFavs = favItems.filter(recipe => recipe._id !== id)
            localStorage.setItem("fav", JSON.stringify(updatedFavs))
            
            // Show success message
            alert('Recipe deleted successfully!')
        } catch (error) {
            console.error('Error deleting recipe:', error)
            alert('Failed to delete recipe. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const favRecipe = (item) => {
        const existingFavs = JSON.parse(localStorage.getItem("fav")) || []
        const isAlreadyFav = existingFavs.some(fav => fav._id === item._id)
        
        if (isAlreadyFav) {
            const updatedFavs = existingFavs.filter(fav => fav._id !== item._id)
            localStorage.setItem("fav", JSON.stringify(updatedFavs))
        } else {
            const updatedFavs = [...existingFavs, item]
            localStorage.setItem("fav", JSON.stringify(updatedFavs))
        }
        
        // Force re-render
        setAllRecipes([...allRecipes])
    }

    const handleCardClick = (recipeId) => {
        navigate(`/recipe/${recipeId}`)
    }

    const isFavorited = (recipeId) => {
        return favItems.some(fav => fav._id === recipeId)
    }

    if (allRecipes.length === 0) {
        return (
            <div className="no-recipes">
                <div className="no-recipes-content">
                    <h3>No recipes found</h3>
                    <p>
                        {isMyRecipes 
                            ? "You haven't created any recipes yet. Start sharing your culinary creations!"
                            : isFavorites
                            ? "You haven't added any recipes to your favorites yet. Start exploring!"
                            : "No recipes available at the moment. Be the first to share a recipe!"
                        }
                    </p>
                    {isMyRecipes && (
                        <button 
                            onClick={() => navigate('/addRecipe')}
                            className="add-first-recipe-btn"
                        >
                            Create Your First Recipe
                        </button>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className='card-container'>
            {allRecipes.map((item, index) => (
                <div key={item._id || index} className='recipe-card'>
                    <div className="card-image-container" onClick={() => handleCardClick(item._id)}>
                        <img 
                            src={`http://localhost:5000/images/${item.coverImage}`} 
                            alt={item.title}
                            className="card-image"
                        />
                        <div className="card-overlay">
                            <span>Click to view recipe</span>
                        </div>
                    </div>
                    
                    <div className='card-body'>
                        <div className='card-header'>
                            <h3 className='recipe-title'>{item.title}</h3>
                            {item.createdBy && (
                                <div className="recipe-author">
                                    <FaUser />
                                    <span>{item.createdBy.name || item.createdBy.email}</span>
                                </div>
                            )}
                        </div>
                        
                        <div className='card-meta'>
                            <div className='timer'>
                                <FaClock />
                                <span>{item.time || '30 min'}</span>
                            </div>
                            
                            {item.difficulty && (
                                <div className="difficulty">
                                    <span className={`difficulty-badge ${item.difficulty.toLowerCase()}`}>
                                        {item.difficulty}
                                    </span>
                                </div>
                            )}
                        </div>
                        
                        <div className='card-actions'>
                            <button
                                onClick={() => favRecipe(item)}
                                className={`fav-btn ${isFavorited(item._id) ? 'favorited' : ''}`}
                                title={isFavorited(item._id) ? 'Remove from favorites' : 'Add to favorites'}
                            >
                                <FaHeart />
                            </button>
                            
                            {isAuthenticated && (isMyRecipes || user?._id === item.createdBy?._id) && (
                                <div className="action-buttons">
                                    <Link to={`/editRecipe/${item._id}`} className="edit-btn">
                                        <FaEdit />
                                    </Link>
                                    <button
                                        onClick={() => onDelete(item._id)}
                                        disabled={loading}
                                        className="delete-btn"
                                        title="Delete recipe"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
