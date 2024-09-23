import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import SideBar from '../components/SideBar.jsx';
import { axiosInstance } from '../lib/axios.js';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/react"

function Customers() {
	const dispatch = useDispatch()
	const setCustomerData = (customers) => {
		dispatch({
			type: "SET_CUSTOMERS",
			payload: { customers },
		})
	}
	const customers = useSelector((state) => state.customer.customers)
	const token = useSelector((state) => state.auth.authData.token);
	console.log(customers)
	
	const getCustomers = async () => {
		try {
			const headers = {
			Authorization: `Bearer ${token}`,
			};
			const response = await axiosInstance.get("/customers", { headers });
			setCustomerData(response.data.data);
		} catch (error) {
			console.log(error.message);
		}
	}
	
	useEffect(() => {
		getCustomers()
	}, [])
	return (
	<>
		<SideBar />
		<div className="md-mx:ml-52 md:ml-64">
			<Navbar />
			<div className="flex bg-white justify-between p-5">
					<h1 className="font-semibold text-2xl">Daftar nama pelanggan</h1>
					<Button>Daftar pelanggan baru</Button>
			</div>
			<div className="pb-[5rem]">
				<Table>
					<TableHeader>
						<TableColumn>Kode pelanggan</TableColumn>
						<TableColumn>Nama pelanggan</TableColumn>
						<TableColumn>Nomor hp pelanggan</TableColumn>
						<TableColumn>Alamat</TableColumn>
						<TableColumn>pengaturan</TableColumn>
					</TableHeader>
					<TableBody>
					{customers.map((customer, index) => (
						<TableRow key={index}>
							<TableCell>
								<span className={`${(index + 1) % 2 === 0 ? 'bg-red-400' : 'bg-teal-300' } rounded-2xl p-1 m-1 border-t-1 text-white`}>
									{customer.id.slice(0,8).toUpperCase()}
								</span>
							</TableCell>
							<TableCell>{customer.name}</TableCell>
							<TableCell>{customer.phoneNumber}</TableCell>
							<TableCell>{customer.address}</TableCell>
							<TableCell><Dropdown>
										<DropdownTrigger>
											<Button 
												variant="bordered" 
												>
												Open Menu
											</Button>
										</DropdownTrigger>
											<DropdownMenu aria-label="Static Actions">
												<DropdownItem key="edit">Edit file</DropdownItem>
												<DropdownItem key="delete" className="text-danger" color="danger">
												  Delete file
												</DropdownItem>
											  </DropdownMenu>
											</Dropdown></TableCell>
						</TableRow>
					))}
						
					</TableBody>
				</Table>
			</div>
		</div>
		<Footer />
	</>
	)
}


export default Customers;