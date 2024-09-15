import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import SideBar from '../components/SideBar.jsx';
import { NotAuth } from '../hoc/authDataHoc.jsx';
import { axiosInstance } from '../lib/axios.js'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, Select, SelectItem, TableHeader, TableColumn, TableBody, TableRow, TableCell, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod';

const transactionSchema = z.object({
	customerId: z.string().nonempty("Anda belum memilih nama konsumen"),
	productId: z.string().nonempty("Anda belum memilih produk"),
	quantity: z.number().min(1, "jumlah tak boleh kosong")
})
function Dashboard() {
	const {isOpen, onOpen, onOpenChange} = useDisclosure();
	const dispatch = useDispatch()
	const [showBillDetail, setShowBillDetail] = useState('daftar transaksi');
	const [selectedCustomer, setSelectedCustomer] = useState(null);
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
	
	useEffect(() => {
    getTransaction();
	getProducts();
	getCustomers();
    }, []);
	
	
	const generateCustomerCode = (index) => {
		const prefix = "LDSF0";
		const baseNumber = 2241;
		return `${prefix}${String(baseNumber + index)}`
	}
	
	return (
	<>
		<SideBar />
		<div className="md-mx:ml-52 md:ml-64">
				<Navbar />
			{showBillDetail === 'daftar transaksi' ? (
			<>
				<div className="flex bg-white justify-between p-5">
					<h1 className="font-semibold text-2xl">Daftar Transaksi</h1>
					<Button onPress={onOpen}>Tambah transaksi</Button>
					<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
						<ModalContent>
						{(onClose) => (
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
												placeholder="Pilih konsumen"
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
									Nama produk
								</label>
								<Controller
									name="productId"
									control={form.control}
									render={({ field, fieldState }) => {
										return <Select {...field}
												placeholder="Pilih produk"
												isInvalid={Boolean(fieldState.error)}
												errorMessage={fieldState.error?.message}>
												{products.map((product, index) => (
													<SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
												))}
												</Select>
									}}
								/>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
								Close
								</Button>
								<Button color="primary" onPress={onClose}>
								Action
								</Button>
							</ModalFooter>
						</>
						)}
						</ModalContent>
					</Modal>
				</div>
				<div className="pb-[5rem]">
					<Table aria-label="transaction list table">
						<TableHeader>
							<TableColumn>Kode Pelanggan</TableColumn>
							<TableColumn>Nama Pelanggan</TableColumn>
							<TableColumn>Tabel Transaksi</TableColumn>
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
							<TableColumn>Kode Transaksi</TableColumn>
							<TableColumn>Tanggal Transaksi</TableColumn>
							<TableColumn>Paket Laundry</TableColumn>
							<TableColumn>Qty</TableColumn>
							<TableColumn>Total Bayar</TableColumn>
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
						<Button onClick={handleSwitchBacktoMain}>Kembali</Button>
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