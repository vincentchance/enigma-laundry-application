import React from 'react';
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../lib/axios.js"
import { z } from 'zod';	


const createCustomerSchema = z.object({
	name: z.string().min(5, "nama paling sedikit punya 5 karakter"),
	phoneNumber: z.string().min(8, "no telepon harus punya 8 karakter"),
	address: z.string().min(12, "alamat harus diisi dengan lengkap"),
})

function ModalCustomerCreate({ isOpen, closeModal }) {
		const token = useSelector((state) => state.auth.authData.token)
		console.log(token)
		const form = useForm({
			resolver: zodResolver(createCustomerSchema),
			mode: "onChange"
		});
		
		const createCustomer = async data => {
			try{
				const headers = {
				Authorization: `Bearer ${token}`
				}
				console.log(data)
				const sender = await axiosInstance.post("/customers", data, { headers })
				const response = sender.data.data
				console.log(response)
					if(sender.status === 201) {
						setTimeout(() => {
							closeModal()
							location.reload()
						}, 200)
					}
			}catch (error){
				console.log(error.message)
			}
		}
	
	return (
		<>
			<Modal isOpen={isOpen}>
				<ModalContent>
					<ModalHeader arial-label="daftar pelanggan baru">
						Daftar pelanggan baru
					</ModalHeader>
					<ModalBody className="gap-5 mx-5 mb-2">
						<div>
							<label className="font-semibold">Nama pelanggan</label>
							<Controller
								name="name"
								control={form.control}
								render={({ field, fieldState }) => (
										<Input {...field} 
										placeholder="contoh: abigail, andre"
										isInvalid={Boolean(fieldState.error)}
										errorMessage={fieldState.error?.message}
										/>
									)
								}
							/>
						</div>
						<div>
							<label className="font-semibold">Nomor telepon pelanggan</label>
							<Controller
								name="phoneNumber"
								control={form.control}
								render={({ field, fieldState }) => (
										<Input {...field} 
										placeholder="0812######"
										type="number"
										isInvalid={Boolean(fieldState.error)}
										errorMessage={fieldState.error?.message}
										/>
									)
								}
							/>
						</div>
						<div className="mb-5">
							<label className="font-semibold">Alamat pelanggan</label>
							<Controller
									name="address"
									control={form.control}
									render={({ field, fieldState }) =>  (
										<Input {...field} 
										placeholder="contoh: jalan kampar no 12"
										isInvalid={Boolean(fieldState.error)}
										errorMessage={fieldState.error?.message}
										/>
									)
								}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button onPress={closeModal} color="danger">Batal</Button>
						<Button onPress={form.handleSubmit(createCustomer)} type="submit" color="primary">submit</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}


export default ModalCustomerCreate;