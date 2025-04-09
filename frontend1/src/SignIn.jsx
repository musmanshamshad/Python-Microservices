import { useState } from "react";

export default function AddUser() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleAddUser = async () => {
    const response = await fetch("http://95.217.165.173:5001/adduser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, phone, password }),
    });

    const data = await response.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Add User</h2>
      <input
        type="text"
        placeholder="Username"
        className="border p-2 w-full"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        className="border p-2 w-full"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAddUser} className="bg-blue-500 text-white p-2">
        Add User
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

