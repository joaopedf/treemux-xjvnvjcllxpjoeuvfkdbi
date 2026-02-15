import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireAuth } from '@/lib/auth/middleware';

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  try {
    const mealPlans = await prisma.mealPlan.findMany({
      where: { userId: user.userId },
      include: {
        items: {
          include: {
            recipe: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(mealPlans);
  } catch (error) {
    console.error('Get meal plans error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
