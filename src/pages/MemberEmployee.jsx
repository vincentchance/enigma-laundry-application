import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SideBar from '../components/SideBar.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import ModalRegisterNewEmployee from './modal/ModalRegisterNewEmployee.jsx';
import { axiosInstance } from '../lib/axios.js';
import { NotAuth } from '../hoc/authDataHoc.jsx';
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/react";

function MemberEmployee(){
	const dispatch = useDispatch();
	
	
	const token = useSelector((state) => state.auth.authData.token);
	const [showRegisterModal, setShowRegisterModal] = useState(false);
	
	const setEmployeeData = (employees) => {
		dispatch({
			type: "SET_EMPLOYEE",
			payload: { employees },
		})
	}
	const newUserData = useSelector((state) => state.newUser.newUser );
	const employees = useSelector((state) => state.employees.employees);
	console.log(employees);
	const getEmployee = async () => {
		try{
			const headers = {
			Authorization: `Bearer ${token}`,
			};
			const response = await axiosInstance.get("/users", { headers });
			setEmployeeData(response.data.data);
		} catch (error){
			console.log(error.message);
		}
	}
	
	useEffect(() => {
		getEmployee()
	}, [])
	return (
		<>
			<SideBar/>
			<div className="md-mx:ml-52 md:ml-64">
				<Navbar/>
				<div className="flex bg-white justify-between p-5">
					<h1 className="font-semibold text-xl">Manajemen Karyawan</h1>
					<Button onPress={() => setShowRegisterModal(true) }>Daftar karyawan baru</Button>
					<ModalRegisterNewEmployee isOpen={showRegisterModal} onOpenChange={setShowRegisterModal} closeModal={() => setShowRegisterModal(false)} />
				</div>
				<div className="pb-[5rem]">
					<Table>
						<TableHeader>
							<TableColumn><span className="text-lg font-bold">Id Karyawan</span></TableColumn>
							<TableColumn><span className="text-lg font-bold">Nama Karyawan</span></TableColumn>
							<TableColumn><span className="text-lg font-bold">Email</span></TableColumn>
							<TableColumn><span className="text-lg font-bold">Username</span></TableColumn>
							<TableColumn><span className="text-lg font-bold">Pengaturan</span></TableColumn>
						</TableHeader>
						<TableBody>
						{ employees.map((employee, index) => (
							<TableRow key={index}>
								<TableCell><span className={`${(index + 1) % 2 === 0 ? 'bg-teal-400' : 'bg-blue-700' } rounded-2xl p-1 m-1 border-t-1 text-white`}>
								{employee.id.slice(0,8).toUpperCase()}</span></TableCell>
								<TableCell>{employee.name}</TableCell>
								<TableCell>{employee.email}</TableCell>
								<TableCell>{employee.username}</TableCell>
								<TableCell> <Dropdown>
											  <DropdownTrigger>
												<Button  variant="bordered">
												  Open Menu
												</Button>
											  </DropdownTrigger>
											  <DropdownMenu aria-label="Static Actions">
												<DropdownItem key="edit">Edit file</DropdownItem>
												<DropdownItem key="delete" className="text-danger" color="danger">
												  Delete file
												</DropdownItem>
											  </DropdownMenu>
											</Dropdown>
								</TableCell>
							</TableRow>
						))}
						</TableBody>
					</Table>
				</div>
			</div>
			<Footer />
		</>
	);
}


export default NotAuth(MemberEmployee);