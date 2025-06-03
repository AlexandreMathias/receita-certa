import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Recipe } from '@/types/recipe';
import { RefreshCcw, Heart, Star, Pencil } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIRecipeGeneratorProps {
  onRecipeGenerated: (recipe: Recipe) => void;
  onViewRecipe: (recipe: Recipe) => void;
}

const GEMINI_API_KEY = "AIzaSyDChI3sZGL-8sW45zUCXEoG55RlYNV6sig";

const AIRecipeGenerator = ({ onRecipeGenerated, onViewRecipe }: AIRecipeGeneratorProps) => {
  const [input, setInput] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  const generateRecipe = async () => {
    if (!input.trim()) {
      toast({
        title: "Ops!",
        description: "Conte para nossa IA o que você deseja cozinhar!",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    console.log("testando a chave", GEMINI_API_KEY);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
  contents: [
    {
      role: "user",
      parts: [{
        text: `Você é um assistente de cozinha explicando para um cozinheiro amador. Gere uma receita fácil, com até 5 passos simples, usando linguagem clara. Pedido: ${input}`
      }]
              },
            ],
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      console.log(generatedText);

      if (!generatedText) throw new Error("Nenhuma resposta recebida");

      const lines = generatedText.split("\n").filter(line => line.trim() !== "");
      const ingredients: string[] = [];
      const instructions: string[] = [];
      let isInstruction = false;

      for (const line of lines) {
        if (line.toLowerCase().includes("modo de preparo") || line.toLowerCase().includes("preparo")) {
          isInstruction = true;
          continue;
        }
        if (isInstruction) {
          instructions.push(line);
        } else {
          ingredients.push(line);
        }
      }

      const recipe: Recipe = {
        id: `gemini-${Date.now()}`,
        title: `Receita com IA: ${input.substring(0, 30)}`,
        description: `Receita gerada pela IA Gemini com base no seu pedido: "${input}"`,
        ingredients,
        instructions,
        prepTime: 30,
        difficulty: "Médio",
        servings: 4,
        likes: 0,
        category: "IA",
        ratings: [],
        averageRating: 0,
      };

      setGeneratedRecipe(recipe);
      onRecipeGenerated(recipe);

      toast({
        title: "Receita criada! 🎉",
        description: "Sua receita especial foi gerada pela IA Gemini!",
      });

    } catch (error) {
      toast({
        title: "Erro ao gerar receita",
        description: "Houve um problema com a IA. Tente novamente mais tarde.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLike = () => {
    if (generatedRecipe) {
      setIsLiked(!isLiked);
      toast({
        title: isLiked ? "Like removido" : "Gostei! ❤️",
        description: isLiked ? "Obrigado pelo feedback!" : "Que bom que você gostou!",
      });
    }
  };

  const handleRating = () => {
    toast({
      title: "Avaliação",
      description: "Recurso de avaliação em desenvolvimento!",
    });
  };

  const generateSimilar = () => {
    toast({
      title: "Gerando receita similar...",
      description: "Nossa IA está criando uma variação para você!",
    });
    generateRecipe();
  };

  return (
    <div className="space-y-6">
      <div className="recipe-card p-8">
        <h2 className="text-2xl font-bold text-recipe-text mb-6 text-center">
          Mágica na Cozinha: Sua Receita em Segundos! ✨
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-recipe-text font-medium mb-2">
              Conte para nossa IA o que você deseja:
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: 'Quero um bolo de cenoura fofinho e rápido' OU 'Tenho frango, brócolis e arroz, o que posso fazer?'"
              className="min-h-[100px] border-recipe-secondary/30 focus:border-recipe-primary"
            />
          </div>

          <Button
            onClick={generateRecipe}
            disabled={isGenerating}
            className="w-full bg-recipe-primary text-white hover:bg-recipe-primary/90 text-lg py-6"
          >
            {isGenerating ? 'Nossa IA está criando sua receita...' : 'Gerar Receita com IA! 🤖✨'}
          </Button>
        </div>
      </div>

      {generatedRecipe && (
        <div className="recipe-card p-8 animate-scale-in">
          <h3 className="text-2xl font-bold text-recipe-text mb-4">
            {generatedRecipe.title}
          </h3>

          <p className="text-recipe-text/70 mb-6">{generatedRecipe.description}</p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-recipe-text mb-3">Ingredientes:</h4>
              <ul className="space-y-2">
                {generatedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-recipe-text/80 flex items-start">
                    <span className="mr-2 text-recipe-primary">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-recipe-text mb-3">Modo de Preparo:</h4>
              <ol className="space-y-2">
                {generatedRecipe.instructions.map((step, index) => (
                  <li key={index} className="text-recipe-text/80">
                    <span className="font-medium text-recipe-primary">{index + 1}.</span> {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={handleLike} variant="ghost" className={`flex items-center space-x-2 ${isLiked ? 'text-recipe-accent' : 'text-recipe-text/60'}`}>
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>Gostei!</span>
            </Button>

            <Button onClick={handleRating} variant="ghost" className="flex items-center space-x-2 text-recipe-text/60 hover:text-recipe-secondary">
              <Star className="h-5 w-5" />
              <span>Avaliar</span>
            </Button>

            <Button onClick={() => onViewRecipe(generatedRecipe)} variant="ghost" className="flex items-center space-x-2 text-recipe-text/60 hover:text-recipe-primary">
              <Pencil className="h-5 w-5" />
              <span>Ver Completa</span>
            </Button>

            <Button onClick={generateSimilar} variant="ghost" className="flex items-center space-x-2 text-recipe-text/60 hover:text-recipe-secondary">
              <RefreshCcw className="h-5 w-5" />
              <span>Gerar Similar</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecipeGenerator;
