'use client';

import { useMealStore } from '@/lib/stores/mealStore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export function MealList() {
  const { meals, removeMeal } = useMealStore();
  const { toast } = useToast();

  const handleDelete = (index: number) => {
    try {
      const actualIndex = meals.length - 1 - index;
      removeMeal(actualIndex);
      toast({
        title: 'Success',
        description: 'Meal deleted successfully',
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete meal',
      });
    }
  };

  if (meals.length === 0) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          No meals tracked yet. Add your first meal above!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {[...meals].reverse().map((meal, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">{meal.dish_name}</CardTitle>
                <CardDescription>
                  {meal.servings} serving{meal.servings !== 1 ? 's' : ''} •{' '}
                  {meal.calories_per_serving} calories per serving
                </CardDescription>
                <p className="text-sm font-medium">
                  Total: {meal.total_calories} calories
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(index)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 