import React from 'react';
import { useSelector } from 'react-redux';
import { FaListCheck, FaCartShopping } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom'
 
function SideBar(){
	const location = useLocation();
	const authData = useSelector((state) => state.auth.authData)
	
	const isActive = (path) => location.pathname.startsWith(path);
	return (
		<div className="md:w-64 md-mx:w-[13rem] bg-white border-3 fixed h-full">
			<div className="my-2 mb-4 ml-1">
				<h1 className="text-2xl font-bold text-blue-500">Enigma Laundry</h1>
			</div>
			<hr/>
			<ul className="mt-3 font-bold">
				<li className="text-[17px] pl-2 mb-1"> DASHBOARD </li>
				<Link to={`/dashboard/${authData.username}`}>
					<li className={`mb-2 rounded py-2  ${isActive('/dashboard') ? 'bg-blue-500 text-white': ''} hover:bg-blue-500 hover:text-white`}>
						<FaListCheck className="inline-block w-6 h-6 mr-2 -mt-2 ml-2"></FaListCheck>
						Transaksi
					</li>
				</Link>	
				<Link to={`/customer/${authData.username}`}>
					<li className={`mb-2 rounded py-2  ${isActive('/customer') ? 'bg-blue-500 text-white': ''}hover:bg-blue-500 hover:text-white`}>
							<FaUserAlt className="inline-block w-6 h-6 mr-2 -mt-2 ml-2"></FaUserAlt>
							Customer
					</li>
				</Link>	
				<Link to={`/product/${authData.username}`}>
					<li className={`mb-2 rounded py-2  ${isActive('/product') ? 'bg-blue-500 text-white': ''} hover:bg-blue-500 hover:text-white`}>
						<FaCartShopping className="inline-block w-6 h-6 mr-2 -mt-2 ml-2"></FaCartShopping>
						Produk
					</li>
				</Link>	
			</ul>
		</div>
	);
}

export default SideBar;