import LoginPage from './auth/LoginPage';
import Dashboard from './pages/Dashboard.jsx';
import Footer from './components/Footer';
import RegisterPage from './auth/RegisterPage';
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner';

function App() {

  return (
	<>
		<Toaster position="top-center" />
		<Routes>
			<Route element={<LoginPage />} path="/" />
			<Route element={<Dashboard />} path="/dashboard/:username" />
			<Route element={<RegisterPage />} path="/register" />
		</Routes>
	</>
  )
}

export default App
