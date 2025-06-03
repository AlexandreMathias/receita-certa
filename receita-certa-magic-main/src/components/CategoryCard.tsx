
import { RecipeCategory } from '@/types/recipe';
import { Clock, Apple, Heart, Star, ChefHat } from 'lucide-react';

interface CategoryCardProps {
  category: RecipeCategory;
  onClick: () => void;
}

const iconMap = {
  clock: Clock,
  apple: Apple,
  heart: Heart,
  star: Star,
  'chef-hat': ChefHat,
};

const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  const Icon = iconMap[category.icon as keyof typeof iconMap];

  return (
    <div
      onClick={onClick}
      className="recipe-card p-6 cursor-pointer hover-scale group"
    >
      <div className="text-center space-y-4">
        <div className={`mx-auto w-16 h-16 rounded-full bg-${category.color}/10 flex items-center justify-center group-hover:bg-${category.color}/20 transition-colors`}>
          <Icon className={`h-8 w-8 text-${category.color}`} />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-recipe-text mb-2">
            {category.name}
          </h3>
          <p className="text-sm text-recipe-text/70">
            {category.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
