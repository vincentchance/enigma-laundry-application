import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function Navbar(){
	const navigate = useNavigate();
	const dispatch = useDispatch();
	function logout() {
		toast.success("Logout Success");
		setTimeout(() => {
			dispatch({ type: "LOGOUT"});
		}, 1000)
	};
	const { username } = useParams()
	const authData = useSelector((state) => state.auth.authData);
	return (
		<nav className="flex bg-white px-4 py-4 justify-between">
			<h2 className="text-[17px]">Selamat datang, <span className="font-bold">{username}!</span></h2>
			<Dropdown>
				<DropdownTrigger>
					<Avatar>
					</Avatar>
				</DropdownTrigger>
				<DropdownMenu aria-label="User Actions" variant="flat">
					<DropdownItem key="profile" className="h-10">
						<p className="font-semibold">Signed as {username}</p>
					</DropdownItem>
					<DropdownItem onPress={() => {
						navigate(`/dashboard/${authData.username}`)
					}} key="transaksi" color="primary" className="md:hidden h-7">
						<p className="font-semibold text-blue-700">Transaksi</p>
					</DropdownItem>
					<DropdownItem onPress={() => {
						navigate(`/customer/${authData.username}`)
					}} key="pelanggan" color="primary" className="md:hidden h-7">
						<p className="font-semibold text-blue-700">Customer</p>
					</DropdownItem>
					<DropdownItem onPress={() => {
						navigate(`/product/${authData.username}`)
					}} key="produk" color="primary" className="md:hidden h-7">
						<p className="font-semibold text-blue-700">Produk</p>
					</DropdownItem>
					<DropdownItem onPress={logout} key="logout" color="danger" className=" h-7">
						<p className="font-semibold text-red-700">Log out</p>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</nav>
	);
}

export default Navbar;