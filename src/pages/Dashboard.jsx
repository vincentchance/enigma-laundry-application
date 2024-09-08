import React, { useEffect } from 'react';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import SideBar from '../components/SideBar.jsx';
import { NotAuth } from '../hoc/authDataHoc.jsx';
import { axiosInstance } from '../lib/axios.js'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

function Dashboard() {
	const dispatch = useDispatch()
	const token = useSelector((state) => state.auth.authData.token);
	const transactions = useSelector((state) => state.bill.transactions)
	console.log(transactions)
	const setTransactionData = (transaction) => {
		dispatch({
			type: "SET_TRANSACTIONS",
			payload: { transaction },
		})
	}
	const getTransaction = async () => {
		try {
			const headers = {
			Authorization: `Bearer ${token}`,
			}
			const response = await axiosInstance.get("/bills", { headers })
			const transactions = response.data.data;
			console.log(transactions)
			const newCustomerDataTransaction = {};
			//jika tak ada customerId belum ada di newCustomerDataTransaction, tambahkan properti baru
			transactions.forEach((transaction) => {
			const customerId = transaction.customer.id;
			
			if(!newCustomerDataTransaction[customerId]) {
				newCustomerDataTransaction[customerId] = {
					...transaction.customer, //copy semua properti customer 
					//"id": "b32eed7d-052a-4711-bcad-0bc577654883",
					// "name": "Ana Marsyani",
					//"phoneNumber": "7398291200",
					//"address": "Jakarta Barat",
					//"createdAt": "2024-09-08T14:12:22.3146977+07:00",
					//"updatedAt": "2024-09-08T14:12:22.3146977+07:00"
					transactions: [], //tambahkan properti transactions yang akan menampung daftar transaksi
					transactionCount: 0, //tambahkan properti transactionsCount untuk menghitung jumlah transaksi
				};
			}
			//tambahkan transaksi ke dalam transaksi pelanggan
			newCustomerDataTransaction[customerId].transactions.push(transaction)
			//Tingkatkan jumlah transaksi pelanggan
			newCustomerDataTransaction[customerId].transactionCount += 1;
			console.log(`Updated customer ${customerId} with new transaction:`, newCustomerDataTransaction[customerId])
			});
			console.log("Final newCustomerDataTransaction: ", newCustomerDataTransaction);
			setTransactionData(newCustomerDataTransaction);
		} catch (error){
			console.log(error.message);
		}			
	};


	
	/*const getCustomers = async () => {
		try {
			const headers = {
			Authorization: `Bearer ${token}`,
			};
			const response = await axiosInstance.get("/customers", { headers });
			setCustomerData(response.data.data);
		} catch (error) {
			console.log(error.message);
		}
	}*/
	
	useEffect(() => {
    getTransaction();
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
			<div className="flex bg-white justify-between p-5">
				<h1 className="font-semibold text-2xl">Daftar Transaksi</h1>
				<Button>Tambah transaksi</Button>
			</div>
			<div className="pb-[5rem]">
				<Table aria-label="Example static collection table">
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
									<span className={`${(index + 1) % 2 === 0 ? 'bg-blue-400' : 'bg-red-400'} rounded-2xl p-1 m-1 border-t-1 text-white`}>
										{generateCustomerCode(index)}
									</span>
								</TableCell>
								<TableCell>{customer.name}
										   <br />
										   {customer.transactionCount} transaksi
								</TableCell>
								<TableCell><Button className="bg-slate-600 text-white">lihat Transaksi</Button></TableCell>
							</TableRow>
							);
					})}
					</TableBody>
				</Table>
			</div>
		</div>
		<Footer />
	</>
	)
}

export default NotAuth(Dashboard);