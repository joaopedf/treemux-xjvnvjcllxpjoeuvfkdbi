import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireAuth } from '@/lib/auth/middleware';
import { analyzeNutrition } from '@/lib/api/nutrition';
import { z } from 'zod';

const profileSchema = z.object({
  age: z.number().optional(),
  gender: z.string().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']).optional(),
  goal: z.enum(['lose_weight', 'maintain', 'gain_weight', 'build_muscle']).optional(),
  dietType: z.enum(['omnivore', 'vegetarian', 'vegan', 'pescatarian', 'keto', 'paleo']).optional(),
  calorieTarget: z.number().optional(),
  proteinTarget: z.number().optional(),
  carbTarget: z.number().optional(),
  fatTarget: z.number().optional(),
  allergies: z.array(z.string()).optional(),
  intolerances: z.array(z.string()).optional(),
  dislikedIngredients: z.array(z.string()).optional(),
});

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  try {
    const profile = await prisma.userProfile.findUnique({
      where: { userId: user.userId },
    });

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    // Parse JSON fields
    const parsedProfile = {
      ...profile,
      allergies: profile.allergies ? JSON.parse(profile.allergies) : [],
      intolerances: profile.intolerances ? JSON.parse(profile.intolerances) : [],
      dislikedIngredients: profile.dislikedIngredients ? JSON.parse(profile.dislikedIngredients) : [],
    };

    // Generate nutrition analysis
    const analysis = analyzeNutrition(parsedProfile);

    return NextResponse.json({
      profile: parsedProfile,
      analysis,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const authResult = await requireAuth(request);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  try {
    const body = await request.json();
    const data = profileSchema.parse(body);

    // Convert arrays to JSON strings for storage
    const updateData: any = { ...data };
    if (data.allergies) {
      updateData.allergies = JSON.stringify(data.allergies);
    }
    if (data.intolerances) {
      updateData.intolerances = JSON.stringify(data.intolerances);
    }
    if (data.dislikedIngredients) {
      updateData.dislikedIngredients = JSON.stringify(data.dislikedIngredients);
    }

    const profile = await prisma.userProfile.upsert({
      where: { userId: user.userId },
      update: updateData,
      create: {
        userId: user.userId,
        ...updateData,
      },
    });

    // Parse JSON fields for response
    const parsedProfile = {
      ...profile,
      allergies: profile.allergies ? JSON.parse(profile.allergies) : [],
      intolerances: profile.intolerances ? JSON.parse(profile.intolerances) : [],
      dislikedIngredients: profile.dislikedIngredients ? JSON.parse(profile.dislikedIngredients) : [],
    };

    // Generate nutrition analysis
    const analysis = analyzeNutrition(parsedProfile);

    return NextResponse.json({
      profile: parsedProfile,
      analysis,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
