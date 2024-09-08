import React from 'react';
import { FaListCheck } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom'

function SideBar(){
	const location = useLocation();
	
	const isActive = (path) => location.pathname.startsWith(path);
	return (
		<div className="md:w-64 md-mx:w-[13rem] bg-white border-3 fixed h-full">
			<div className="my-2 mb-4 ml-1">
				<h1 className="text-2xl font-bold text-blue-500">Enigma Laundry</h1>
			</div>
			<hr/>
			<ul className="mt-3 font-bold">
				<li className="text-[17px] pl-2 mb-1"> DASHBOARD </li>
				<li className={`mb-2 rounded py-2  ${isActive('/dashboard') ? 'bg-blue-500 text-white': ''}`}>
					<Link to="/dashboard">
						<FaListCheck className="inline-block w-6 h-6 mr-2 -mt-2 ml-2"></FaListCheck>
						Transaksi
					</Link>	
				</li>
			</ul>
		</div>
	);
}

export default SideBar;