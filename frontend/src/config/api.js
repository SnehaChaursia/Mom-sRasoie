// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/login`,
  SIGNUP: `${API_BASE_URL}/signUp`,
  
  // Recipe endpoints
  RECIPES: `${API_BASE_URL}/recipe`,
  RECIPE_SEARCH: `${API_BASE_URL}/recipe/search`,
  RECIPE_BY_ID: (id) => `${API_BASE_URL}/recipe/${id}`,
  
  // Image endpoint
  IMAGES: `${API_BASE_URL}/images`,
};

export default API_BASE_URL; 