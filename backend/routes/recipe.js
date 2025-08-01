const express = require("express")
const { getRecipes, searchRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload } = require("../controller/recipe")
const auth = require("../middleware/auth")
const router = express.Router()

router.get("/", getRecipes) // Get all recipes
router.get("/search", searchRecipes) // Search recipes
router.get("/:id", getRecipe) // Get recipe by id
router.post("/", auth, upload.single('file'), addRecipe) // Add recipe (protected)
router.put("/:id", auth, upload.single('file'), editRecipe) // Edit recipe (protected)
router.delete("/:id", auth, deleteRecipe) // Delete recipe (protected)

module.exports = router