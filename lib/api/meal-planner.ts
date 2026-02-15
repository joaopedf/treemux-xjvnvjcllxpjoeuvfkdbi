import { prisma } from '@/lib/db/prisma';
import { NutritionAnalysis } from '@/lib/types';

interface Recipe {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tags: string[];
  mealTypes: string[];
}

/**
 * Generate a meal plan for a user based on their nutrition analysis
 */
export async function generateMealPlan(
  userId: string,
  startDate: Date,
  endDate: Date,
  analysis: NutritionAnalysis,
  preferences: {
    mealsPerDay?: number;
    excludeBreakfast?: boolean;
    excludeLunch?: boolean;
    excludeDinner?: boolean;
    includeSnacks?: boolean;
  } = {}
): Promise<any> {
  const {
    mealsPerDay = 3,
    excludeBreakfast = false,
    excludeLunch = false,
    excludeDinner = false,
    includeSnacks = false,
  } = preferences;

  // Fetch all available recipes
  const recipes = await prisma.recipe.findMany({
    include: {
      ingredients: {
        include: {
          ingredient: true,
        },
      },
    },
  });

  // Filter recipes based on dietary restrictions
  const suitableRecipes = recipes.filter((recipe) => {
    const recipeIngredients = recipe.ingredients.map((ri) => ({
      name: ri.ingredient.name,
      isVegan: ri.ingredient.isVegan,
      isVegetarian: ri.ingredient.isVegetarian,
      commonAllergens: ri.ingredient.commonAllergens
        ? JSON.parse(ri.ingredient.commonAllergens)
        : [],
    }));

    // Check dietary restrictions
    for (const restriction of analysis.dietaryRestrictions) {
      if (restriction.startsWith('allergy:')) {
        const allergen = restriction.split(':')[1];
        for (const ingredient of recipeIngredients) {
          if (ingredient.commonAllergens.includes(allergen)) {
            return false;
          }
        }
      } else if (restriction.startsWith('exclude:')) {
        const excluded = restriction.split(':')[1].toLowerCase();
        for (const ingredient of recipeIngredients) {
          if (ingredient.name.toLowerCase().includes(excluded)) {
            return false;
          }
        }
      }
    }

    return true;
  });

  // Categorize recipes by typical meal type
  const breakfastRecipes = suitableRecipes.filter((r) => {
    const tags = r.tags ? JSON.parse(r.tags) : [];
    return tags.includes('breakfast') || r.name.toLowerCase().includes('breakfast');
  });

  const lunchRecipes = suitableRecipes.filter((r) => {
    const tags = r.tags ? JSON.parse(r.tags) : [];
    return tags.includes('lunch') || tags.includes('main');
  });

  const dinnerRecipes = suitableRecipes.filter((r) => {
    const tags = r.tags ? JSON.parse(r.tags) : [];
    return tags.includes('dinner') || tags.includes('main');
  });

  const snackRecipes = suitableRecipes.filter((r) => {
    const tags = r.tags ? JSON.parse(r.tags) : [];
    return tags.includes('snack');
  });

  // Generate meal plan
  const mealPlanItems: any[] = [];
  const dailyCalorieTarget = analysis.recommendedCalories;
  const mealsCount = mealsPerDay + (includeSnacks ? 1 : 0);

  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dayItems: any[] = [];

    // Add breakfast
    if (!excludeBreakfast && breakfastRecipes.length > 0) {
      const recipe = breakfastRecipes[Math.floor(Math.random() * breakfastRecipes.length)];
      dayItems.push({
        recipeId: recipe.id,
        date: new Date(currentDate),
        mealType: 'breakfast',
        servings: 1,
        calories: recipe.calories,
      });
    }

    // Add lunch
    if (!excludeLunch && lunchRecipes.length > 0) {
      const recipe = lunchRecipes[Math.floor(Math.random() * lunchRecipes.length)];
      dayItems.push({
        recipeId: recipe.id,
        date: new Date(currentDate),
        mealType: 'lunch',
        servings: 1,
        calories: recipe.calories,
      });
    }

    // Add dinner
    if (!excludeDinner && dinnerRecipes.length > 0) {
      const recipe = dinnerRecipes[Math.floor(Math.random() * dinnerRecipes.length)];
      dayItems.push({
        recipeId: recipe.id,
        date: new Date(currentDate),
        mealType: 'dinner',
        servings: 1,
        calories: recipe.calories,
      });
    }

    // Add snacks if requested
    if (includeSnacks && snackRecipes.length > 0) {
      const recipe = snackRecipes[Math.floor(Math.random() * snackRecipes.length)];
      dayItems.push({
        recipeId: recipe.id,
        date: new Date(currentDate),
        mealType: 'snack',
        servings: 1,
        calories: recipe.calories,
      });
    }

    mealPlanItems.push(...dayItems);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return mealPlanItems;
}

/**
 * Calculate total nutrition for a meal plan
 */
export function calculateMealPlanNutrition(items: any[]): {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
} {
  return items.reduce(
    (acc, item) => {
      acc.totalCalories += item.calories * item.servings;
      acc.totalProtein += item.protein * item.servings;
      acc.totalCarbs += item.carbs * item.servings;
      acc.totalFat += item.fat * item.servings;
      return acc;
    },
    { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 }
  );
}
