import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireAuth } from '@/lib/auth/middleware';
import { generateShoppingListFromMealPlan, estimateShoppingListCost } from '@/lib/api/shopping-list';
import { z } from 'zod';

const generateSchema = z.object({
  name: z.string(),
  mealPlanId: z.string(),
});

export async function POST(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  try {
    const body = await request.json();
    const { name, mealPlanId } = generateSchema.parse(body);

    // Verify meal plan belongs to user
    const mealPlan = await prisma.mealPlan.findFirst({
      where: {
        id: mealPlanId,
        userId: user.userId,
      },
    });

    if (!mealPlan) {
      return NextResponse.json(
        { error: 'Meal plan not found' },
        { status: 404 }
      );
    }

    // Generate aggregated ingredients
    const aggregatedIngredients = await generateShoppingListFromMealPlan(mealPlanId);

    // Estimate costs
    const { totalCost, itemCosts } = await estimateShoppingListCost(aggregatedIngredients);

    // Create shopping list
    const shoppingList = await prisma.shoppingList.create({
      data: {
        userId: user.userId,
        name,
        mealPlanId,
        totalEstimatedCost: totalCost,
        items: {
          create: aggregatedIngredients.map((item) => ({
            ingredientId: item.ingredientId,
            amount: item.totalAmount,
            unit: item.unit,
            estimatedPrice: itemCosts.get(item.ingredientId),
          })),
        },
      },
      include: {
        items: {
          include: {
            ingredient: true,
          },
        },
      },
    });

    return NextResponse.json(shoppingList);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Generate shopping list error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
