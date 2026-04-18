import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="glass-card flex-col" style={{ height: '100%', overflow: 'hidden' }}>
      <div style={{ height: '200px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '3rem' }}>🍲</span>
      </div>
      <div className="p-6 flex-col" style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div className="flex justify-between items-center mb-4">
            <span style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {recipe.category?.name || 'Uncategorized'}
            </span>
          </div>
          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{recipe.title}</h3>
          <p style={{ fontSize: '0.875rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', color: 'var(--text-muted)' }}>
            {recipe.description}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', display: 'inline-block' }}></span>
          By {recipe.author?.name || 'Unknown'}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
