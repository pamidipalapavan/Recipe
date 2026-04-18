const express = require('express');
const router = express.Router();
const { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
const { verifyToken } = require('../middleware/auth');

router.route('/')
  .get(getRecipes)
  .post(verifyToken, createRecipe);

router.route('/:id')
  .get(getRecipeById)
  .put(verifyToken, updateRecipe)
  .delete(verifyToken, deleteRecipe);

module.exports = router;
