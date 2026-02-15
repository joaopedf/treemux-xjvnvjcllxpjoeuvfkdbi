import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🍽️ NutriPlan API
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personalized nutrition assistant that analyzes dietary needs,
            generates custom meal plans, and creates smart shopping lists
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-xl font-semibold mb-2">Profile Analysis</h3>
            <p className="text-gray-600">
              Analyze your dietary needs based on age, activity level, goals, and restrictions
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">Meal Planning</h3>
            <p className="text-gray-600">
              Generate personalized weekly meal plans that match your nutrition targets
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold mb-2">Smart Shopping</h3>
            <p className="text-gray-600">
              Auto-generate shopping lists with price comparisons across stores
            </p>
          </div>
        </div>

        <div className="text-center space-x-4">
          <Link
            href="/dashboard"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/api-docs"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            API Documentation
          </Link>
        </div>

        <div className="mt-16 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-green-600 mr-3">✓</span>
              <div>
                <strong>JWT Authentication:</strong> Secure user registration and login
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-green-600 mr-3">✓</span>
              <div>
                <strong>Nutrition Analysis:</strong> BMR, TDEE, and macro calculations based on user profile
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-green-600 mr-3">✓</span>
              <div>
                <strong>Dietary Restrictions:</strong> Support for allergies, intolerances, and diet types (vegan, keto, etc.)
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-green-600 mr-3">✓</span>
              <div>
                <strong>Recipe Database:</strong> Comprehensive recipe management with nutritional information
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-green-600 mr-3">✓</span>
              <div>
                <strong>Meal Plan Generator:</strong> AI-powered meal planning based on user preferences
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-green-600 mr-3">✓</span>
              <div>
                <strong>Shopping List Automation:</strong> Aggregates ingredients from meal plans
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-green-600 mr-3">✓</span>
              <div>
                <strong>Grocery Store Integration:</strong> Price comparison across multiple stores
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500">
          <p>Built with Next.js 15, TypeScript, Prisma, and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
