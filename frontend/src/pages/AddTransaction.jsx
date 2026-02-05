import { useState } from "react";
import API from "../api/api";

function AddTransaction() {
  const [form, setForm] = useState({
    date: "",
    amount: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/transactions", {
      date: form.date,
      amount: Number(form.amount),
      description: form.description,
      category: form.category,
    });
    alert("Transaction added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      <input type="date" name="date" onChange={handleChange} required />
      <input type="number" name="amount" placeholder="Amount" onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" onChange={handleChange} />
      <input type="text" name="category" placeholder="Category" />
      <button>Add</button>
    </form>
  );
}

export default AddTransaction;
