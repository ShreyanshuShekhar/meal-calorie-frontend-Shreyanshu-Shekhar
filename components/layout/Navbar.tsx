'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold">
              Meal Calorie Counter
            </Link>
            {user && (
              <div className="hidden md:flex items-center gap-4">
                <Link 
                  href="/dashboard"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive('/dashboard') ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/dashboard/calories"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive('/dashboard/calories') ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  Track Calories
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className={cn(
                    isActive('/login') && "bg-muted"
                  )}>
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className={cn(
                    isActive('/register') && "bg-muted"
                  )}>
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 