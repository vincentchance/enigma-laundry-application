import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

const NewUserModal = ({ openModal, openChange, closeModal }) => {
	const newUserData = useSelector((state) => state.newUser.newUser );
	return (
		<>
			<Modal isOpen={openModal} onOpenChange={openChange}>
				<ModalContent>
					<ModalHeader><span className="font-bold text-xl">User baru</span></ModalHeader>
					<ModalBody>
						{ newUserData && (
							<div className="border-2 pt-5 pl-5">
								<h3 className="font-bold mb-2 ">User baru</h3>
								<p>Username: { newUserData.username }</p>
								<p>Password: { newUserData.password }</p>
							</div>
						)}
					</ModalBody>
					<ModalFooter>
						<Button onPress={() => { location.reload()}} color="primary">Kembali</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default NewUserModal;