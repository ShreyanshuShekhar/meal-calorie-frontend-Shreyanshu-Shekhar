'use client';

import { useRequireAuth } from '@/lib/hooks/useRequireAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { user } = useRequireAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.firstName}!</h1>
        <p className="text-muted-foreground mt-2">
          Track your meals and monitor your daily calorie intake.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Track Calories</CardTitle>
            <CardDescription>
              Add your meals and track your daily calorie intake
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Click the &quot;Get Calories&quot; button in the navigation bar to start tracking your meals.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>View History</CardTitle>
            <CardDescription>
              Check your meal history and calorie trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View your past meals and track your progress over time.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 