import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/recipes');
        const mine = res.data.data.filter(r => r.author?._id === user._id || r.author === user._id);
        setMyRecipes(mine);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchMyRecipes();
  }, [user]);

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    try {
      const newRecipe = {
        title,
        description,
        ingredients: ingredients.split(',').map(i => i.trim()),
        steps: steps.split('\n').filter(s => s.trim() !== '')
      };
      await axios.post('http://localhost:5000/api/recipes', newRecipe);
      setShowForm(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container animate-fade-in">
      <div className="flex justify-between items-center mt-4 mb-4" style={{ padding: '2rem 0' }}>
        <div>
          <h1>Welcome, {user?.name}</h1>
          <p>Manage your culinary creations</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create Recipe'}
        </button>
      </div>

      {showForm && (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h2>Create New Recipe</h2>
          <form onSubmit={handleCreateRecipe}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} required />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Ingredients (comma separated)</label>
              <input type="text" value={ingredients} onChange={e => setIngredients(e.target.value)} required />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Steps (one per line)</label>
              <textarea rows={5} value={steps} onChange={e => setSteps(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Save Recipe</button>
          </form>
        </div>
      )}

      <div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>My Recipes</h2>
        {loading ? <p>Loading...</p> : myRecipes.length > 0 ? (
          <div className="grid md:grid-cols-3">
            {myRecipes.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>You haven't created any recipes yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
