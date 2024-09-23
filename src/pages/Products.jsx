import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import SideBar from '../components/SideBar.jsx';
import { axiosInstance } from '../lib/axios.js';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

function Products() {
	return (
	<>
		<SideBar />
		<div className="md-mx:ml-52 md:ml-64">
			<Navbar />
			<div className="flex bg-white justify-between p-5">
					<h1 className="font-semibold text-2xl">Daftar Transaksi</h1>
					<Button>Daftar produk baru</Button>
			</div>
			<div className="pb-[5rem]">
				<Table>
					<TableHeader>
						<TableColumn>Kode produk</TableColumn>
						<TableColumn></TableColumn>
						<TableColumn></TableColumn>
						<TableColumn></TableColumn>
						<TableColumn></TableColumn>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
		<Footer />
	</>
	)
}


export default Products;