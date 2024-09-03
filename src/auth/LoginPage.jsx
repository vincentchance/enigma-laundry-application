import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Card, Divider, CardHeader, Input, CardBody, Checkbox, CardFooter, Button } from "@nextui-org/react"
import { axiosInstance } from "../lib/axios";
//import { useSelector, useDispatch } from "react-redux";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { zodResolver } from "@hookform/resolvers/zod";
import NavbarEnigma from '../components/NavbarEnigma.jsx';

const loginFormSchema = z.object({
	username: z.string().min(3, "username paling sedikit punya 3 karakter").min(1,"username tak boleh kosong"),
	password: z.string().min(8, "password paling sedikit punya 8 karakter").min(1,"password tak boleh kosong"),
})

function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	
	const togglePassword = () => {
    setShowPassword(!showPassword);
	}
	
	
	const form = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
		resolver: zodResolver(loginFormSchema),
	});
	
    
	
	const loginUser = async (data) => {
		try{
			const response = await axiosInstance.post("/auth/login", data);
			const token = response.data.data.token;
			const decoded = jwtDecode(token);
			const combined = { ...decoded, token };
			if(response.data.status.code === 201){
				toast.success("Anda berhasil masuk")
			}else{
				toast.error("Username atau password salah")
			}
			
		} catch(error){
			if(error?.response?.data?.status){
				toast.error("username atau password salah, coba lagi");
			}else {
				toast.error("server sedang perbaikan");
			}
			console.log(error.response);
		}
		
	}
	return (
	<div>
	<NavbarEnigma />
		<div>
			<div className="flex items-center justify-center h-[35rem] bg-secondary">
				<Card className="w-[400px] mt-[-5rem]">
				<CardHeader className="flex items-center justify-center font-bold text-2xl text-primary">
				LOGIN
				</CardHeader>
				<CardHeader className="flex items-center justify-center mb-1">Selamat datang, silahkan login disini</CardHeader>
				<Divider />
				<CardBody  >
					<form onSubmit={form.handleSubmit(loginUser)} className="flex-col pl-10 pr-5">
					<div className="w-[300px] mb-3">
						<label className="text-slate-700 text-sm font-bold">
						Username:
						</label>
						<Controller 
							name="username"
							control={form.control}
							render={({ field, fieldState }) => {
							return <Input {...field} 
									type="text" 
									placeholder="username" 
									isInvalid={Boolean(fieldState.error)}
									errorMessage={fieldState.error?.message}
									/>
							}}
						/>
					</div>
					<div className="mb-2">
						<div className="flex justify-between pr-5">
							<label className="text-slate-700 text-sm font-bold">
							Password:
							</label>
							<div>
							<Checkbox 
							isSelected={showPassword}
							onChange={togglePassword}
							size="sm"
							className="font-semibold">
							show password
							</Checkbox>
							</div>
						</div>
					<Controller 
						name="password"
						control={form.control}
						render={({ field, fieldState }) => {
							return <Input {...field} className="w-[300px]" 
							type={showPassword ? "text" : "password"} 
							placeholder="**********" 
							isInvalid={Boolean(fieldState.error)}
							errorMessage={fieldState.error?.message}
							/>
						}}
					/>
						<div className="flex items-center justify-center mb-2 mt-5">
							<Button type="submit" className="w-[200px]" color="primary" disabled={!form.formState.isValid}>login</Button>
						</div>
					</div>
				</form>
				</CardBody>
				<CardFooter>
				<Link className="underline font-sans text-sm"to="/register">
				Akun belum ada? daftar disini
				</Link>
				</CardFooter>
			</Card>
		</div>
	 </div>
	</div>
  );
}

export default LoginPage;