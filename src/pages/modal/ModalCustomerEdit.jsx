import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from '@nextui-org/react';
import { axiosInstance } from "../../lib/axios.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';


const editCustomerSchema = z.object({
	id: z.string(),
	name: z.string().min(5, "nama paling sedikit punya 5 karakter"),
	phoneNumber: z.string().min(8, "no telepon harus punya 8 karakter"),
	address: z.string().min(12, "alamat harus diisi dengan lengkap"),
})

const ModalCustomerEdit = ({ isOpen, onOpenChange, closeModal, customer }) => {
	const token = useSelector((state) => state.auth.authData.token)
	const form = useForm({
		defaultValues: {
				id: "",
				name: "",
				phoneNumber: "",
				address: "",
		},
		resolver: zodResolver(editCustomerSchema)
	})
	
	const editCustomer = async data => {
		try {
			const headers = {
					Authorization: `Bearer ${token}`
			};
			const sender = await axiosInstance.put("/customers", data, { headers })
			if(sender.status === 200){
				setTimeout(() => {
					closeModal()
					location.reload()
				}, 200)
			}
		} catch(error){
			console.log(error.message)
		}
	}
	
	useEffect(() => {
		if (customer) {
			form.setValue("id", customer.id);
			form.setValue("name", customer.name);
			form.setValue("phoneNumber", customer.phoneNumber);
			form.setValue("address", customer.address);
		}
	}, [customer, form.setValue]);
	
	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} >
				<ModalContent>
					<ModalHeader>Edit pelanggan</ModalHeader>
					<ModalBody className="gap-5 mx-5 mb-2">
						<div>
							<label className="font-semibold">Id pelanggan</label>
							<Controller
								name="id"
								control={form.control}
								render={({ field, fieldState }) => (
										<Input {...field}
										isDisabled
										isInvalid={Boolean(fieldState.error)}
										errorMessage={fieldState.error?.message}
										/>
									)
								}
							/>	
						</div>
						<div>
							<label className="font-semibold">Nama pelanggan</label>
							<Controller
								name="name"
								control={form.control}
								render={({ field, fieldState }) => (
										<Input {...field} 
										isInvalid={Boolean(fieldState.error)}
										errorMessage={fieldState.error?.message}
										/>
									)
								}
							/>	
						</div>
						<div>
							<label className="font-semibold">No telepon</label>
							<Controller
								name="phoneNumber"
								control={form.control}
								render={({ field, fieldState }) => (
										<Input {...field} 
										isInvalid={Boolean(fieldState.error)}
										errorMessage={fieldState.error?.message}
										/>
									)
								}
							/>	
						</div>
						<div>
							<label className="font-semibold">Alamat</label>
							<Controller
								name="address"
								control={form.control}
								render={({ field, fieldState }) => (
										<Input {...field} 
										isInvalid={Boolean(fieldState.error)}
										errorMessage={fieldState.error?.message}
										/>
									)
								}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
					<Button onPress={form.handleSubmit(editCustomer)} color="primary">Submit</Button>
					<Button onPress={closeModal} color="danger">Batal</Button>
				</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ModalCustomerEdit;