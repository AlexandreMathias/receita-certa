
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, ChefHat, Home, Trophy } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header = ({ onNavigate, currentPage }: HeaderProps) => {
  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'top10', label: 'Top 10', icon: Trophy }
  ];

  return (
    <header className="bg-recipe-card shadow-lg border-b-4 border-recipe-primary">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer hover-scale"
            onClick={() => onNavigate('home')}
          >
            <div className="p-2 bg-recipe-primary rounded-full">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-recipe-primary">Receita Certa</h1>
              <p className="text-sm text-recipe-text/70">Descubra o sabor da praticidade!</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 ${
                    currentPage === item.id 
                      ? 'bg-recipe-primary text-white hover:bg-recipe-primary/90' 
                      : 'text-recipe-text hover:text-recipe-primary hover:bg-recipe-secondary/20'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-recipe-primary"
            >
              <Heart className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
