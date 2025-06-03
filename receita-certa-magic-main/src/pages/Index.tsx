
import { useState } from 'react';
import Header from '@/components/Header';
import CategoryCard from '@/components/CategoryCard';
import RecipeCard from '@/components/RecipeCard';
import AIRecipeGenerator from '@/components/AIRecipeGenerator';
import RecipeDetail from '@/components/RecipeDetail';
import { categories, mockRecipes } from '@/data/recipes';
import { Recipe } from '@/types/recipe';
import { useToast } from '@/hooks/use-toast';

type PageType = 'home' | 'generator' | 'top10' | 'recipe-detail';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { toast } = useToast();

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
  };

  const handleLike = (recipeId: string) => {
    setRecipes(prev => 
      prev.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, likes: recipe.likes + 1 }
          : recipe
      )
    );
  };

  const handleRecipeGenerated = (recipe: Recipe) => {
    setRecipes(prev => [recipe, ...prev]);
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentPage('recipe-detail');
  };

  const topRecipes = [...recipes].sort((a, b) => b.likes - a.likes).slice(0, 10);

  const renderHomePage = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="recipe-gradient text-white p-12 rounded-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            O que vamos cozinhar hoje? 👨‍🍳
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Descubra receitas incríveis com nossa IA ou explore as favoritas da comunidade!
          </p>
          <button
            onClick={() => setCurrentPage('generator')}
            className="bg-white text-recipe-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all hover-scale"
          >
            Gerar Receita Mágica! ✨
          </button>
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-3xl font-bold text-recipe-text mb-8 text-center">
          Explore Nossas Categorias
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => toast({
                title: `Categoria: ${category.name}`,
                description: "Funcionalidade em desenvolvimento!",
              })}
            />
          ))}
        </div>
      </section>

      {/* Top Recipes Preview */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-recipe-text">
            As Queridinhas da Galera 🏆
          </h2>
          <button
            onClick={() => setCurrentPage('top10')}
            className="text-recipe-primary hover:text-recipe-primary/80 font-medium"
          >
            Ver todas →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRecipes.slice(0, 3).map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onViewDetails={handleViewRecipe}
              onLike={handleLike}
              rank={index + 1}
            />
          ))}
        </div>
      </section>
    </div>
  );

  const renderGeneratorPage = () => (
    <div>
      <button
        onClick={() => setCurrentPage('home')}
        className="mb-6 text-recipe-primary hover:text-recipe-primary/80 font-medium"
      >
        ← Voltar ao início
      </button>
      <AIRecipeGenerator
        onRecipeGenerated={handleRecipeGenerated}
        onViewRecipe={handleViewRecipe}
      />
    </div>
  );

  const renderTop10Page = () => (
    <div>
      <button
        onClick={() => setCurrentPage('home')}
        className="mb-6 text-recipe-primary hover:text-recipe-primary/80 font-medium"
      >
        ← Voltar ao início
      </button>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-recipe-text mb-4">
            As Campeãs de Likes! 🏆
          </h1>
          <p className="text-lg text-recipe-text/70">
            Top 10 Receitas Favoritas da Comunidade
          </p>
          <p className="text-sm text-recipe-text/60 mt-2">
            Este ranking é atualizado em tempo real com base nos 'Gostei' dos nossos cozinheiros!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {topRecipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onViewDetails={handleViewRecipe}
              onLike={handleLike}
              rank={index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderRecipeDetail = () => {
    if (!selectedRecipe) return null;
    
    return (
      <RecipeDetail
        recipe={selectedRecipe}
        onBack={() => setCurrentPage('home')}
        onLike={handleLike}
      />
    );
  };

  return (
    <div className="min-h-screen bg-recipe-background">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && renderHomePage()}
        {currentPage === 'generator' && renderGeneratorPage()}
        {currentPage === 'top10' && renderTop10Page()}
        {currentPage === 'recipe-detail' && renderRecipeDetail()}
      </main>

      <footer className="bg-recipe-card border-t-2 border-recipe-secondary/20 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-recipe-text/60">
              <a href="#" className="hover:text-recipe-primary transition-colors">Sobre Nós</a>
              <a href="#" className="hover:text-recipe-primary transition-colors">Contato</a>
              <a href="#" className="hover:text-recipe-primary transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-recipe-primary transition-colors">Política de Privacidade</a>
            </div>
            <p className="text-recipe-text/60">
              Receita Certa © 2024. Feito com ❤️ para sua cozinha!
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
