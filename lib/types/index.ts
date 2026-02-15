// User types
export interface UserProfileInput {
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal?: 'lose_weight' | 'maintain' | 'gain_weight' | 'build_muscle';
  dietType?: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian' | 'keto' | 'paleo';
  calorieTarget?: number;
  proteinTarget?: number;
  carbTarget?: number;
  fatTarget?: number;
  allergies?: string[];
  intolerances?: string[];
  dislikedIngredients?: string[];
}

export interface NutritionAnalysis {
  bmr: number;
  tdee: number;
  recommendedCalories: number;
  recommendedProtein: number;
  recommendedCarbs: number;
  recommendedFat: number;
  dietaryRestrictions: string[];
}

// Recipe types
export interface RecipeInput {
  name: string;
  description?: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  instructions: string[];
  imageUrl?: string;
  tags?: string[];
  cuisine?: string;
  ingredients: {
    ingredientId: string;
    amount: number;
    unit: string;
    notes?: string;
  }[];
}

// Meal Plan types
export interface MealPlanInput {
  name: string;
  startDate: Date;
  endDate: Date;
  preferences?: {
    mealsPerDay?: number;
    excludeBreakfast?: boolean;
    excludeLunch?: boolean;
    excludeDinner?: boolean;
    includeSnacks?: boolean;
  };
}

export interface MealPlanItemInput {
  recipeId: string;
  date: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  servings: number;
}

// Shopping List types
export interface ShoppingListInput {
  name: string;
  mealPlanId?: string;
}

export interface ShoppingListItemInput {
  ingredientId: string;
  amount: number;
  unit: string;
  estimatedPrice?: number;
}

// Grocery types
export interface GroceryProductInput {
  ingredientId: string;
  storeName: string;
  productName: string;
  brand?: string;
  price: number;
  quantity: number;
  unit: string;
  inStock?: boolean;
  productUrl?: string;
  imageUrl?: string;
}

export interface GrocerySearchParams {
  ingredientName: string;
  stores?: string[];
  sortBy?: 'price' | 'availability';
  maxResults?: number;
}
