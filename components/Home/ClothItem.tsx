'use client';
import { clothesType } from '@/db/schema';
import {
	Card,
	CardBody,
	CardFooter,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Image,
	useDisclosure,
} from '@nextui-org/react';
import { Edit3Icon, Loader2Icon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import { deleteAction } from './OutfitAction';
import UpdateModal from './UpdateOutfitModal';
import { useState } from 'react';

type Props = {
	item: clothesType;
};

export default function ClothItem({ item }: Props) {
	function handleDeleteCloth(id: string) {
		setLoading(true);
		deleteAction(id);
	}
	const [isLoading, setLoading] = useState(false);
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	return (
		<>
			<Card
				shadow='sm'
				isPressable
				onPress={() => console.log('item pressed')}>
				<CardBody className='overflow-visible p-0 relative'>
					<Image
						shadow='sm'
						radius='lg'
						width='100%'
						alt={item.name}
						className='w-full object-cover h-[140px]'
						src={item.image}
					/>
				</CardBody>
				<CardFooter className='text-small flex-col justify-start items-start gap-2'>
					<div className='flex gap-2 items-start justify-between w-full'>
						<b className='capitalize'>{item.name}</b>
						<Dropdown>
							<DropdownTrigger>
								<div className='w-6 h-6 rounded-full bg-slate-400 flex items-center justify-center'>
									<MoreVerticalIcon size={16} />
								</div>
							</DropdownTrigger>
							<DropdownMenu aria-label='Static Actions'>
								<DropdownItem key='new'>
									<div
										className='flex gap-2 cursor-pointer'
										onClick={onOpen}>
										<Edit3Icon size={16} /> Sửa
									</div>
								</DropdownItem>
								<DropdownItem
									key='delete'
									onClick={() => handleDeleteCloth(item.id)}>
									<div className='flex gap-2 cursor-pointer'>
										<Trash2Icon size={16} />
										Xoá
									</div>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
					<div className='flex gap-2'>
						<p className='text-default-500'>{item.type}</p>
						<div
							className={`w-4 h-4 rounded-full`}
							style={{
								backgroundColor: item.color.toLowerCase(),
							}}></div>
					</div>
				</CardFooter>
			</Card>
			<UpdateModal
				initValue={item}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onClose={onClose}
			/>
		</>
	);
}
