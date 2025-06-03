
import { Recipe } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Heart, Clock, Star, Users } from 'lucide-react';
import { useState } from 'react';

interface RecipeCardProps {
  recipe: Recipe;
  onViewDetails: (recipe: Recipe) => void;
  onLike: (recipeId: string) => void;
  rank?: number;
}

const RecipeCard = ({ recipe, onViewDetails, onLike, rank }: RecipeCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(recipe.id);
  };

  return (
    <div className={`recipe-card p-6 animate-fade-in ${rank === 1 ? 'border-recipe-primary border-4' : ''}`}>
      {rank && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className={`text-2xl font-bold ${rank === 1 ? 'text-recipe-primary' : 'text-recipe-text'}`}>
              #{rank}
            </span>
            {rank === 1 && <span className="text-2xl">👑</span>}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-recipe-text mb-2">{recipe.title}</h3>
          {recipe.description && (
            <p className="text-recipe-text/70 text-sm line-clamp-2">{recipe.description}</p>
          )}
        </div>

        <div className="flex items-center space-x-4 text-sm text-recipe-text/60">
          {recipe.prepTime && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.prepTime} min</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} porções</span>
            </div>
          )}
          {recipe.averageRating > 0 && (
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-recipe-secondary text-recipe-secondary" />
              <span>{recipe.averageRating.toFixed(1)}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-recipe-secondary/20">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                isLiked 
                  ? 'text-recipe-accent hover:text-recipe-accent/80' 
                  : 'text-recipe-text/60 hover:text-recipe-accent'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{recipe.likes + (isLiked ? 1 : 0)}</span>
            </Button>
          </div>

          <Button
            onClick={() => onViewDetails(recipe)}
            className="bg-recipe-primary text-white hover:bg-recipe-primary/90"
          >
            Ver Receita
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
