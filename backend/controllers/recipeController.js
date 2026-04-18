const Recipe = require('../models/Recipe');

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('author', 'name').populate('category', 'name');
    res.json({ success: true, count: recipes.length, data: recipes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'name').populate('category', 'name');
    if (!recipe) {
      return res.status(404).json({ success: false, error: 'Recipe not found' });
    }
    res.json({ success: true, data: recipe });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createRecipe = async (req, res) => {
  try {
    req.body.author = req.user.id;
    const recipe = await Recipe.create(req.body);
    res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, error: 'Recipe not found' });
    }

    if (recipe.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Not authorized to update this recipe' });
    }

    recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: recipe });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, error: 'Recipe not found' });
    }

    if (recipe.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Not authorized to delete this recipe' });
    }

    await recipe.deleteOne();
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe };
