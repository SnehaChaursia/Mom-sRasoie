import React, { useState, useEffect, useRef } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import './SearchBar.css'

const SearchBar = ({ onSearch, recipes = [] }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const searchRef = useRef(null)

    useEffect(() => {
        if (searchTerm.trim().length > 0) {
            const filtered = recipes.filter(recipe =>
                recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
            ).slice(0, 5)
            setSuggestions(filtered)
            setShowSuggestions(true)
        } else {
            setSuggestions([])
            setShowSuggestions(false)
        }
    }, [searchTerm, recipes])

    const handleSearch = () => {
        onSearch(searchTerm)
        setShowSuggestions(false)
    }

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.title)
        onSearch(suggestion.title)
        setShowSuggestions(false)
    }

    const handleClearSearch = () => {
        setSearchTerm('')
        setSuggestions([])
        setShowSuggestions(false)
        onSearch('')
    }

    return (
        <div className="search-container" ref={searchRef}>
            <div className="search-bar">
                <div className="search-input-wrapper">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search recipes by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="search-input"
                    />
                    {searchTerm && (
                        <button onClick={handleClearSearch} className="clear-button">
                            <FaTimes />
                        </button>
                    )}
                </div>
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div className="suggestions-container">
                    <ul className="suggestions-list">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={suggestion._id || index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="suggestion-item"
                            >
                                <FaSearch className="suggestion-icon" />
                                <span>{suggestion.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SearchBar 