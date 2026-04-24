import { useState } from "react";
import { useApp } from "../context/AppContext";

export function CreateInvoice() {
  const { products, createInvoice } = useApp();

  const [buyerName, setBuyerName] = useState("");
  const [buyerGst, setBuyerGst] = useState("");

  const [items, setItems] = useState([
    { productId: "", quantity: "" },
  ]);

  // Handle item change
  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setItems(updatedItems);
  };

  // Add new row
  const addRow = () => {
    setItems([...items, { productId: "", quantity: "" }]);
  };

  // Remove row
  const removeRow = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // Submit invoice
  const handleSubmit = async () => {
    try {
      const payload = {
        buyerName,
        buyerGst,
        items: items.map((item) => ({
          product: { id: Number(item.productId) },
          quantity: Number(item.quantity),
        })),
      };

      await createInvoice(payload);

      alert("Invoice Created ✅");

      // Reset form
      setBuyerName("");
      setBuyerGst("");
      setItems([{ productId: "", quantity: "" }]);

    } catch (err: any) {
      alert(err.response?.data || "Error creating invoice");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Create Invoice</h1>

      {/* Buyer Info */}
      <div className="mb-6">
        <input
          placeholder="Buyer Name"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          className="border p-2 mr-4"
        />

        <input
          placeholder="Buyer GST"
          value={buyerGst}
          onChange={(e) => setBuyerGst(e.target.value)}
          className="border p-2"
        />
      </div>

      {/* Items */}
      <div className="mb-6">
        {items.map((item, index) => (
          <div key={index} className="mb-2 flex gap-4">

            <select
              value={item.productId}
              onChange={(e) =>
                handleItemChange(index, "productId", e.target.value)
              }
              className="border p-2"
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
              className="border p-2"
            />

            <button
              onClick={() => removeRow(index)}
              className="bg-red-500 text-white px-2"
            >
              X
            </button>

          </div>
        ))}

        <button
          onClick={addRow}
          className="bg-gray-300 px-4 py-2 mt-2"
        >
          Add Item
        </button>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Generate Invoice
      </button>
    </div>
  );
}