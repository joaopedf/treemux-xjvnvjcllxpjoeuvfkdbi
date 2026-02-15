import { UserProfileInput, NutritionAnalysis } from '@/lib/types';

/**
 * Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
 */
export function calculateBMR(
  weight: number, // kg
  height: number, // cm
  age: number,
  gender: string
): number {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 */
export function calculateTDEE(bmr: number, activityLevel: string): number {
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  return bmr * (activityMultipliers[activityLevel as keyof typeof activityMultipliers] || 1.2);
}

/**
 * Adjust calorie target based on goal
 */
export function adjustCaloriesForGoal(tdee: number, goal: string): number {
  switch (goal) {
    case 'lose_weight':
      return Math.round(tdee - 500); // 500 calorie deficit
    case 'gain_weight':
      return Math.round(tdee + 300); // 300 calorie surplus
    case 'build_muscle':
      return Math.round(tdee + 250); // 250 calorie surplus
    default:
      return Math.round(tdee); // maintain
  }
}

/**
 * Calculate macronutrient targets based on diet type and goals
 */
export function calculateMacros(
  calories: number,
  dietType: string,
  goal: string
): { protein: number; carbs: number; fat: number } {
  let proteinPercent = 0.3;
  let fatPercent = 0.3;
  let carbPercent = 0.4;

  // Adjust based on diet type
  switch (dietType) {
    case 'keto':
      proteinPercent = 0.2;
      fatPercent = 0.7;
      carbPercent = 0.1;
      break;
    case 'paleo':
      proteinPercent = 0.35;
      fatPercent = 0.35;
      carbPercent = 0.3;
      break;
    case 'high_protein':
      proteinPercent = 0.4;
      fatPercent = 0.25;
      carbPercent = 0.35;
      break;
  }

  // Adjust based on goal
  if (goal === 'build_muscle') {
    proteinPercent += 0.05;
    carbPercent -= 0.05;
  }

  const proteinGrams = Math.round((calories * proteinPercent) / 4); // 4 cal per gram
  const carbGrams = Math.round((calories * carbPercent) / 4); // 4 cal per gram
  const fatGrams = Math.round((calories * fatPercent) / 9); // 9 cal per gram

  return {
    protein: proteinGrams,
    carbs: carbGrams,
    fat: fatGrams,
  };
}

/**
 * Analyze user profile and generate nutrition recommendations
 */
export function analyzeNutrition(profile: UserProfileInput): NutritionAnalysis {
  const {
    age = 30,
    gender = 'male',
    height = 170,
    weight = 70,
    activityLevel = 'moderate',
    goal = 'maintain',
    dietType = 'omnivore',
    allergies = [],
    intolerances = [],
    dislikedIngredients = [],
  } = profile;

  // Calculate BMR and TDEE
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);

  // Adjust for goal
  const recommendedCalories = profile.calorieTarget || adjustCaloriesForGoal(tdee, goal);

  // Calculate macros
  const macros = calculateMacros(recommendedCalories, dietType, goal);

  // Compile dietary restrictions
  const dietaryRestrictions = [
    ...allergies.map((a) => `allergy:${a}`),
    ...intolerances.map((i) => `intolerance:${i}`),
    ...dislikedIngredients.map((d) => `dislike:${d}`),
  ];

  if (dietType === 'vegan') {
    dietaryRestrictions.push('exclude:meat', 'exclude:dairy', 'exclude:eggs', 'exclude:honey');
  } else if (dietType === 'vegetarian') {
    dietaryRestrictions.push('exclude:meat', 'exclude:fish');
  } else if (dietType === 'pescatarian') {
    dietaryRestrictions.push('exclude:meat');
  }

  return {
    bmr,
    tdee,
    recommendedCalories,
    recommendedProtein: profile.proteinTarget || macros.protein,
    recommendedCarbs: profile.carbTarget || macros.carbs,
    recommendedFat: profile.fatTarget || macros.fat,
    dietaryRestrictions,
  };
}

/**
 * Check if a recipe meets dietary restrictions
 */
export function meetsRestrictions(
  recipeIngredients: { name: string; isVegan: boolean; isVegetarian: boolean; commonAllergens: string[] }[],
  restrictions: string[]
): boolean {
  for (const restriction of restrictions) {
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
}
