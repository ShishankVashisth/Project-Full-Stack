import React, { useState } from "react";
import { useApp } from "../context/AppContext";

const Product = () => {
  const {
    products,
    addProduct,
    searchProducts,
    getProducts,
    getLowStock,
  } = useApp();

  const [form, setForm] = useState({
    name: "",
    price: "",
    gstPercent: "",
    stockQuantity: "",
  });

  const [search, setSearch] = useState("");

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addProduct({
        name: form.name,
        price: Number(form.price),
        gstPercent: Number(form.gstPercent),
        stockQuantity: Number(form.stockQuantity),
      });

      alert("Product Added ✅");

      // Reset form
      setForm({
        name: "",
        price: "",
        gstPercent: "",
        stockQuantity: "",
      });
    } catch (err: any) {
      alert(err.response?.data || "Error adding product");
    }
  };

  // Search product
  const handleSearch = async () => {
    if (search.trim() === "") {
      getProducts();
    } else {
      await searchProducts(search);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Management</h1>

      {/* ADD PRODUCT FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          name="gstPercent"
          placeholder="GST %"
          value={form.gstPercent}
          onChange={handleChange}
        />

        <input
          name="stockQuantity"
          placeholder="Stock"
          value={form.stockQuantity}
          onChange={handleChange}
        />

        <button type="submit">Add Product</button>
      </form>

      {/* SEARCH */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={getProducts}>Reset</button>
        <button onClick={getLowStock}>Low Stock</button>
      </div>

      {/* PRODUCT LIST */}
      <h2>Product List</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>GST %</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                style={{
                  backgroundColor:
                    p.stockQuantity < 10 ? "#ffcccc" : "white",
                }}
              >
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.gstPercent}%</td>
                <td>{p.stockQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Product;