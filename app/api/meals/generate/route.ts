import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireAuth } from '@/lib/auth/middleware';
import { analyzeNutrition } from '@/lib/api/nutrition';
import { generateMealPlan } from '@/lib/api/meal-planner';
import { z } from 'zod';

const generateSchema = z.object({
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  preferences: z.object({
    mealsPerDay: z.number().optional(),
    excludeBreakfast: z.boolean().optional(),
    excludeLunch: z.boolean().optional(),
    excludeDinner: z.boolean().optional(),
    includeSnacks: z.boolean().optional(),
  }).optional(),
});

export async function POST(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  try {
    const body = await request.json();
    const { name, startDate, endDate, preferences } = generateSchema.parse(body);

    // Get user profile
    const profile = await prisma.userProfile.findUnique({
      where: { userId: user.userId },
    });

    if (!profile) {
      return NextResponse.json(
        { error: 'User profile not found. Please complete your profile first.' },
        { status: 400 }
      );
    }

    // Parse profile data
    const parsedProfile = {
      ...profile,
      allergies: profile.allergies ? JSON.parse(profile.allergies) : [],
      intolerances: profile.intolerances ? JSON.parse(profile.intolerances) : [],
      dislikedIngredients: profile.dislikedIngredients ? JSON.parse(profile.dislikedIngredients) : [],
    };

    // Analyze nutrition needs
    const analysis = analyzeNutrition(parsedProfile);

    // Generate meal plan items
    const mealPlanItems = await generateMealPlan(
      user.userId,
      new Date(startDate),
      new Date(endDate),
      analysis,
      preferences
    );

    // Calculate total nutrition
    const totalNutrition = mealPlanItems.reduce(
      (acc: any, item: any) => {
        acc.totalCalories += item.calories * item.servings;
        return acc;
      },
      { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 }
    );

    // Create meal plan
    const mealPlan = await prisma.mealPlan.create({
      data: {
        userId: user.userId,
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalCalories: Math.round(totalNutrition.totalCalories),
        totalProtein: totalNutrition.totalProtein,
        totalCarbs: totalNutrition.totalCarbs,
        totalFat: totalNutrition.totalFat,
        items: {
          create: mealPlanItems.map((item: any) => ({
            recipeId: item.recipeId,
            date: item.date,
            mealType: item.mealType,
            servings: item.servings,
          })),
        },
      },
      include: {
        items: {
          include: {
            recipe: true,
          },
        },
      },
    });

    return NextResponse.json(mealPlan);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Generate meal plan error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
