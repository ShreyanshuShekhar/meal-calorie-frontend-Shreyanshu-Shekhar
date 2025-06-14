import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useRequireAuth(redirectTo: string = '/login') {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(redirectTo);
    }
  }, [user, router, redirectTo]);

  return { user };
}

export function useRedirectIfAuthenticated(redirectTo: string = '/dashboard') {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push(redirectTo);
    }
  }, [user, router, redirectTo]);

  return { user };
} 