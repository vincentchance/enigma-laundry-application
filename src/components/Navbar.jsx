import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

function Navbar(){
	const dispatch = useDispatch();
	function logout() {
		toast.success("Logout Success");
		setTimeout(() => {
			dispatch({ type: "LOGOUT"});
		}, 1000)
	};
	const { username } = useParams()
	return (
		<nav className="flex bg-white px-4 py-4 justify-between">
			<h2 className="text-[17px]">Selamat datang, <span className="font-bold">{username}!</span></h2>
			<Dropdown>
				<DropdownTrigger>
					<Avatar>
						<FaUserCircle className="w-6 h-6 mt-1 mr-5" />
					</Avatar>
				</DropdownTrigger>
				<DropdownMenu aria-label="User Actions" variant="flat">
					<DropdownItem key="profile" className="h-10">
						<p className="font-semibold">Signed as {username}</p>
					</DropdownItem>
					<DropdownItem key="logout" color="danger" className="h-7">
						<Link onClick={logout} className="font-semibold">logout</Link>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</nav>
	);
}

export default Navbar;