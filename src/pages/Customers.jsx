import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import SideBar from '../components/SideBar.jsx';
import ModalCustomerCreate from './modal/ModalCustomerCreate.jsx';
import ModalCustomerEdit from './modal/ModalCustomerEdit.jsx';
import { axiosInstance } from '../lib/axios.js';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { NotAuth } from '../hoc/authDataHoc.jsx';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/react"

function Customers() {
	const [showModal, setShowModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	function closeModal() {
		setShowModal(false)
	}
	function handleEditModal(customer){
		setShowEditModal(true);
		setSelectedCustomer(customer);
	}
	const dispatch = useDispatch()
	const setCustomerData = (customers) => {
		dispatch({
			type: "SET_CUSTOMERS",
			payload: { customers },
		})
	}
	const customers = useSelector((state) => state.customer.customers)
	const token = useSelector((state) => state.auth.authData.token);
	const role = useSelector((state) => state.auth.authData.role);
	
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
	
	const deleteCustomer = async (id) => {
		try {
			const headers = {
				Authorization: `Bearer ${token}`,
			}
			const result = await axiosInstance.delete(`/customers/${id}`, { headers });
			
			if(result.status === 204){
				location.reload()
			}
		} catch (error){
			console.log(error.message)
		} 
	}
	
	useEffect(() => {
		getCustomers()
	}, [])
	return (
	<>
		<SideBar />
		<div className="md-mx:w-full md:ml-64">
			<Navbar />
			<div className="flex bg-white justify-between p-5">
					<h1 className="font-semibold text-xl">Daftar nama pelanggan</h1>
					<Button onPress={() => setShowModal(true)} className={ role === "admin" ? "" : "invisible"}>Daftar pelanggan baru</Button> {/*buat Modal disini untuk menambahkan pelanggan baru*/}
					<ModalCustomerCreate isOpen={showModal} onOpenChange={setShowModal} closeModal={closeModal} />
			</div>
			<div className="pb-[5rem]">
				<Table>
					<TableHeader>
						<TableColumn className="md-mx:hidden"><span className="font-bold text-lg">Kode pelanggan</span></TableColumn>
						<TableColumn><span className="font-bold text-lg">Nama pelanggan</span></TableColumn>
						<TableColumn><span className="font-bold text-lg">Nomor hp pelanggan</span></TableColumn>
						<TableColumn><span className="font-bold text-lg">Alamat</span></TableColumn>
						<TableColumn><span className="font-bold text-lg">Pengaturan</span></TableColumn>
					</TableHeader>
					<TableBody>
					{customers.map((customer, index) => (
						<TableRow key={index}>
							<TableCell className="md-mx:hidden">
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
												<DropdownItem onPress={() => handleEditModal(customer)} key="edit">Edit file</DropdownItem> //tambah Modal disini untuk edit
												<DropdownItem 
													onPress={() => {
														const confirmed = window.confirm("Are you sure you want to delete this customer?");
														if (confirmed) {
															deleteCustomer(customer.id);
															}
														}} 
													key="delete" 
													className="text-danger" 
													color="danger"
													>	
													Delete file
												</DropdownItem>
											  </DropdownMenu>
											</Dropdown>
											<ModalCustomerEdit isOpen={showEditModal} onOpenChange={setShowEditModal} closeModal={() => setShowEditModal(false)} customer={selectedCustomer} /></TableCell>
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


export default NotAuth(Customers);