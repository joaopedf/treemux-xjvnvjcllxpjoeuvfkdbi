import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireAuth } from '@/lib/auth/middleware';
import { searchGroceryProducts } from '@/lib/api/grocery-integrations';

/**
 * Sync grocery prices for all ingredients in the database
 * This endpoint would typically be called periodically (e.g., daily via cron job)
 */
export async function POST(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult instanceof NextResponse) return authResult;

  try {
    // Get all ingredients
    const ingredients = await prisma.ingredient.findMany({
      select: { id: true, name: true },
    });

    let syncedCount = 0;
    const errors: string[] = [];

    for (const ingredient of ingredients) {
      try {
        const results = await searchGroceryProducts(ingredient.name);

        // Update or create grocery products
        for (const result of results) {
          await prisma.groceryProduct.upsert({
            where: {
              id: `${ingredient.id}-${result.storeName}`,
            },
            update: {
              price: result.price,
              quantity: result.quantity,
              unit: result.unit,
              inStock: result.inStock,
              productUrl: result.productUrl,
              imageUrl: result.imageUrl,
            },
            create: {
              ingredientId: ingredient.id,
              storeName: result.storeName,
              productName: result.productName,
              brand: result.brand,
              price: result.price,
              quantity: result.quantity,
              unit: result.unit,
              inStock: result.inStock,
              productUrl: result.productUrl,
              imageUrl: result.imageUrl,
            },
          });
        }

        syncedCount++;
      } catch (error) {
        errors.push(`Failed to sync ${ingredient.name}: ${error}`);
      }
    }

    return NextResponse.json({
      success: true,
      syncedCount,
      totalIngredients: ingredients.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Sync groceries error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
