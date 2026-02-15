import { prisma } from '@/lib/db/prisma';

interface AggregatedIngredient {
  ingredientId: string;
  ingredientName: string;
  totalAmount: number;
  unit: string;
  category: string;
}

/**
 * Generate shopping list from a meal plan
 */
export async function generateShoppingListFromMealPlan(
  mealPlanId: string
): Promise<AggregatedIngredient[]> {
  // Get meal plan with all items and recipes
  const mealPlan = await prisma.mealPlan.findUnique({
    where: { id: mealPlanId },
    include: {
      items: {
        include: {
          recipe: {
            include: {
              ingredients: {
                include: {
                  ingredient: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!mealPlan) {
    throw new Error('Meal plan not found');
  }

  // Aggregate ingredients
  const ingredientMap = new Map<string, AggregatedIngredient>();

  for (const item of mealPlan.items) {
    const servings = item.servings;

    for (const recipeIngredient of item.recipe.ingredients) {
      const ingredientId = recipeIngredient.ingredientId;
      const amount = recipeIngredient.amount * servings;
      const unit = recipeIngredient.unit;
      const ingredient = recipeIngredient.ingredient;

      if (ingredientMap.has(ingredientId)) {
        const existing = ingredientMap.get(ingredientId)!;
        // Only add if same unit (in production, implement unit conversion)
        if (existing.unit === unit) {
          existing.totalAmount += amount;
        }
      } else {
        ingredientMap.set(ingredientId, {
          ingredientId,
          ingredientName: ingredient.name,
          totalAmount: amount,
          unit,
          category: ingredient.category,
        });
      }
    }
  }

  // Sort by category
  const aggregated = Array.from(ingredientMap.values());
  aggregated.sort((a, b) => a.category.localeCompare(b.category));

  return aggregated;
}

/**
 * Estimate shopping list cost by finding cheapest products
 */
export async function estimateShoppingListCost(
  aggregatedIngredients: AggregatedIngredient[]
): Promise<{ totalCost: number; itemCosts: Map<string, number> }> {
  let totalCost = 0;
  const itemCosts = new Map<string, number>();

  for (const item of aggregatedIngredients) {
    // Find cheapest available product for this ingredient
    const cheapestProduct = await prisma.groceryProduct.findFirst({
      where: {
        ingredientId: item.ingredientId,
        inStock: true,
      },
      orderBy: {
        price: 'asc',
      },
    });

    if (cheapestProduct) {
      // Calculate cost based on needed amount
      const unitCost = cheapestProduct.price / cheapestProduct.quantity;
      const itemCost = unitCost * item.totalAmount;

      totalCost += itemCost;
      itemCosts.set(item.ingredientId, itemCost);
    }
  }

  return { totalCost, itemCosts };
}

/**
 * Optimize shopping list by grouping by store
 */
export async function optimizeByStore(
  aggregatedIngredients: AggregatedIngredient[]
): Promise<Map<string, { ingredients: AggregatedIngredient[]; estimatedCost: number }>> {
  const storeMap = new Map<string, { ingredients: AggregatedIngredient[]; estimatedCost: number }>();

  for (const item of aggregatedIngredients) {
    const products = await prisma.groceryProduct.findMany({
      where: {
        ingredientId: item.ingredientId,
        inStock: true,
      },
      orderBy: {
        price: 'asc',
      },
    });

    // Find best store for this ingredient
    if (products.length > 0) {
      const bestProduct = products[0];
      const storeName = bestProduct.storeName;
      const unitCost = bestProduct.price / bestProduct.quantity;
      const itemCost = unitCost * item.totalAmount;

      if (!storeMap.has(storeName)) {
        storeMap.set(storeName, {
          ingredients: [],
          estimatedCost: 0,
        });
      }

      const store = storeMap.get(storeName)!;
      store.ingredients.push(item);
      store.estimatedCost += itemCost;
    }
  }

  return storeMap;
}
