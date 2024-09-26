import React, { useEffect } from 'react';
import { Select, SelectItem, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from '@nextui-org/react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { axiosInstance } from '../../lib/axios.js';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod';

const createProductSchema = z.object({
	name: z.string().nonempty('kolom nama tak boleh kosong').min(4, "nama paling sedikit punya 4 karakter"),
	price: z.string().nonempty('kolom harga tak boleh kosong'),
	type: z.string().nonempty('kolom ini harus dipilih')
})
function ModalProductCreate({ isOpen, closeModal }) {
		const dispatch = useDispatch();
		const form = useForm({
			defaultValues: {
				name: "",
				price: "",
				type: "",
			},
			resolver: zodResolver(createProductSchema)
		});
		const satuanBerat = [ "Kg", "Pcs"]
		console.log(satuanBerat)
		function createProduct(data){
			console.log(data);
		}
		
	return (
		<>
			<Modal isOpen={isOpen}>
				<ModalContent>
					<ModalHeader arial-label="daftar pelanggan baru">
						Daftar paket baru
					</ModalHeader>
					<ModalBody className="gap-5 mx-5 mb-2">
						<div>
							<label className="font-semibold">Paket laundry</label>
							<Controller
								name="name"
								control={form.control}
								render={({ field, fieldState }) => (
										<Input {...field} 
										placeholder="contoh: sprei, kemeja"
										isInvalid={Boolean(fieldState.error)}
										errorMessage={fieldState.error?.message}
										/>
									)
								}
							/>
						</div>
						<div>
							<label className="font-semibold">Harga</label>
							<Controller
								name="price"
								control={form.control}
								render={({ field, fieldState }) => (
										<Input {...field} 
										placeholder="isi harga paket"
										isInvalid={Boolean(fieldState.error)}
										errorMessage={fieldState.error?.message}
										/>
									)
								}
							/>
						</div>
						<div className="mb-4">
							<label className="font-semibold">Tipe (berat)</label>
							<Controller
										name="type"
										control={form.control}
										render={({ field, fieldState }) => {
											return <Select {...field}
													placeholder="Pilih satuan"
													className="mb-2"
													isInvalid={Boolean(fieldState.error)}
													errorMessage={fieldState.error?.message}>
													{satuanBerat.map((type, index) => (
														<SelectItem key={type}>{type}</SelectItem>
													))}
													</Select>
										}}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button onPress={closeModal} color="danger">Batal</Button>
						<Button onPress={form.handleSubmit(createProduct)} type="submit" color="primary">submit</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ModalProductCreate ;