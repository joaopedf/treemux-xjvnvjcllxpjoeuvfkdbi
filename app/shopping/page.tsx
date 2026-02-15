import Link from 'next/link';

export default function ShoppingPage() {
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
              <Link href="/shopping" className="text-green-600 font-semibold">
                Shopping Lists
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Shopping Lists</h1>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
            + New Shopping List
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">Week 1 Shopping List</h2>
                    <p className="text-sm text-gray-500">From meal plan: Week 1 - Feb 15-21</p>
                  </div>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded text-sm font-semibold">
                    PENDING
                  </span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold">42 items</span> • Est. total: <span className="font-semibold text-green-600">$156.78</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">
                    Compare Stores
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold mb-3 text-gray-700">Produce</h3>
                <div className="space-y-2 mb-6">
                  {[
                    { name: 'Spinach', amount: '500g', price: '$3.99', checked: false },
                    { name: 'Tomatoes', amount: '1kg', price: '$4.50', checked: true },
                    { name: 'Bananas', amount: '6 pieces', price: '$2.99', checked: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked={item.checked}
                          className="w-5 h-5 text-green-600 rounded"
                        />
                        <span className={`ml-3 ${item.checked ? 'line-through text-gray-400' : ''}`}>
                          {item.name}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">{item.amount}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{item.price}</span>
                    </div>
                  ))}
                </div>

                <h3 className="font-semibold mb-3 text-gray-700">Protein</h3>
                <div className="space-y-2 mb-6">
                  {[
                    { name: 'Chicken Breast', amount: '1.5kg', price: '$14.99', checked: false },
                    { name: 'Ground Beef', amount: '500g', price: '$8.50', checked: false },
                    { name: 'Eggs', amount: '12 count', price: '$4.99', checked: true },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked={item.checked}
                          className="w-5 h-5 text-green-600 rounded"
                        />
                        <span className={`ml-3 ${item.checked ? 'line-through text-gray-400' : ''}`}>
                          {item.name}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">{item.amount}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{item.price}</span>
                    </div>
                  ))}
                </div>

                <h3 className="font-semibold mb-3 text-gray-700">Dairy</h3>
                <div className="space-y-2">
                  {[
                    { name: 'Greek Yogurt', amount: '500g', price: '$5.99', checked: false },
                    { name: 'Milk', amount: '2L', price: '$4.50', checked: false },
                    { name: 'Cheese', amount: '250g', price: '$6.99', checked: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked={item.checked}
                          className="w-5 h-5 text-green-600 rounded"
                        />
                        <span className={`ml-3 ${item.checked ? 'line-through text-gray-400' : ''}`}>
                          {item.name}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">{item.amount}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h3 className="font-semibold mb-4">Price Comparison</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-green-700">Walmart</span>
                    <span className="text-sm text-green-600">Best Price</span>
                  </div>
                  <div className="text-2xl font-bold text-green-700">$156.78</div>
                  <div className="text-xs text-gray-600 mt-1">38/42 items available</div>
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">Kroger</span>
                    <span className="text-sm text-gray-500">+$12.50</span>
                  </div>
                  <div className="text-2xl font-bold">$169.28</div>
                  <div className="text-xs text-gray-600 mt-1">40/42 items available</div>
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">Whole Foods</span>
                    <span className="text-sm text-gray-500">+$31.22</span>
                  </div>
                  <div className="text-2xl font-bold">$188.00</div>
                  <div className="text-xs text-gray-600 mt-1">42/42 items available</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Actions</h3>
              <div className="space-y-2">
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                  Export to PDF
                </button>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  Send to Email
                </button>
                <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">
                  Order via Instacart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
