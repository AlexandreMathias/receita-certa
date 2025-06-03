
import { Recipe, RecipeCategory } from '@/types/recipe';

export const categories: RecipeCategory[] = [
  {
    id: 'rapidas',
    name: 'Receitas Rápidas',
    description: 'Para quando o tempo é curto.',
    icon: 'clock',
    color: 'recipe-secondary'
  },
  {
    id: 'fit',
    name: 'Opções Fit',
    description: 'Sabor e saúde no seu prato.',
    icon: 'apple',
    color: 'recipe-primary'
  },
  {
    id: 'classicas',
    name: 'Clássicos da Vovó',
    description: 'Aconchego e tradição.',
    icon: 'heart',
    color: 'recipe-accent'
  },
  {
    id: 'doces',
    name: 'Doces Momentos',
    description: 'Para adoçar o seu dia.',
    icon: 'star',
    color: 'recipe-secondary'
  },
  {
    id: 'elaboradas',
    name: 'Receitas Elaboradas',
    description: 'Desafie suas habilidades.',
    icon: 'chef-hat',
    color: 'recipe-primary'
  }
];

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Bolo de Chocolate Fofinho',
    description: 'Um bolo de chocolate irresistível e super fofinho para adoçar seu dia!',
    ingredients: [
      '2 xícaras de farinha de trigo',
      '1 3/4 xícaras de açúcar',
      '3/4 xícara de cacau em pó',
      '2 colheres de chá de fermento',
      '1 colher de chá de bicarbonato',
      '1 colher de chá de sal',
      '2 ovos',
      '1 xícara de leite',
      '1/2 xícara de óleo',
      '2 colheres de chá de essência de baunilha'
    ],
    instructions: [
      'Preaqueça o forno a 180°C e unte uma forma redonda.',
      'Em uma tigela grande, misture todos os ingredientes secos.',
      'Em outra tigela, bata os ovos e adicione o leite, óleo e baunilha.',
      'Misture os ingredientes úmidos com os secos até formar uma massa homogênea.',
      'Despeje na forma e asse por 30-35 minutos.',
      'Teste com um palito - se sair limpo, está pronto!'
    ],
    prepTime: 45,
    difficulty: 'Fácil',
    servings: 8,
    likes: 1247,
    category: 'doces',
    ratings: [
      {
        id: '1',
        userName: 'Ana Silva',
        rating: 5,
        comment: 'Ficou perfeito! Super fofinho mesmo!',
        createdAt: new Date('2024-01-15')
      },
      {
        id: '2',
        userName: 'Carlos Mendes',
        rating: 5,
        comment: 'Melhor bolo de chocolate que já fiz!',
        createdAt: new Date('2024-01-10')
      }
    ],
    averageRating: 4.8
  },
  {
    id: '2',
    title: 'Salada Caesar Fit',
    description: 'Uma versão mais saudável da clássica salada caesar, perfeita para quem cuida da forma.',
    ingredients: [
      '1 pé de alface romana',
      '150g de frango grelhado em cubos',
      '2 colheres de sopa de queijo parmesão ralado',
      '1 colher de sopa de azeite extra virgem',
      '1 colher de sopa de limão',
      '1 dente de alho amassado',
      '1 colher de chá de mostarda dijon',
      'Sal e pimenta a gosto',
      'Croutons integrais (opcional)'
    ],
    instructions: [
      'Lave e corte a alface em pedaços médios.',
      'Tempere o frango com sal, pimenta e grelhe até dourar.',
      'Para o molho: misture azeite, limão, alho, mostarda, sal e pimenta.',
      'Em uma saladeira, coloque a alface e regue com o molho.',
      'Adicione o frango grelhado e o queijo parmesão.',
      'Misture bem e sirva imediatamente.'
    ],
    prepTime: 20,
    difficulty: 'Fácil',
    servings: 2,
    likes: 892,
    category: 'fit',
    ratings: [
      {
        id: '3',
        userName: 'Sofia Oliveira',
        rating: 4,
        comment: 'Deliciosa e saudável!',
        createdAt: new Date('2024-01-12')
      }
    ],
    averageRating: 4.5
  },
  {
    id: '3',
    title: 'Macarrão à Carbonara Rápido',
    description: 'O clássico italiano pronto em poucos minutos!',
    ingredients: [
      '400g de espaguete',
      '200g de bacon em cubos',
      '3 ovos',
      '100g de queijo parmesão ralado',
      '2 dentes de alho',
      'Sal e pimenta-do-reino a gosto',
      'Salsinha picada para decorar'
    ],
    instructions: [
      'Cozinhe o macarrão em água fervente com sal.',
      'Doure o bacon numa frigideira até ficar crocante.',
      'Bata os ovos com o queijo parmesão numa tigela.',
      'Escorra o macarrão (reserve um pouco da água).',
      'Misture o macarrão quente com os ovos e queijo.',
      'Adicione o bacon e um pouco da água do cozimento.',
      'Tempere e sirva quente com salsinha.'
    ],
    prepTime: 25,
    difficulty: 'Médio',
    servings: 4,
    likes: 1156,
    category: 'rapidas',
    ratings: [],
    averageRating: 4.7
  }
];
