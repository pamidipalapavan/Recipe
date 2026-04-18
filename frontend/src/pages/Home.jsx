import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/recipes');
        setRecipes(res.data.data);
      } catch (err) {
        console.error('Failed to fetch recipes', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="container animate-fade-in">
      <div className="text-center mt-4 mb-4" style={{ padding: '4rem 0' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Discover Culinary Magic</h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Explore thousands of recipes shared by our community of passionate chefs and home cooks.
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Featured Recipes</h2>
        {loading ? (
          <p className="text-center" style={{ padding: '3rem' }}>Loading recipes...</p>
        ) : recipes.length > 0 ? (
          <div className="grid md:grid-cols-3">
            {recipes.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="text-center" style={{ padding: '3rem', color: 'var(--text-muted)' }}>No recipes found. Be the first to add one!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
