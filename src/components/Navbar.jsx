import React from 'react';
import { FaUserCircle } from "react-icons/fa";
//import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function Navbar(){
	//const dispatch = useDispatch()
	
	return (
		<nav className="flex bg-white px-4 py-4 justify-between">
			<h2 className="text-[17px]">Selamat datang kembali, <span className="font-bold"></span></h2>
			<div className="relative">
				<button className="text-black group">
					<FaUserCircle className="w-6 h-6 mt-1 mr-5" />
					<div className="hidden absolute rounded-lg bg-white text-blue-500 border-1 shadow w-32 group-focus:block top-full right-0 z-40">
						<ul >
							<li className="pt-2 pb-2 hover:bg-blue-200 hover:text-white">
								<Link to="/">Sign out</Link>
							</li>
						</ul>
					</div>
				</button>
			</div>
		</nav>
	);
}

export default Navbar;