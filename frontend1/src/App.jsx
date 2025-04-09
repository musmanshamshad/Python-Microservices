import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import OrderPage from "./OrderPage";
import AddProduct from "./AddProduct";
import SignIn from "./SignIn";

export default function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="space-x-4 mb-4">
          <Link to="/" className="text-blue-500">
            Sign In
          </Link>
          <Link to="/addproduct" className="text-blue-500">
            Products
          </Link>
          <Link to="/orderpage" className="text-blue-500">
            Orders
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/orderpage" element={<OrderPage />} />
        </Routes>
      </div>
    </Router>
  );
}
