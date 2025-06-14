import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

const caloriesSchema = z.object({
  dish_name: z.string().min(1),
  servings: z.number().min(0.1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = caloriesSchema.parse(body);
    
    // TODO: Add real calorie calculation logic or API integration
    // For now, return mock data
    const mockCaloriesPerServing = Math.floor(Math.random() * 500) + 100;
    
    return NextResponse.json({
      dish_name: data.dish_name,
      servings: data.servings,
      calories_per_serving: mockCaloriesPerServing,
      total_calories: mockCaloriesPerServing * data.servings,
      source: 'Mock Nutrition Database',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 