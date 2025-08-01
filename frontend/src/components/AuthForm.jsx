import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import './AuthForm.css'

const AuthForm = ({ onClose }) => {
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('')

    const { login, signup } = useAuth()

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError('') // Clear error when user starts typing
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            let result
            if (isSignUp) {
                result = await signup(formData.email, formData.password, formData.name)
            } else {
                result = await login(formData.email, formData.password)
            }

            if (result.success) {
                onClose()
            } else {
                setError(result.message)
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="auth-form-container">
            <div className="auth-form-header">
                <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
                <p>{isSignUp ? 'Join our community of food lovers' : 'Sign in to your account'}</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
                {isSignUp && (
                    <div className="form-group">
                        <div className="input-wrapper">
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required={isSignUp}
                                className="form-input"
                            />
                        </div>
                    </div>
                )}

                <div className="form-group">
                    <div className="input-wrapper">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div className="input-wrapper">
                        <FaLock className="input-icon" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="form-input"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="password-toggle"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="error-message">
                        <span>{error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="auth-submit-btn"
                >
                    {loading ? (
                        <div className="loading-spinner-small"></div>
                    ) : (
                        isSignUp ? 'Create Account' : 'Sign In'
                    )}
                </button>

                <div className="auth-switch">
                    <p>
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                        <button
                            type="button"
                            onClick={() => {
                                setIsSignUp(!isSignUp)
                                setError('')
                                setFormData({ name: '', email: '', password: '' })
                            }}
                            className="switch-btn"
                        >
                            {isSignUp ? 'Sign In' : 'Sign Up'}
                        </button>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default AuthForm 