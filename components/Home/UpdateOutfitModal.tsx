'use client';
import { clothesType } from '@/db/schema';
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
} from '@nextui-org/react';
import { ShirtIcon } from 'lucide-react';
import { useState } from 'react';
import { SingleImageDropzone } from '../Upload';
import { updateAction } from './OutfitAction';

type Props = {
	initValue: clothesType;
	isOpen: boolean;
	onOpenChange: () => void;
	onClose: () => void;
};

export default function UpdateModal({ initValue, isOpen, onOpenChange, onClose }: Props) {
	const { edgestore } = useEdgeStore();
	const [fileUrl, setFileUrl] = useState<string | undefined>(initValue.image);
	const [isUploading, setIsUploading] = useState(false);
	const [name, setName] = useState(initValue.name);
	const [type, setType] = useState(initValue.type);
	const [color, setColor] = useState(initValue.color);

	async function handleUpdate() {
		const cloth = {
			id: initValue.id,
			name,
			type,
			color,
			image: fileUrl,
		};

		updateAction(cloth)
			.then(() => {
				onClose();
			})
			.catch((err) => console.log(err));
	}

	return (
		<>
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
									value={name}
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
									selectedKeys={[type]}
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
									selectedKeys={[color]}
									placeholder='Chọn màu chủ đạo'
									onChange={(e) => setColor(e.target.value)}
									className='w-full'>
									{Object.keys(COLOR).map((color) => (
										<SelectItem key={color}>{color}</SelectItem>
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
									onPress={handleUpdate}>
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
