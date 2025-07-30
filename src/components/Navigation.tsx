import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Home, Info, User, LogIn } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/', label: t('home'), icon: Home },
    { path: '/about', label: t('about'), icon: Info },
    { path: '/profile', label: t('profile'), icon: User },
    { path: '/login', label: t('login'), icon: LogIn },
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
            <span className="font-telugu font-bold text-xl text-primary">{t('siteTitle')}</span>
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