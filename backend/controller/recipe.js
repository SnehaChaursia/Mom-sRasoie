const Recipes = require("../models/recipe")
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('Only image files are allowed!'), false)
    }
}

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
})

const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipes.find().populate('createdBy', 'name email')
        return res.json(recipes)
    } catch (error) {
        console.error('Get recipes error:', error)
        return res.status(500).json({ error: "Failed to fetch recipes" })
    }
}

const searchRecipes = async (req, res) => {
    try {
        const { q } = req.query
        
        if (!q || q.trim().length === 0) {
            return res.json([])
        }

        const searchQuery = {
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { ingredients: { $regex: q, $options: 'i' } },
                { instructions: { $regex: q, $options: 'i' } }
            ]
        }

        const recipes = await Recipes.find(searchQuery)
            .populate('createdBy', 'name email')
            .limit(10)

        return res.json(recipes)
    } catch (error) {
        console.error('Search recipes error:', error)
        return res.status(500).json({ error: "Failed to search recipes" })
    }
}

const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipes.findById(req.params.id).populate('createdBy', 'name email')
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" })
        }
        res.json(recipe)
    } catch (error) {
        console.error('Get recipe error:', error)
        return res.status(500).json({ error: "Failed to fetch recipe" })
    }
}

const addRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, time, difficulty, servings, category } = req.body

        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ error: "Title, ingredients, and instructions are required" })
        }

        if (!req.file) {
            return res.status(400).json({ error: "Recipe image is required" })
        }

        const newRecipe = await Recipes.create({
            title: title.trim(),
            ingredients: ingredients.trim(),
            instructions: instructions.trim(),
            time: time || "30 min",
            difficulty: difficulty || "Medium",
            servings: servings || 4,
            category: category || "Main Course",
            coverImage: req.file.filename,
            createdBy: req.user._id
        })

        const populatedRecipe = await Recipes.findById(newRecipe._id).populate('createdBy', 'name email')
        return res.status(201).json({
            recipe: populatedRecipe,
            message: "Recipe added successfully!"
        })

    } catch (error) {
        console.error('Add recipe error:', error)
        return res.status(500).json({ error: "Failed to add recipe" })
    }
}

const editRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, time, difficulty, servings, category } = req.body
        let recipe = await Recipes.findById(req.params.id)

        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" })
        }

        // Check if user owns the recipe
        if (recipe.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "You can only edit your own recipes" })
        }

        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ error: "Title, ingredients, and instructions are required" })
        }

        let coverImage = req.file?.filename ? req.file.filename : recipe.coverImage

        const updatedRecipe = await Recipes.findByIdAndUpdate(
            req.params.id,
            {
                title: title.trim(),
                ingredients: ingredients.trim(),
                instructions: instructions.trim(),
                time: time || recipe.time,
                difficulty: difficulty || recipe.difficulty,
                servings: servings || recipe.servings,
                category: category || recipe.category,
                coverImage
            },
            { new: true }
        ).populate('createdBy', 'name email')

        return res.json({
            recipe: updatedRecipe,
            message: "Recipe updated successfully!"
        })

    } catch (error) {
        console.error('Edit recipe error:', error)
        return res.status(500).json({ error: "Failed to update recipe" })
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipes.findById(req.params.id)
        
        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" })
        }

        // Check if user owns the recipe
        if (recipe.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "You can only delete your own recipes" })
        }

        await Recipes.findByIdAndDelete(req.params.id)
        res.json({ message: "Recipe deleted successfully!" })

    } catch (error) {
        console.error('Delete recipe error:', error)
        return res.status(500).json({ error: "Failed to delete recipe" })
    }
}

module.exports = { getRecipes, searchRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload }