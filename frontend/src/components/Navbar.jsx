import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthForm from './AuthForm'
import { FaUser, FaSignOutAlt, FaPlus } from 'react-icons/fa'
import './Navbar.css'

export default function Navbar() {
    const [showAuthModal, setShowAuthModal] = useState(false)
    const { user, isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()

    const handleAuthClick = () => {
        if (isAuthenticated) {
            logout()
            navigate('/')
        } else {
            setShowAuthModal(true)
        }
    }

    const handleAddRecipe = () => {
        if (isAuthenticated) {
            navigate('/addRecipe')
        } else {
            setShowAuthModal(true)
        }
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-brand">
                        <NavLink to="/" className="brand-link">
                            <span className="brand-icon">🍳</span>
                            <span className="brand-text">Mom's Rasoie</span>
                        </NavLink>
                    </div>

                    <div className="navbar-menu">
                        <NavLink to="/" className="nav-link" end>
                            Home
                        </NavLink>
                        
                        {isAuthenticated && (
                            <>
                                <NavLink to="/myRecipe" className="nav-link">
                                    My Recipes
                                </NavLink>
                                <NavLink to="/favRecipe" className="nav-link">
                                    Favorites
                                </NavLink>
                            </>
                        )}
                    </div>

                    <div className="navbar-actions">
                        {isAuthenticated && (
                            <button
                                onClick={handleAddRecipe}
                                className="add-recipe-btn"
                                title="Add New Recipe"
                            >
                                <FaPlus />
                                <span>Add Recipe</span>
                            </button>
                        )}

                        <div className="user-section">
                            {isAuthenticated ? (
                                <div className="user-info">
                                    <div className="user-avatar">
                                        <FaUser />
                                    </div>
                                    <div className="user-details">
                                        <span className="user-name">{user?.name || 'User'}</span>
                                        <span className="user-email">{user?.email}</span>
                                    </div>
                                    <button
                                        onClick={handleAuthClick}
                                        className="logout-btn"
                                        title="Logout"
                                    >
                                        <FaSignOutAlt />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleAuthClick}
                                    className="login-btn"
                                >
                                    <FaUser />
                                    <span>Sign In</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

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
