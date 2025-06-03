
import { Recipe } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star, Heart, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onLike: (recipeId: string) => void;
}

const RecipeDetail = ({ recipe, onBack, onLike }: RecipeDetailProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(recipe.id);
    toast({
      title: isLiked ? "Like removido" : "Gostei! ❤️",
      description: isLiked ? "Obrigado pelo feedback!" : "Que bom que você gostou!",
    });
  };

  const handleRating = () => {
    toast({
      title: "Avaliação",
      description: "Recurso de avaliação em desenvolvimento!",
    });
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-100 text-green-800';
      case 'Médio': return 'bg-yellow-100 text-yellow-800';
      case 'Difícil': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Button
        onClick={onBack}
        variant="ghost"
        className="flex items-center space-x-2 text-recipe-primary hover:text-recipe-primary/80"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Voltar</span>
      </Button>

      <div className="recipe-card p-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-recipe-text mb-4">{recipe.title}</h1>
            {recipe.description && (
              <p className="text-lg text-recipe-text/70">{recipe.description}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-recipe-text/60">
            {recipe.prepTime && (
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>{recipe.prepTime} minutos</span>
              </div>
            )}
            {recipe.servings && (
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>{recipe.servings} porções</span>
              </div>
            )}
            {recipe.difficulty && (
              <Badge className={getDifficultyColor(recipe.difficulty)}>
                {recipe.difficulty}
              </Badge>
            )}
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <span>{recipe.likes + (isLiked ? 1 : 0)} curtidas</span>
            </div>
            {recipe.averageRating > 0 && (
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 fill-recipe-secondary text-recipe-secondary" />
                <span>{recipe.averageRating.toFixed(1)}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleLike}
              variant={isLiked ? "default" : "outline"}
              className={`flex items-center space-x-2 ${
                isLiked 
                  ? 'bg-recipe-accent text-white hover:bg-recipe-accent/90' 
                  : 'border-recipe-secondary text-recipe-accent hover:bg-recipe-accent/10'
              }`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>Gostei!</span>
            </Button>
            
            <Button
              onClick={handleRating}
              variant="outline"
              className="flex items-center space-x-2 border-recipe-secondary text-recipe-secondary hover:bg-recipe-secondary/10"
            >
              <Star className="h-5 w-5" />
              <span>Avaliar Receita</span>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-recipe-text mb-4">Você vai precisar de:</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      className="mt-1 accent-recipe-primary"
                    />
                    <span className="text-recipe-text/80">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-recipe-text mb-4">Mãos na Massa:</h3>
              <ol className="space-y-4">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex space-x-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-recipe-primary text-white rounded-full flex items-center justify-center font-medium">
                      {index + 1}
                    </span>
                    <span className="text-recipe-text/80 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {recipe.ratings.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-recipe-text mb-4">O que dizem sobre esta receita:</h3>
              <div className="space-y-4">
                {recipe.ratings.map((rating) => (
                  <div key={rating.id} className="bg-recipe-background/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-recipe-text">{rating.userName}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < rating.rating
                                ? 'fill-recipe-secondary text-recipe-secondary'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {rating.comment && (
                      <p className="text-recipe-text/70">{rating.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
