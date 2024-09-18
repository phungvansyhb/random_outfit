'use client';
import { useEdgeStore } from '@/lib/edgestore';
import { CLOTH_TYPE, COLOR } from '@/utils/constant';
import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	useDisclosure,
} from '@nextui-org/react';
import { PlusIcon, ShirtIcon } from 'lucide-react';
import { useState } from 'react';
import { SingleImageDropzone } from '../Upload';
import { createAction } from './OutfitAction';

export default function CreateModal() {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const { edgestore } = useEdgeStore();
	const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
	const [isUploading, setIsUploading] = useState(false);
	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [color, setColor] = useState('');

	async function handleCreate() {
		const cloth = {
			id: Date.now().toString(),
			name,
			type,
			color,
			image: fileUrl,
		};
		createAction(cloth)
			.then(() => {
				onClose();
			})
			.catch((err) => console.log(err));
	}

	return (
		<>
			<Button
				variant='solid'
				onPress={onOpen}
				color='primary'>
				<PlusIcon /> Create cloth
			</Button>
			<Modal
				backdrop='blur'
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				isDismissable={false}
				placement='auto'>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>
								Thêm một đồ mới
							</ModalHeader>
							<ModalBody>
								<Input
									isRequired
									autoFocus
									endContent={
										<ShirtIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
									}
									name='name'
									label='Tên outfit'
									placeholder='Điền tên outfit'
									variant='bordered'
									onChange={(e) => setName(e.target.value)}
								/>
								<Select
									isRequired
									label='Loại outfit'
									placeholder='Chọn loại outfit'
									onChange={(e) => setType(e.target.value)}
									className='w-full'>
									{Object.keys(CLOTH_TYPE).map((type) => (
										<SelectItem key={type}>{type}</SelectItem>
									))}
								</Select>

								<Select
									items={Object.keys(COLOR)}
									isRequired
									label='Màu sắc'
									placeholder='Chọn màu chủ đạo'
									onChange={(e) => setColor(e.target.value)}
									className='w-full'>
									{Object.keys(COLOR).map((color) => (
										<SelectItem key={color}>
											{color}
										</SelectItem>
									))}
								</Select>

								<div className='mx-auto'>
									<SingleImageDropzone
										height={200}
										width={200}
										value={fileUrl}
										disabled={isUploading}
										onChange={async (file) => {
											if (file) {
												const res = await edgestore.publicFiles.upload({
													file: file,
													onProgressChange: (progress) => {
														setIsUploading(progress < 100);
													},
												});
												setFileUrl(res.url);
											}
										}}
									/>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color='danger'
									variant='flat'
									onPress={onClose}>
									Huỷ
								</Button>
								<Button
									color='primary'
									onPress={handleCreate}>
									Thêm vào tủ đồ
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
