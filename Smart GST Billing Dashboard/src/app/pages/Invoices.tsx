import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { FileText, Eye } from 'lucide-react';

export function Invoices() {
  const { invoices } = useApp();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
        <p className="text-gray-600 mt-1">
          View and manage all generated invoices
        </p>
      </div>

      {invoices.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No invoices yet
          </h3>
          <p className="text-gray-600 mb-4">
            Create your first invoice to get started
          </p>
          <Link
            to="/create-invoice"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Invoice
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Invoice ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Buyer Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Buyer GST
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Total Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.invoiceId} className="hover:bg-gray-50">
                    
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      #{invoice.invoiceId}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      {invoice.buyerName}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      {invoice.buyerGst}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      {invoice.items.length} item(s)
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ₹{invoice.totalAmount.toFixed(2)}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <Link
                        to={`/invoices/${invoice.invoiceId}`}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}