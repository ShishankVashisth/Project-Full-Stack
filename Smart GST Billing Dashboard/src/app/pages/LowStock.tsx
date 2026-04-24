import { useApp } from '../context/AppContext';
import { AlertTriangle } from 'lucide-react';

export function LowStock() {
  const { products } = useApp();

  // ✅ FIXED FIELD
  const lowStockProducts = products.filter(p => p.stockQuantity < 10);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Low Stock Alert</h1>
        <p className="text-gray-600 mt-1">
          Products that need restocking (stock below 10 units)
        </p>
      </div>

      {lowStockProducts.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <AlertTriangle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            All products well stocked
          </h3>
          <p className="text-gray-600">
            No products are currently running low on stock
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    GST %
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Current Stock
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {lowStockProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-red-50">

                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {product.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      ₹{product.price.toFixed(2)}
                    </td>

                    {/* ✅ FIXED FIELD */}
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {product.gstPercent}%
                    </td>

                    {/* ✅ FIXED FIELD */}
                    <td className="px-6 py-4 text-sm">
                      <span className="font-semibold text-red-600">
                        {product.stockQuantity} units
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="text-red-600 font-medium">
                          {product.stockQuantity < 5 ? 'Critical' : 'Low Stock'}
                        </span>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {lowStockProducts.length > 0 && (
        <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
            <div>
              <p className="font-medium text-orange-900">
                {lowStockProducts.length} product(s) need restocking
              </p>
              <p className="text-sm text-orange-700 mt-1">
                Please update inventory to avoid running out of stock
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}