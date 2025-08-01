import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { API_ENDPOINTS } from '../config/api'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')
        
        if (storedToken && storedUser) {
            setToken(storedToken)
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        try {
            const response = await axios.post(API_ENDPOINTS.LOGIN, { email, password })
            const { token, user } = response.data
            
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            
            setToken(token)
            setUser(user)
            
            return { success: true }
        } catch (error) {
            console.error('Login error:', error)
            return { 
                success: false, 
                error: error.response?.data?.error || 'Login failed' 
            }
        }
    }

    const signup = async (email, password, name) => {
        try {
            const response = await axios.post(API_ENDPOINTS.SIGNUP, { email, password, name })
            const { token, user } = response.data
            
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            
            setToken(token)
            setUser(user)
            
            return { success: true }
        } catch (error) {
            console.error('Signup error:', error)
            return { 
                success: false, 
                error: error.response?.data?.error || 'Signup failed' 
            }
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
    }

    const isAuthenticated = !!token

    const value = {
        user,
        token,
        loading,
        isAuthenticated,
        login,
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 