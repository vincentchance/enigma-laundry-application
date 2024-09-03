import React from 'react';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import SideBar from '../components/SideBar.jsx';
//import { IsAuth } from '../hoc/checkAuth.jsx';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

function Dashboard() {
	return (
	<>
		<SideBar />
		<div className="ml-64">
				<Navbar />
			<div className="flex bg-white justify-between p-5">
				<h1 className="font-semibold text-2xl">Daftar Transaksi</h1>
				<Button>Tambah transaksi</Button>
			</div>
			<div className="pb-[16rem]">
				<Table aria-label="Example static collection table">
					<TableHeader>
						<TableColumn>Kode Pelanggan</TableColumn>
						<TableColumn>Nama Pelanggan</TableColumn>
						<TableColumn>Tabel Transaksi</TableColumn>
					</TableHeader>
					<TableBody>
						<TableRow key="1">
						<TableCell>Tony Reichert</TableCell>
						<TableCell>CEO</TableCell>
						<TableCell><Button color="primary">Lihat Transaksi</Button></TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
		<Footer />
	</>
	)
}

export default Dashboard;