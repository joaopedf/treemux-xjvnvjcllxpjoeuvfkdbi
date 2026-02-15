import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireAuth } from '@/lib/auth/middleware';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; itemId: string } }
) {
  const authResult = await requireAuth(request);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  try {
    const { id, itemId } = params;
    const body = await request.json();
    const { isPurchased } = body;

    // Verify shopping list belongs to user
    const shoppingList = await prisma.shoppingList.findFirst({
      where: {
        id,
        userId: user.userId,
      },
    });

    if (!shoppingList) {
      return NextResponse.json(
        { error: 'Shopping list not found' },
        { status: 404 }
      );
    }

    // Update item
    const item = await prisma.shoppingListItem.update({
      where: { id: itemId },
      data: { isPurchased },
      include: {
        ingredient: true,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Update shopping list item error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
