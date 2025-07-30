import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Link, useLocation } from 'react-router-dom';
import { Languages, Home, Info, User, LogIn } from 'lucide-react';

const Navigation = () => {
  const [teluguText, setTeluguText] = useState('');
  const [englishText, setEnglishText] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const location = useLocation();

  const handleTranslate = async () => {
    if (!teluguText.trim()) return;
    
    setIsConverting(true);
    // Simulate translation (in real app, use Google Translate API or similar)
    setTimeout(() => {
      setEnglishText(`[Translation of: ${teluguText}]`);
      setIsConverting(false);
    }, 1500);
  };

  const navItems = [
    { path: '/', label: 'హోమ్', icon: Home },
    { path: '/about', label: 'మా గురించి', icon: Info },
    { path: '/profile', label: 'ప్రొఫైల్', icon: User },
    { path: '/login', label: 'లాగిన్', icon: LogIn },
  ];

  return (
    <header className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-cultural rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">స్వ</span>
            </div>
            <span className="font-telugu font-bold text-xl text-primary">నా స్వరం</span>
          </Link>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems.map(({ path, label, icon: Icon }) => (
                <NavigationMenuItem key={path}>
                  <Link 
                    to={path}
                    className={`${navigationMenuTriggerStyle()} font-telugu ${
                      location.pathname === path ? 'bg-primary/10 text-primary' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Telugu to English Converter */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="font-telugu">
                <Languages className="w-4 h-4 mr-2" />
                అనువాదం
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="font-telugu">తెలుగు నుండి ఇంగ్లీష్ అనువాదం</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="font-telugu text-sm font-medium mb-2 block">
                    తెలుగు వచనం
                  </label>
                  <Textarea
                    value={teluguText}
                    onChange={(e) => setTeluguText(e.target.value)}
                    placeholder="తెలుగు వచనం టైప్ చేయండి..."
                    className="font-telugu"
                  />
                </div>
                
                <Button 
                  onClick={handleTranslate}
                  disabled={isConverting || !teluguText.trim()}
                  className="w-full font-telugu"
                >
                  {isConverting ? 'అనువదిస్తోంది...' : 'అనువదించు'}
                </Button>

                {englishText && (
                  <div>
                    <label className="font-telugu text-sm font-medium mb-2 block">
                      English Translation
                    </label>
                    <Textarea
                      value={englishText}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <span className="sr-only">మెనూ</span>
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="h-0.5 bg-current"></div>
                <div className="h-0.5 bg-current"></div>
                <div className="h-0.5 bg-current"></div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;