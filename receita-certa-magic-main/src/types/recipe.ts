
export interface Recipe {
  id: string;
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  prepTime?: number;
  difficulty?: 'Fácil' | 'Médio' | 'Difícil';
  servings?: number;
  likes: number;
  category?: string;
  ratings: Rating[];
  averageRating: number;
}

export interface Rating {
  id: string;
  userName: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface RecipeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}
