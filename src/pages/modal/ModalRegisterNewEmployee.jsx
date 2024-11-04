import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NewUserModal from './NewUserModal.jsx';
import { Input, Button, Modal, ModalContent, Checkbox, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { axiosInstance } from '../../lib/axios.js';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';
import { z } from "zod";


const RegisterFormAdminSchema = z.object({
	name: z.string().min(1,"nama tak boleh kosong"),
	email: z.string().email().min(1,"email tak boleh kosong"),
	username: z.string().min(6, "username minimal 6 karakter").min(1,"username tak boleh kosong")
});

const ModalRegisterNewEmployee = ({ isOpen, onOpenChange, closeModal }) => {
	const [ isModalOpen, setIsModalOpen ] = useState(false);
	const token = useSelector((state) => state.auth.authData.token)
	const dispatch = useDispatch();
	const form = useForm({
		defaultValues: {
				name: "",
				email: "",
				username: ""
		},
		resolver: zodResolver(RegisterFormAdminSchema)
	});
	
	const setNewUserData = (newUser) => {
		dispatch({
			type: "SET_USER",
			payload: { newUser },
		})
	}
	
	const newUserData = useSelector((state) => state.newUser.newUser );
	console.log(newUserData)
	const registerEmployee = async (data) => {
		try{
			const headers = {
					Authorization: `Bearer ${token}`
			};
			const userData = { ...data, role: "employee" }
			const response = await axiosInstance.post("/users", userData, { headers });
			if(response.status === 201){
				toast.success("data sedang diproses");
				setIsModalOpen(true)
				setNewUserData(response.data.data);
			}
		}catch (error){
			console.log(error.message);
		}
	}
	
	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader><span className="font-bold text-xl">Daftar Pegawai Baru</span></ModalHeader>
					<ModalBody>
						<div className="mt-2 mb-2">
							<label className="text-slate-700 text-sm font-bold">
								Nama Pegawai:
							</label>
							<Controller 
								name="name"
								control={form.control}
								render={({field, fieldState}) => {
									return <Input {...field}
											type="text"
											placeholder="isikan nama pegawai"
											isInvalid={Boolean(fieldState.error)}
											errorMessage={fieldState.error?.message}
											/>
								}}
							/>
						</div>
						<div className="mt-1 mb-2">
							<label className="text-slate-700 text-sm font-bold">
								Email Pegawai:
							</label>
							<Controller 
								name="email"
								control={form.control}
								render={({field, fieldState}) => {
									return <Input {...field}
											type="text"
											placeholder="isikan email pegawai"
											isInvalid={Boolean(fieldState.error)}
											errorMessage={fieldState.error?.message}
											/>
								}}
							/>
						</div>
						<div className="mb-1 mb-3">
							<label className="text-slate-700 text-sm font-bold">
								Username:
							</label>
							<Controller 
								name="username"
								control={form.control}
								render={({field, fieldState}) => {
									return <Input {...field}
											type="text"
											placeholder="isikan username pegawai"
											isInvalid={Boolean(fieldState.error)}
											errorMessage={fieldState.error?.message}
											/>
								}}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button onPress={form.handleSubmit(registerEmployee)} color="primary">Submit</Button>
						<Button onPress={closeModal} color="danger">Batal</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<NewUserModal openModal={isModalOpen} openChange={setIsModalOpen} closeModal={() => setIsModalOpen(false)}/>
		</>
	)
}


export default ModalRegisterNewEmployee;