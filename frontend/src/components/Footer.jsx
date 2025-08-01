import React from 'react'
import { FaHeart, FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className='footer'>
        <div className="footer-content">
            <div className="footer-section">
                <h3>Mom's Rasoie</h3>
                <p>Preserving family recipes, one dish at a time</p>
            </div>
            
            <div className="footer-section">
                <h4>Connect With Us</h4>
                <div className="social-links">
                    <a href="https://github.com/SnehaChaursia" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                    </a>
                    <a href="https://linkedin.com/in/sneha-chaursia" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                    </a>
                </div>
            </div>
            
            <div className="footer-section">
                <p className="footer-text">
                    Made with <FaHeart className="heart-icon" /> by 
                    <a href="https://github.com/SnehaChaursia" target="_blank" rel="noopener noreferrer">
                        Sneha Chaursia
                    </a>
                </p>
            </div>
        </div>
        
        <div className="footer-bottom">
            <p>&copy; 2024 Mom's Rasoie. All rights reserved.</p>
        </div>
    </footer>
  )
}
