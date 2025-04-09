import { useState, useEffect } from "react";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://95.217.165.173:5002/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setMessage("Error fetching products");
    }
  };

  const handleAddProduct = async () => {
    if (!productName || !quantity) {
      setMessage("Please enter both product name and quantity.");
      return;
    }

    try {
      const response = await fetch("http://95.217.165.173:5002/addproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_name: productName, quantity: quantity }),
      });

      const data = await response.json();
      setMessage(data.message || data.error);

      if (response.ok) {
        setProductName("");
        setQuantity("");
        fetchProducts(); // Refresh product list
      }
    } catch (error) {
      setMessage("Error adding product");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Add Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        className="border p-2 w-full"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        className="border p-2 w-full"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handleAddProduct} className="bg-blue-500 text-white p-2">
        Add Product
      </button>
      {message && <p>{message}</p>}
      
      <h3 className="text-lg font-bold mt-4">Product List</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.product_name} - {product.quantity} pcs (Added on {product.created_at})
          </li>
        ))}
      </ul>
    </div>
  );
}

