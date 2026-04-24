import { useApp } from '../context/AppContext';
import { Package, AlertTriangle, TrendingUp, IndianRupee } from 'lucide-react';

export function Dashboard() {
  const { products, invoices } = useApp();

  // ✅ FIXED: correct field names
  const lowStockCount = products.filter(p => p.stockQuantity < 10).length;

  const totalSales = invoices.reduce(
    (sum, inv) => sum + inv.totalAmount,
    0
  );

  const stats = [
    {
      label: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'bg-blue-500',
      bgLight: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
    {
      label: 'Low Stock Items',
      value: lowStockCount,
      icon: AlertTriangle,
      color: 'bg-orange-500',
      bgLight: 'bg-orange-50',
      textColor: 'text-orange-700',
    },
    {
      label: 'Total Invoices',
      value: invoices.length,
      icon: TrendingUp,
      color: 'bg-green-500',
      bgLight: 'bg-green-50',
      textColor: 'text-green-700',
    },
    {
      label: 'Total Sales',
      value: `₹${totalSales.toFixed(2)}`,
      icon: IndianRupee,
      color: 'bg-purple-500',
      bgLight: 'bg-purple-50',
      textColor: 'text-purple-700',
    },
  ];

  const recentInvoices = invoices.slice(-5).reverse();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's your business overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgLight} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent + Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Invoices */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Invoices
          </h2>

          {recentInvoices.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No invoices created yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentInvoices.map((invoice) => (
                <div
                  key={invoice.invoiceId}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      Invoice #{invoice.invoiceId}
                    </p>
                    <p className="text-sm text-gray-600">
                      {invoice.buyerName}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₹{invoice.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Low Stock Alert
          </h2>

          {lowStockCount === 0 ? (
            <p className="text-gray-500 text-sm">
              All products are well stocked
            </p>
          ) : (
            <div className="space-y-3">
              {products
                .filter(p => p.stockQuantity < 10)
                .slice(0, 5)
                .map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        ₹{product.price}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-red-600">
                        {product.stockQuantity} units
                      </p>
                      <p className="text-xs text-red-500">
                        Low stock
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}