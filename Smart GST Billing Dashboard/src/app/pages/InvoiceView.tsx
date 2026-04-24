import { useParams } from "react-router";
import { useApp } from "../context/AppContext";

export function InvoiceView() {
  const { id } = useParams();
  const { invoices } = useApp();

  // Find invoice using backend ID
  const invoice = invoices.find(
    (inv) => inv.invoiceId === Number(id)
  );

  if (!invoice) {
    return <div className="p-8">Invoice not found</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">GST Invoice</h1>
          <p className="text-gray-600">Invoice ID: #{invoice.invoiceId}</p>
        </div>

        {/* SELLER DETAILS */}
        <div className="mb-6">
          <h2 className="font-semibold">Seller Details</h2>
          <p>Smart GST Billing System</p>
          <p>GSTIN: 22AAAAA0000A1Z5</p>
        </div>

        {/* BUYER DETAILS */}
        <div className="mb-6">
          <h2 className="font-semibold">Buyer Details</h2>
          <p>Name: {invoice.buyerName}</p>
          <p>GSTIN: {invoice.buyerGst}</p>
        </div>

        {/* ITEMS TABLE */}
        <table className="w-full border border-gray-200 mb-6">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 border">Product</th>
              <th className="p-3 border">Qty</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">GST</th>
              <th className="p-3 border">Total</th>
            </tr>
          </thead>

          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index}>
                <td className="p-3 border">{item.productName}</td>
                <td className="p-3 border">{item.quantity}</td>
                <td className="p-3 border">₹{item.price}</td>
                <td className="p-3 border">₹{item.gst}</td>
                <td className="p-3 border font-semibold">
                  ₹{item.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTAL */}
        <div className="text-right">
          <h2 className="text-xl font-bold">
            Grand Total: ₹{invoice.totalAmount.toFixed(2)}
          </h2>
        </div>

        {/* PRINT BUTTON */}
        <div className="mt-6 text-right">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Print Invoice
          </button>
        </div>

      </div>
    </div>
  );
}