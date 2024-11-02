import React, { Suspense, lazy } from 'react';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import MemberEmployee from './pages/MemberEmployee.jsx';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Customers = lazy(() => import('./pages/Customers'));
const Products = lazy(() => import('./pages/Products'));

function App() {

  return (
	<>
		<Toaster position="top-center" />
		<Suspense>
			<Routes>
				<Route element={<LoginPage />} path="/" />
				<Route element={<RegisterPage />} path="/register" />
				<Route element={<Dashboard />} path="/dashboard/:username" />
				<Route element={<Customers />} path="/customer/:username" />
				<Route element={<Products />} path="/product/:username" />
				<Route element={<MemberEmployee />} path="/employee/:username" />
			</Routes>
		</Suspense>
	</>
  )
}

export default App
