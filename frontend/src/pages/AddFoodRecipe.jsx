import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddRecipe.css'

export default function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        time: '',
        ingredients: '',
        instructions: ''
    })
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const onHandleChange = (e) => {
        const { name, value } = e.target
        setRecipeData(prev => ({ ...prev, [name]: value }))
        setError('') // Clear error when user types
    }

    const onFileChange = (e) => {
        setFile(e.target.files[0])
        setError('')
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // Validation
        if (!recipeData.title.trim()) {
            setError('Title is required')
            setLoading(false)
            return
        }
        if (!recipeData.ingredients.trim()) {
            setError('Ingredients are required')
            setLoading(false)
            return
        }
        if (!recipeData.instructions.trim()) {
            setError('Instructions are required')
            setLoading(false)
            return
        }
        if (!file) {
            setError('Recipe image is required')
            setLoading(false)
            return
        }

        try {
            const formData = new FormData()
            formData.append('title', recipeData.title.trim())
            formData.append('time', recipeData.time.trim() || '30 min')
            formData.append('ingredients', recipeData.ingredients.trim())
            formData.append('instructions', recipeData.instructions.trim())
            formData.append('file', file)

            const token = localStorage.getItem('token')
            if (!token) {
                setError('Please login to add a recipe')
                setLoading(false)
                return
            }

            await axios.post("http://localhost:5000/recipe", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                }
            })

            // Success - navigate to home
            navigate("/")
        } catch (error) {
            console.error('Add recipe error:', error)
            setError(error.response?.data?.error || 'Failed to add recipe. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <div className='form-control'>
                        <label>Title *</label>
                        <input 
                            type="text" 
                            className='input' 
                            name="title" 
                            value={recipeData.title}
                            onChange={onHandleChange}
                            placeholder="Enter recipe title"
                            required
                        />
                    </div>
                    <div className='form-control'>
                        <label>Time</label>
                        <input 
                            type="text" 
                            className='input' 
                            name="time" 
                            value={recipeData.time}
                            onChange={onHandleChange}
                            placeholder="e.g., 30 min"
                        />
                    </div>
                    <div className='form-control'>
                        <label>Ingredients *</label>
                        <textarea 
                            className='input-textarea' 
                            name="ingredients" 
                            rows="5" 
                            value={recipeData.ingredients}
                            onChange={onHandleChange}
                            placeholder="Enter ingredients (separate with commas)"
                            required
                        />
                    </div>
                    <div className='form-control'>
                        <label>Instructions *</label>
                        <textarea 
                            className='input-textarea' 
                            name="instructions" 
                            rows="5" 
                            value={recipeData.instructions}
                            onChange={onHandleChange}
                            placeholder="Enter cooking instructions"
                            required
                        />
                    </div>
                    <div className='form-control'>
                        <label>Recipe Image *</label>
                        <input 
                            type="file" 
                            className='input' 
                            name="file" 
                            onChange={onFileChange}
                            accept="image/*"
                            required
                        />
                    </div>
                    
                    {error && (
                        <div className='error-message'>
                            <span>{error}</span>
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={loading ? 'loading' : ''}
                    >
                        {loading ? 'Adding Recipe...' : 'Add Recipe'}
                    </button>
                </form>
            </div>
        </>
    )
}
