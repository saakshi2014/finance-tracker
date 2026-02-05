import AddTransaction from "./pages/AddTransaction";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <div>
      <h1>Personal Finance Tracker</h1>
      <AddTransaction />
      <Transactions />
    </div>
  );
}

export default App;
