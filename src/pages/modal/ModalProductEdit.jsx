import React, { useEffect } from 'react';
import { Select, SelectItem, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { axiosInstance } from "../../lib/axios.js";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';

const editProductSchema = z.object({
	name: z.string().nonempty('kolom nama tak boleh kosong').min(4, "nama minimal 4 karakter"),
	price: z.number().min(5000, "harga minimal dari 5000"),
	type: z.string()
})
const ModalProductEdit = ({ isOpen, onOpenChange, closeModal, product }) => {
	const token = useSelector((state) => state.auth.authData.token)
	const form = useForm({
		defaultValues: {
				name: "",
				price: 5000,
				type: "",
		},
		resolver: zodResolver(editProductSchema)
	})
	
	
	const satuanBerat = [ "Kg", "Pcs"]
	
	const editProduct = async data => {
		try {
			const headers = {
					Authorization: `Bearer ${token}`
			};
			const sender = await axiosInstance.put("/products", data, { headers })
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
		if (product) {
			form.setValue("id", product.id);
			form.setValue("name", product.name);
			form.setValue("price", product.price);
			form.setValue("type", product.type);
		}
	}, [product, form.setValue]);
	
	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader>Edit Produk</ModalHeader>
					<ModalBody className="gap-5 mx-5 mb-2">
						<div>
							<label className="font-semibold">Id Produk:</label>
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
							<label className="font-semibold">Paket laundry:</label>
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
							<label className="font-semibold">Harga:</label>
							<Controller
								name="price"
								control={form.control}
								render={({ field, fieldState }) => (
										<Input {...field} 
										type="number"
										isInvalid={Boolean(fieldState.error)}
										onChange={(e) => field.onChange(e.target.valueAsNumber)}
										errorMessage={fieldState.error?.message}
										/>
									)
								}
							/>
						</div>
						<div>
							<label className="font-semibold">Satuan:</label>
							<Controller
								name="type"
								control={form.control}
								render={({ field, fieldState }) => {
								return <Select {...field}
										isDisabled
										className="mb-2"
										selectedKeys={field.value ? new Set([field.value]) : new Set()}
										isInvalid={Boolean(fieldState.error)}
										errorMessage={fieldState.error?.message}>
										{satuanBerat.map((type, index) => (
											<SelectItem key={type} value={type}>{type}</SelectItem>
										))}
										</Select>				
									}}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
					<Button onPress={form.handleSubmit(editProduct)}color="primary">Submit</Button>
					<Button onPress={closeModal} color="danger">Batal</Button>
				</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ModalProductEdit;