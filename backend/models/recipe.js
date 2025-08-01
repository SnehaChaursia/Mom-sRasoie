const mongoose = require("mongoose")

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    ingredients: {
        type: String,
        required: true,
        trim: true
    },
    instructions: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        default: "30 min"
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Medium"
    },
    servings: {
        type: Number,
        default: 4,
        min: 1
    },
    category: {
        type: String,
        enum: ["Appetizer", "Main Course", "Dessert", "Beverage", "Snack", "Breakfast", "Lunch", "Dinner"],
        default: "Main Course"
    },
    coverImage: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    isPublic: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

// Add text index for search functionality
recipeSchema.index({ title: 'text', ingredients: 'text', instructions: 'text' })

module.exports = mongoose.model("Recipes", recipeSchema)