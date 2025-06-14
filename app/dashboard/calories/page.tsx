'use client';

import { useRequireAuth } from '@/lib/hooks/useRequireAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CaloriesForm } from '@/components/calories/CaloriesForm';
import { MealList } from '@/components/calories/MealList';

export default function CaloriesPage() {
  const { user } = useRequireAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Track Your Calories</h1>
        <p className="text-muted-foreground mt-2">
          Enter your meal details to calculate calories
        </p>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calculate Calories</CardTitle>
            <CardDescription>
              Enter your meal details below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CaloriesForm />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Meals</CardTitle>
            <CardDescription>
              Track your daily calorie intake
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MealList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 