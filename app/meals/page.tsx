import Link from 'next/link';

export default function MealsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-green-600">
              🍽️ NutriPlan
            </Link>
            <div className="space-x-4">
              <Link href="/dashboard" className="text-gray-700 hover:text-green-600">
                Dashboard
              </Link>
              <Link href="/meals" className="text-green-600 font-semibold">
                Meal Plans
              </Link>
              <Link href="/shopping" className="text-gray-700 hover:text-green-600">
                Shopping Lists
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Meal Plans</h1>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
            + New Meal Plan
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">Week 1 - Feb 15-21</h3>
                <p className="text-sm text-gray-500">Active</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                ACTIVE
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Meals</span>
                <span className="font-semibold">21 meals</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg. Calories/day</span>
                <span className="font-semibold">2,100 cal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg. Protein/day</span>
                <span className="font-semibold">155g</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm">
                View Details
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition text-sm">
                Edit
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">Week 2 - Feb 22-28</h3>
                <p className="text-sm text-gray-500">Upcoming</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                PLANNED
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Meals</span>
                <span className="font-semibold">21 meals</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg. Calories/day</span>
                <span className="font-semibold">2,050 cal</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg. Protein/day</span>
                <span className="font-semibold">160g</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm">
                View Details
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition text-sm">
                Edit
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border-2 border-dashed border-green-300 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-3">➕</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Create New Meal Plan
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Generate a personalized weekly meal plan
              </p>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                Get Started
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center text-green-600 font-bold text-xl mb-3">
                1
              </div>
              <h3 className="font-semibold mb-2">Set Your Goals</h3>
              <p className="text-sm text-gray-600">
                Update your profile with dietary preferences, allergies, and fitness goals
              </p>
            </div>
            <div>
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mb-3">
                2
              </div>
              <h3 className="font-semibold mb-2">Generate Plan</h3>
              <p className="text-sm text-gray-600">
                Our algorithm creates a personalized meal plan matching your nutrition targets
              </p>
            </div>
            <div>
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl mb-3">
                3
              </div>
              <h3 className="font-semibold mb-2">Shop & Cook</h3>
              <p className="text-sm text-gray-600">
                Get an automated shopping list with price comparisons across stores
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
