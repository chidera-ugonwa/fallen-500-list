import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { LogIn, UserCog } from 'lucide-react';
import logo from '@/assets/logo.png';

const Header = () => {
  const { user, isEditor } = useAuth();

  const getInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-redressed">
          <img src={logo} alt="Fallen500" className="h-8 w-8" />
          <span>Fallen <span className="text-destructive">500</span></span>
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {isEditor && (
                <Button variant="outline" asChild>
                  <Link to="/admin">
                    <UserCog className="h-4 w-4 mr-2" />
                    Admin
                  </Link>
                </Button>
              )}
              <Link to="/profile">
                <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-destructive transition-all">
                  <AvatarFallback className="bg-destructive/20 text-destructive">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <Button asChild>
              <Link to="/auth">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;