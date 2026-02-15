import Link from 'next/link';

export default function Dashboard() {
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
              <Link href="/meals" className="text-gray-700 hover:text-green-600">
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
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">Daily Calories</div>
            <div className="text-3xl font-bold text-green-600">2,200</div>
            <div className="text-xs text-gray-500 mt-2">Target: 2,000 cal</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">Protein</div>
            <div className="text-3xl font-bold text-blue-600">165g</div>
            <div className="text-xs text-gray-500 mt-2">Target: 150g</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">Active Meal Plans</div>
            <div className="text-3xl font-bold text-purple-600">2</div>
            <div className="text-xs text-gray-500 mt-2">This week</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-sm text-gray-600 mb-1">Shopping Lists</div>
            <div className="text-3xl font-bold text-orange-600">1</div>
            <div className="text-xs text-gray-500 mt-2">Pending</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
                Generate New Meal Plan
              </button>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                Create Shopping List
              </button>
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
                Update Profile
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="border-l-4 border-green-500 pl-3 py-2">
                <div className="font-medium">Meal plan created</div>
                <div className="text-sm text-gray-500">Week of Feb 15-21</div>
              </div>
              <div className="border-l-4 border-blue-500 pl-3 py-2">
                <div className="font-medium">Shopping list generated</div>
                <div className="text-sm text-gray-500">42 items, $156.78</div>
              </div>
              <div className="border-l-4 border-purple-500 pl-3 py-2">
                <div className="font-medium">Profile updated</div>
                <div className="text-sm text-gray-500">New weight: 70kg</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">API Quick Start</h2>
          <div className="bg-gray-50 p-4 rounded font-mono text-sm overflow-x-auto">
            <div className="mb-4">
              <div className="text-green-600 font-semibold mb-1"># Register a new user</div>
              <div>curl -X POST http://localhost:3000/api/auth/register \</div>
              <div className="pl-4">-H "Content-Type: application/json" \</div>
              <div className="pl-4">-d '{"{'}"email":"user@example.com","password":"secret123","name":"John"{"}'}"'</div>
            </div>
            <div className="mb-4">
              <div className="text-green-600 font-semibold mb-1"># Update profile</div>
              <div>curl -X PUT http://localhost:3000/api/users/profile \</div>
              <div className="pl-4">-H "Authorization: Bearer YOUR_TOKEN" \</div>
              <div className="pl-4">-d '{"{'}"age":30,"weight":70,"height":175,"goal":"lose_weight"{"}'}"'</div>
            </div>
            <div>
              <div className="text-green-600 font-semibold mb-1"># Generate meal plan</div>
              <div>curl -X POST http://localhost:3000/api/meals/generate \</div>
              <div className="pl-4">-H "Authorization: Bearer YOUR_TOKEN" \</div>
              <div className="pl-4">-d '{"{'}"name":"Week 1","startDate":"2026-02-15","endDate":"2026-02-21"{"}'}"'</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
