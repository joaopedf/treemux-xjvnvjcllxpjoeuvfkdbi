import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { searchGroceryProducts, comparePrices } from '@/lib/api/grocery-integrations';
import { z } from 'zod';

const searchSchema = z.object({
  ingredientName: z.string(),
  stores: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult instanceof NextResponse) return authResult;

  try {
    const body = await request.json();
    const { ingredientName, stores } = searchSchema.parse(body);

    const results = await searchGroceryProducts(ingredientName, stores);
    const { cheapest, comparison } = comparePrices(results);

    return NextResponse.json({
      results,
      cheapest,
      comparison,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Search groceries error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
