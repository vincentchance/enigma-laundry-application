import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Select, SelectItem, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from '@nextui-org/react';

const ModalCustomerEdit = ({ isOpen, onOpenChange, closeModal }) => {
	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} >
				<ModalContent>
					<ModalHeader>Edit pelanggan</ModalHeader>
					<ModalBody>
						<label className="font-semibold">Nama pelanggan</label>
						<Input />
						<label className="font-semibold">No telepon</label>
						<Input />
						<label className="font-semibold">Alamat</label>
						<Input />
					</ModalBody>
					<ModalFooter>
					<Button color="primary">Submit</Button>
					<Button onPress={closeModal} color="danger">Batal</Button>
				</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default ModalCustomerEdit;