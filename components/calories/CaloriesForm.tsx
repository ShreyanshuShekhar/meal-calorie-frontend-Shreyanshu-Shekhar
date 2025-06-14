'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getCalories, CaloriesResponse } from '@/lib/api';
import { useMealStore } from '@/lib/stores/mealStore';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Minus, Plus } from "lucide-react";

const formSchema = z.object({
  dish_name: z.string()
    .min(1, { message: "Dish name is required" })
    .max(100, { message: "Dish name must be less than 100 characters" })
    .regex(/^[a-zA-Z0-9\s\-,']+$/, {
      message: "Dish name can only contain letters, numbers, spaces, hyphens, commas, and apostrophes"
    }),
  servings: z.number()
    .min(0.5, { message: "Servings must be at least 0.5" })
    .max(1000, { message: "Servings must be less than 1000" })
    .refine((val) => val % 0.5 === 0, {
      message: "Servings must be in increments of 0.5"
    }),
});

export function CaloriesForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CaloriesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dish_name: "",
      servings: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getCalories(values);
      useMealStore.getState().addMeal(response);
      setResult(response);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServingsChange = (value: number, onChange: (value: number) => void) => {
    const roundedValue = Math.round(value * 2) / 2;
    if (roundedValue >= 0.5 && roundedValue <= 1000) {
      onChange(roundedValue);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Calories Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="dish_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dish Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter dish name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="servings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Servings</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleServingsChange(field.value - 0.5, field.onChange)}
                        disabled={field.value <= 0.5}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input 
                        type="number" 
                        className="text-center"
                        min="0.5"
                        max="1000"
                        step="0.5"
                        placeholder="Enter servings" 
                        {...field}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          handleServingsChange(value, field.onChange);
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleServingsChange(field.value + 0.5, field.onChange)}
                        disabled={field.value >= 1000}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Getting Calories...' : 'Get Calories'}
            </Button>
          </form>
        </Form>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <Alert className="mt-4">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Results</AlertTitle>
            <AlertDescription>
              <div className="space-y-1">
                <p>Dish: {result.dish_name}</p>
                <p>Servings: {result.servings}</p>
                <p>Calories per serving: {result.calories_per_serving}</p>
                <p>Total calories: {result.total_calories}</p>
                <p className="text-sm text-muted-foreground">Source: {result.source}</p>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
} 