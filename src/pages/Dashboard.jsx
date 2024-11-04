import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import SideBar from '../components/SideBar.jsx';
import { NotAuth } from '../hoc/authDataHoc.jsx';
import { axiosInstance } from '../lib/axios.js'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, Input, Select, SelectItem, TableHeader, TableColumn, TableBody, TableRow, TableCell, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod';

const transactionSchema = z.object({
	customerId: z.string().nonempty("Anda belum memilih nama konsumen"),
	productId: z.string().nonempty("Anda belum memilih produk"),
	quantity: z.number().min(1, "jumlah tak boleh kosong")
})
function Dashboard() {
	const dispatch = useDispatch()
	const [showBillDetail, setShowBillDetail] = useState('daftar transaksi');
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [showModal, setShowModal] = useState(false);
	//action
	const setProductData = (products) => {
		dispatch({
			type: "SET_PRODUCT",
			payload: { products },
		})
	}
	const setTransactionData = (transaction) => {
		dispatch({
			type: "SET_TRANSACTIONS",
			payload: { transaction },
		})
	}
	const setCustomerData = (customers) => {
		dispatch({
			type: "SET_CUSTOMERS",
			payload: { customers },
		})
	}
	
	//redux state
	const token = useSelector((state) => state.auth.authData.token);
	const transactions = useSelector((state) => state.bill.transactions)
	const customers = useSelector((state) => state.customer.customers)
	const products = useSelector((state) => state.products.products)
	
	const form = useForm({
		defaultValues: {
			customerId: "",
			productId: "",
			quantity: 0,
		},
		resolver: zodResolver(transactionSchema)
	});
	
	const selectedProduct = form.watch("productId");
	const quantity = form.watch("quantity");
	
	const getTransaction = async () => {
		try {
			const headers = {
			Authorization: `Bearer ${token}`,
			}
			const response = await axiosInstance.get("/bills", { headers })
			const transactions = response.data.data;
			const newCustomerDataTransaction = {};
			//jika tak ada customerId belum ada di newCustomerDataTransaction, tambahkan properti baru
			transactions.forEach((transaction) => {
			const customerId = transaction.customer.id;
			
			if(!newCustomerDataTransaction[customerId]) {
				newCustomerDataTransaction[customerId] = {
					...transaction.customer, //copy semua properti customer 
					
					transactions: [], //tambahkan properti transactions yang akan menampung daftar transaksi
					transactionCount: 0, //tambahkan properti transactionsCount untuk menghitung jumlah transaksi
				};
			}
			//tambahkan transaksi ke dalam transaksi pelanggan
			newCustomerDataTransaction[customerId].transactions.push(transaction)
			//Tingkatkan jumlah transaksi pelanggan
			newCustomerDataTransaction[customerId].transactionCount += 1;
			});
			console.log(newCustomerDataTransaction)
			setTransactionData(newCustomerDataTransaction);
		} catch (error){
			console.log(error.message);
		}			
	};
	const handleSwitchBacktoMain = () => {
		setShowBillDetail('daftar transaksi')
	}

	const handleCustomerDetail = (customerData) => {
		setShowBillDetail('riwayat transaksi');
		setSelectedCustomer(customerData);
	}
	
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('id-ID', {
			year: 'numeric',
			month: '2-digit',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};
	
	const getProducts = async () => {
		try{
			const headers = {
				Authorization: `Bearer ${token}`,
			};
			const response = await axiosInstance.get("/products", { headers });
			console.log(response.data.data)
			setProductData(response.data.data)
		}catch (error) {
			console.log(error.message)
		}
	}
	
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
		
	const closeModal = () => {
		setShowModal(false)
	};
  
	const createTransaction = async (data) => {
		try {
			const headers = {
			Authorization: `Bearer ${token}`
		};
		const requestData = {
			customerId: data.customerId,
				billDetails: [
						{
						product: {
							id: data.productId
						},
						qty: data.quantity
					}
				]
			};
			const response = await axiosInstance.post("/bills", requestData, { headers });
			const newTrans = response.data.data
			if(response.status === 201) {
				setTimeout(() => {
					closeModal()
					location.reload()
				}, 200)
			}
		}catch (error) {
			console.log(error.message)
		}
	}
	
	useEffect(() => {
    getTransaction();
	getProducts();
	getCustomers();
    }, []);
	
	const formatRupiah = (value) => {
        return value.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    };
	
	
	const generateCustomerCode = (index) => {
		const prefix = "LDSF0";
		const baseNumber = 2241;
		return `${prefix}${String(baseNumber + index)}`
	}
	
	return (
	<>
		<SideBar />
		<div className="md-mx:w-full md:ml-64">
				<Navbar />
			{showBillDetail === 'daftar transaksi' ? (
			<>
				<div className="flex bg-white justify-between p-5">
					<h1 className="font-semibold text-2xl">Daftar Transaksi</h1>
					<Button onPress={()=> setShowModal(true)}>Tambah transaksi</Button>
					<Modal isOpen={showModal} onOpenChange={setShowModal}>
						<ModalContent>
						{() => (
						<>
							<ModalHeader className="flex flex-col gap-1">Buat Transaksi Baru</ModalHeader>
							<ModalBody>
									<label className="font-semibold text-sm">
										Nama konsumen
									</label>
									<Controller
										name="customerId"
										control={form.control}
										render={({ field, fieldState }) => {
											return <Select {...field}
													placeholder="Pilih nama konsumen"
													className="mb-2"
													isInvalid={Boolean(fieldState.error)}
													errorMessage={fieldState.error?.message}>
													{customers.map((customer, index) => (
														<SelectItem key={customer.id} value={customer.id}>{customer.name}</SelectItem>
													))}
													</Select>
										}}
									/>
									<label className="font-semibold text-sm">
										Nama paket laundry
									</label>
									<Controller
										name="productId"
										control={form.control}
										render={({ field, fieldState }) => {
											return <Select {...field}
													className="mb-2"
													placeholder="Pilih paket laundry"
													isInvalid={Boolean(fieldState.error)}
													errorMessage={fieldState.error?.message}>
													{products.map((product, index) => (
														<SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
													))}
													</Select>
										}}
									/>
									<label className="font-semibold text-sm">
										Qty (Kg)
									</label>
									<Controller 
										name="quantity"
										control={form.control}
										render={({ field, fieldState }) => {
											return <Input {...field}
														className="mb-2"
														type="number"
														onChange={(e) => field.onChange(e.target.valueAsNumber)}
														isInvalid={Boolean(fieldState.error)}
														errorMessage={fieldState.error?.message}/>
										}}
									/>
									<label className="font-semibold text-sm">
										Total
									</label>
									<Input type="text"
										   className="mb-2"
										   value={formatRupiah(products.find((product) => product.id === selectedProduct)?.price * quantity || 0)} disabled/>
								</ModalBody>
								<ModalFooter>
										<Button type="submit" onPress={form.handleSubmit(createTransaction)}>Buat transaksi</Button>
										<Button color="danger" onPress={closeModal}>Batal</Button>
								</ModalFooter>
							</>
							)}
							</ModalContent>
						</Modal>
					</div>
					<div className="pb-[5rem]">
						<Table aria-label="transaction list table">
							<TableHeader>
								<TableColumn><span className="font-bold text-lg">Kode Pelanggan</span></TableColumn>
								<TableColumn><span className="font-bold text-lg">Nama Pelanggan</span></TableColumn>
								<TableColumn><span className="font-bold text-lg">Tabel Transaksi</span></TableColumn>
							</TableHeader>
							<TableBody>
							{ Object.values(transactions).map((customer, index) => {
								return (
								<TableRow key={index + 1}>
									<TableCell>
										<span className={`${(index + 1) % 2 === 0 ? 'bg-teal-300' : 'bg-red-400'} rounded-2xl p-1 m-1 border-t-1 text-white`}>
											{generateCustomerCode(index)}
										</span>
									</TableCell>
									<TableCell>{customer.name}
										   <br />
										   {customer.transactionCount} transaksi
									</TableCell>
									<TableCell>
										<Button 
										className="bg-slate-600 text-white"
										onClick={() => handleCustomerDetail(customer)}>
										lihat Transaksi
										</Button>
									</TableCell>
								</TableRow>
								)})};
							</TableBody>
						</Table>
					</div>
				</>
				) : (
				<>
					<div className="flex bg-white justify-center p-5">
						<h1 className="font-semibold text-2xl">
							Riwayat transaksi {selectedCustomer?.name}
						</h1>
					</div>
					<div className="pb-[5rem]">
						<Table aria-label="transaction detail table">
							<TableHeader>
								<TableColumn><span className="font-bold text-lg">Kode Transaksi</span></TableColumn>
								<TableColumn><span className="font-bold text-lg">Tanggal Transaksi</span></TableColumn>
								<TableColumn><span className="font-bold text-lg">Paket Laundry</span></TableColumn>
								<TableColumn><span className="font-bold text-lg">Qty</span></TableColumn>
								<TableColumn><span className="font-bold text-lg">Total Bayar</span></TableColumn>
							</TableHeader>
							<TableBody>
							{ selectedCustomer?.transactions.map((transaction, index) => {
								return (
									<TableRow key={index + 1}>
										<TableCell>
											<span className={`${(index + 1) % 2 === 0 ? 'bg-red-400' : 'bg-teal-300' } rounded-2xl p-1 m-1 border-t-1 text-white`}>
												{`TRL-${transaction.id.slice(0,8).match(/\d+/g).join('')}`}
											</span>
										</TableCell>
										<TableCell>{formatDate(transaction.billDate)}</TableCell>
										<TableCell>{transaction.billDetails.map((item) => item.product.name)}</TableCell>
										<TableCell>{`${transaction.billDetails.map((item) => item.qty)} ${transaction.billDetails.map((item) => item.product.type)}`}</TableCell>
										<TableCell>{new Intl.NumberFormat('id-ID', {
												style: 'currency',
												currency: 'IDR',
												minimumFractionDigits: 0,
											}).format(
												transaction.billDetails.reduce((acc, item) => acc + item.price * item.qty, 0)
											)}</TableCell>
									</TableRow>
							)})};
							</TableBody>
						</Table>
						<div className="flex pr-3 pt-3 justify-end">
							<Button onPress={handleSwitchBacktoMain}>Kembali</Button>
						</div>
					</div>
				</>
				) }
			</div>
		<Footer />
	</>
	)
}

export default NotAuth(Dashboard);