import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Categories from "./pages/Categories";
import AddExpense from "./pages/Expenses/AddExpense";
import Expenses from "./pages/Expenses";
import ExpenseSummary from "./pages/ExpensesSummary";
import ViewAccount from "./pages/account/viewAccount";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        } />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }/>

        <Route path="dashboard/expenses/add" element={<AddExpense/>}/>
        <Route path="dashboard/categories" element={<Categories/>}/>
        <Route path="dashboard/expenses" element={<Expenses/>}/>
        <Route path="/dashboard/expenses/summary" element={<ExpenseSummary/>}/>
        <Route path="/account/view" element={<ViewAccount/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;