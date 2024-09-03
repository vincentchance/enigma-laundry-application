import { Card, Divider, CardHeader, Input, CardBody, Checkbox, CardFooter, Button } from "@nextui-org/react"
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';

const RegisterFormSchema = z.object({
	name: z.string().min(1,"nama tak boleh kosong"),
	email: z.string().email().min(1,"email tak boleh kosong"),
	username: z.string().min(6, "username minimal 6 karakter").min(1,"username tak boleh kosong"),
	password: z.string().min(6, "password minimal 6 karakter").min(1,"password tak boleh kosong"),
	confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
	message: "password dan confirm password tidak sama",
	path: ["confirmPassword"],
});


function RegisterPage () {
	const [showPassword, setShowPassword] = useState(false);
	
	function toggleCheckBoxChange(){
		setShowPassword(!showPassword)
	}
	
	const form = useForm({
		defaultValues: {
			name: "",
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(RegisterFormSchema),
	});
	const navigate = useNavigate();
	
	const registerForm = async (data) => {
		try{
			const { confirmPassword, ...restOfData } = data
			const userData = {...restOfData, role: "employee"}
			const response = await axiosInstance.post("/auth/register", userData);
			toast.success("register success")
			if (response.status === 201) {
				setTimeout(() => {
					navigate("/");
				}, 2000);
			}
		} catch (error){
			console.error(error.message);
			toast.error("register failed")
		}
		
	}
	return (
	<div className="flex items-center justify-center h-screen bg-secondary">
		<Card className="w-[500px]">
			<CardHeader className="flex items-center justify-center font-semibold text-xl">
				Pendaftaran Pegawai Enigma Laundry
			</CardHeader>
			<Divider />
			<CardBody>
			<form onSubmit={form.handleSubmit(registerForm)}>
			<div className="px-10 py-5">
				<div className="mb-3">
					<label className="text-slate-700 text-sm font-bold">
						Nama:
					</label>
					<Controller
						name="name"
						control={form.control}
						render={({ field, fieldState }) => {
						return <Input {...field }
								type="text" 
								placeholder="isikan nama"
								isInvalid={Boolean(fieldState.error)}
								errorMessage={fieldState.error?.message}
								/>
						}}	
					/>
				</div>
				<div className="mb-3">
					<label className="text-slate-700 text-sm font-bold">
						E-mail:
					</label>
					<Controller 
						name="email"
						control={form.control}
						render={({ field, fieldState }) => {
						return <Input {...field }
								type="text" 
								placeholder="isikan email"
								isInvalid={Boolean(fieldState.error)}
								errorMessage={fieldState.error?.message}
								/>
						}}
					/>
				</div>
				<div className="mb-3">
					<label className="text-slate-700 text-sm font-bold">
						Username:
					</label>
					<Controller 
						name="username"
						control={form.control}
						render={({ field, fieldState }) => {
							return <Input {...field }
									type="text"
									placeholder="isikan username"
									isInvalid={Boolean(fieldState.error)}
									errorMessage={fieldState.error?.message}
									/>
						}}
					/>	
				</div>
				<div className="mb-3">
					<div className="flex justify-between">
						<label className="text-slate-700 text-sm font-bold">
						Password:
						</label>
						<Checkbox
						isSelected={showPassword}
						onChange={toggleCheckBoxChange}
						size="sm"
						className="font-semibold"
						>
						tampilkan password
						</Checkbox>
					</div>
					<Controller 
						name="password"
						control={form.control}
						render={({ field, fieldState }) => {
							return <Input {...field }
									type={showPassword ? "text" : "password"} 
									placeholder="Masukan password"
									isInvalid={Boolean(fieldState.error)}
									errorMessage={fieldState.error?.message}
									/>
						}}
					/>
					</div>
					<label className="text-slate-700 text-sm font-bold">
						confirm password:
					</label>
					<Controller 
						name="confirmPassword"
						control={form.control}
						render={({ field, fieldState }) => {
							return <Input {...field }
									type={showPassword ? "text" : "password"} 
									placeholder="Masukan kembali password"
									isInvalid={Boolean(fieldState.error)}
									errorMessage={fieldState.error?.message}
									/>
						}}
					/>
				</div>
				<div className="flex items-center justify-center">
					<Button type="submit" color="primary">
						Daftar
					</Button>
				</div>
				</form>
			</CardBody>
			<CardFooter>
				<Link to="/">
					Kembali ke halaman login
				</Link>
			</CardFooter>
		</Card>
	</div>
	);
}

export default RegisterPage