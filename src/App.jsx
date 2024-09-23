import LoginPage from './auth/LoginPage';
import Dashboard from './pages/Dashboard.jsx';
import Customers from './pages/Customers.jsx';
import Products from './pages/Products.jsx';
import RegisterPage from './auth/RegisterPage';
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner';

function App() {

  return (
	<>
		<Toaster position="top-center" />
		<Routes>
			<Route element={<LoginPage />} path="/" />
			<Route element={<RegisterPage />} path="/register" />
			<Route element={<Dashboard />} path="/dashboard/:username" />
			<Route element={<Customers />} path="/customer/:username" />
			<Route element={<Products />} path="/product/:username" />
		</Routes>
	</>
  )
}

export default App
