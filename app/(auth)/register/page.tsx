'use client';

import { RegisterForm } from '@/components/auth/RegisterForm';
import { useRedirectIfAuthenticated } from '@/lib/hooks/useRequireAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function RegisterPage() {
  useRedirectIfAuthenticated();

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Create a new account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-primary hover:underline"
              >
                Login here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 