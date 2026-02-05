import { useEffect, useState } from "react";
import API from "../api/api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    API.get("/transactions").then(res => setTransactions(res.data));
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map(tx => (
          <li key={tx.id}>
            {tx.date} | ₹{tx.amount} | {tx.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;
