import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from '@nextui-org/react';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod';

const editCustomerSchema = z.object({
	name: z.string().min(5, "nama paling sedikit punya 5 karakter"),
	phoneNumber: z.string().min(8, "no telepon harus punya 8 karakter"),
	address: z.string().min(12, "alamat harus diisi dengan lengkap"),
})

const ModalCustomerEdit = ({ isOpen, onOpenChange, closeModal, customer }) => {
	const form = useForm({
		defaultValues: {
				name: "",
				phoneNumber: "",
				address: "",
		},
		resolver: zodResolver(editCustomerSchema)
	})
	
	const editCustomer = (data) => {
		console.log(data)
	}
	
	useEffect(() => {
		if (customer) {
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