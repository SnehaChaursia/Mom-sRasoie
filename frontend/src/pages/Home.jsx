import React, { useState, useEffect } from 'react'
import { useNavigate, useLoaderData } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import RecipeItems from '../components/RecipeItems'
import SearchBar from '../components/SearchBar'
import AuthForm from '../components/AuthForm'
import { FaPlus } from 'react-icons/fa'
import axios from 'axios'
import './Home.css'

export default function Home() {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [recipes, setRecipes] = useState([])
    const [filteredRecipes, setFilteredRecipes] = useState([])
    const [loading, setLoading] = useState(false)
    const initialRecipes = useLoaderData()

    useEffect(() => {
        if (initialRecipes) {
            setRecipes(Array.isArray(initialRecipes) ? initialRecipes : [])
            setFilteredRecipes(Array.isArray(initialRecipes) ? initialRecipes : [])
        }
    }, [initialRecipes])

    const handleAddRecipe = () => {
        if (isAuthenticated) {
            navigate('/addRecipe')
        } else {
            setShowAuthModal(true)
        }
    }

    const handleSearch = async (searchTerm) => {
        if (!searchTerm.trim()) {
            setFilteredRecipes(recipes)
            return
        }

        setLoading(true)
        try {
            const response = await axios.get(`http://localhost:5000/recipe/search?q=${encodeURIComponent(searchTerm)}`)
            setFilteredRecipes(response.data)
        } catch (error) {
            console.error('Search error:', error)
            // Fallback to client-side search
            const filtered = recipes.filter(recipe =>
                recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredRecipes(filtered)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <section className='home'>
                <div className='left'>
                    <h1>Discover Amazing Recipes</h1>
                    <h5>
                        Welcome to Mom's Rasoie - your culinary journey starts here! 
                        Explore traditional family recipes, share your own creations, 
                        and discover the joy of cooking with our community of food lovers. 
                        From quick weeknight dinners to special occasion feasts, 
                        find inspiration for every meal.
                    </h5>
                    <button onClick={handleAddRecipe}>
                        <FaPlus />
                        Share Your Recipe
                    </button>
                </div>
                <div className='right'>
                    <img 
                        src="/src/assets/foodRecipe.png" 
                        alt="Delicious Food Recipes"
                        width="400"
                        height="400"
                    />
                </div>
            </section>

            <div className='recipe-section'>
                <div className='recipe-header'>
                    <h2>Featured Recipes</h2>
                    <p>Discover the most loved recipes from our community</p>
                </div>
                
                <SearchBar onSearch={handleSearch} recipes={recipes} />
                
                {loading && (
                    <div className="loading-message">
                        <p>Searching recipes...</p>
                    </div>
                )}
                
                <RecipeItems recipes={filteredRecipes} />
                
                {!loading && filteredRecipes.length === 0 && recipes.length > 0 && (
                    <div className="no-results">
                        <p>No recipes found matching your search.</p>
                        <p>Try a different search term or browse all recipes.</p>
                    </div>
                )}
            </div>

            {showAuthModal && (
                <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="modal-close"
                            onClick={() => setShowAuthModal(false)}
                        >
                            ×
                        </button>
                        <AuthForm onClose={() => setShowAuthModal(false)} />
                    </div>
                </div>
            )}
        </>
    )
}
