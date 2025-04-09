import { useState, useEffect } from "react";

const API_BASE_URL = "http://95.217.165.173:5003"; // Flask Order API

export default function OrderPage() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data = await response.json();
    setProducts(data);
  };

  const toggleProductSelection = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleOrder = async () => {
    if (!username || selectedProducts.length === 0) {
      setMessage("Please enter username and select products.");
      return;
    }

    const response = await fetch(`${API_BASE_URL}/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, product_ids: selectedProducts }),
    });

    const data = await response.json();
    setMessage(data.message || data.error);

    if (response.ok) {
      setSelectedProducts([]); // Reset selection
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Order Products</h2>
      <input
        type="text"
        placeholder="Enter your username"
        className="border p-2 w-full"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <h3 className="text-lg font-bold mt-4">Available Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedProducts.includes(product.id)}
              onChange={() => toggleProductSelection(product.id)}
            />
            <span>
              {product.product_name} - {product.quantity} pcs
            </span>
          </li>
        ))}
      </ul>

      <button onClick={handleOrder} className="bg-blue-500 text-white p-2">
        Place Order
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

