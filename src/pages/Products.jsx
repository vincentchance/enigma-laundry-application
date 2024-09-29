import React,{ useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import SideBar from '../components/SideBar.jsx';
import ModalProductEdit from './modal/ModalProductEdit.jsx';
import { axiosInstance } from '../lib/axios.js';
import ModalProductCreate from './modal/ModalProductCreate.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from '@nextui-org/react';
import { NotAuth } from '../hoc/authDataHoc.jsx';

function Products() {
	const [showModalEdit, setShowModalEdit] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch()
	const setProductData = (products) => {
		dispatch({
			type: "SET_PRODUCT",
			payload: { products },
		})
	}
	const token = useSelector((state) => state.auth.authData.token);
	const products = useSelector((state) => state.products.products);
	console.log(products)
	
	
	const getProducts = async () => {
		try{
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			const response = await axiosInstance.get("/products", { headers });
			setProductData(response.data.data)
		}catch (error) {
			console.log(error.message)
		}
	}
	useEffect(() => {
		getProducts()
	}, []);
	
	
	return (
	<>
		<SideBar />
		<div className="md-mx:ml-52 md:ml-64">
			<Navbar />
			<div className="flex bg-white justify-between p-5">
					<h1 className="font-semibold text-xl">Daftar Transaksi</h1>
					<Button onPress={() => setShowModal(true)}>Daftar produk baru</Button>
					<ModalProductCreate isOpen={showModal} onOpenChange={setShowModal} closeModal={() => setShowModal(false)} />
			</div>
			<div className="pb-[5rem]">
				<Table>
					<TableHeader>
						<TableColumn>Kode produk</TableColumn>
						<TableColumn>Nama paket</TableColumn>
						<TableColumn>Harga</TableColumn>
						<TableColumn>Type</TableColumn>
						<TableColumn>Pengaturan</TableColumn>
					</TableHeader>
					<TableBody>
					{ products.map(( product, index) => {
						return (
							<TableRow key={index}>
								<TableCell>
								<span className={`${(index + 1) % 2 === 0 ? 'bg-green-400' : 'bg-blue-700' } rounded-2xl p-1 m-1 border-t-1 text-white`}>
									{product.id.slice(0, 8).toUpperCase()}
								</span>
								</TableCell>
								<TableCell>{product.name}</TableCell>
								<TableCell>{product.price}</TableCell>
								<TableCell>{product.type}</TableCell>
								<TableCell>
								<Dropdown>
									<DropdownTrigger>
										<Button 
											variant="bordered" 
											>
											Open Menu
										</Button>
									</DropdownTrigger>
										<DropdownMenu aria-label="Static Actions">
											<DropdownItem onPress={() => setShowModalEdit(true)} key="edit">Edit file</DropdownItem> //tambah Modal disini untuk edit
											<DropdownItem key="delete" className="text-danger" color="danger">
												  Delete file
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
									<ModalProductEdit isOpen={showModalEdit} onOpenChange={setShowModalEdit} closeModal={()=> setShowModalEdit(false)}/>
								</TableCell>
							</TableRow>
						)
					})}	
					</TableBody>
				</Table>
			</div>
		</div>
		<Footer />
	</>
	)
}


export default NotAuth(Products);