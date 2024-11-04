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
	const [selectedProduct, setSelectedProduct] = useState(null);
	const dispatch = useDispatch()
	const setProductData = (products) => {
		dispatch({
			type: "SET_PRODUCT",
			payload: { products },
		})
	}
	const token = useSelector((state) => state.auth.authData.token);
	const role = useSelector((state) => state.auth.authData.role);
	const products = useSelector((state) => state.products.products);
	const handleEditProduct = (pro) => {
		setSelectedProduct(pro)
		setShowModalEdit(true)
	}
	
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
	
	const deleteProduct = async (id) => {
		try {
			const headers = {
				Authorization: `Bearer ${token}`,
			}
			const result = await axiosInstance.delete(`/products/${id}`, { headers });
			
			if(result.status === 204){
				location.reload()
			}
		} catch (error){
			console.log(error.message)
		} 
	}
	useEffect(() => {
		getProducts()
	}, []);
	
	
	return (
	<>
		<SideBar />
		<div className="md-mx:w-full md:ml-64">
			<Navbar />
			<div className="flex bg-white justify-between p-5">
					<h1 className="font-semibold text-xl">Daftar Transaksi</h1>
					<Button onPress={() => setShowModal(true) } className={ role === "admin" ? "" : "invisible" }>Daftar produk baru</Button>
					<ModalProductCreate isOpen={showModal} onOpenChange={setShowModal} closeModal={() => setShowModal(false)} />
			</div>
			<div className="pb-[5rem]">
				<Table>
					<TableHeader>
						<TableColumn className="md-mx:hidden"><span className="font-bold text-lg">Kode produk</span></TableColumn>
						<TableColumn><span className="font-bold text-lg">Nama paket</span></TableColumn>
						<TableColumn><span className="font-bold text-lg">Harga</span></TableColumn>
						<TableColumn><span className="font-bold text-lg">Type</span></TableColumn>
						<TableColumn><span className="font-bold text-lg">Pengaturan</span></TableColumn>
					</TableHeader>
					<TableBody>
					{ products.map(( product, index) => {
						return (
							<TableRow key={index}>
								<TableCell className="md-mx:hidden">
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
											<DropdownItem onPress={() => handleEditProduct(product)} key="edit">Edit file</DropdownItem> //tambah Modal disini untuk edit
											<DropdownItem 
												onPress={() => {
													const confirmed = window.confirm("Are you sure you want to delete this product?");
													if (confirmed) {
														deleteProduct(product.id);
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
									<ModalProductEdit isOpen={showModalEdit} onOpenChange={setShowModalEdit} closeModal={()=> setShowModalEdit(false)} product={selectedProduct}/>
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