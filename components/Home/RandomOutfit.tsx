'use client';
import { clothesType } from '@/db/schema';
import { CLOTH_TYPE } from '@/utils/constant';
import { Card, CardHeader, CardBody, Image, Button } from '@nextui-org/react';
import { DicesIcon } from 'lucide-react';
import { useCallback } from 'react';

type Props = {
	listCloth: clothesType[];
};
export default function RandomOutfit({ listCloth }: Props) {
	const IMAGESIZE = 200;
	const randomItem = useCallback(
		(type: string) => {
			const list = listCloth.filter((item) => item.type === type);
			if (list.length > 0) {
				return list[Math.floor(Math.random() * list.length)];
			} else return null;
		},
		[listCloth]
	);
	return (
		<Card className='py-4 w-full lg:w-1/3'>
			<CardHeader className='pb-0 pt-2 px-4 flex justify-between items-start'>
				<div>
					<p className='text-tiny uppercase font-bold'>Daily Mix</p>
					<small className='text-default-500'>12 Clothes</small>
					<h4 className='font-bold text-large'>Suggest outfit</h4>
				</div>

				<Button
					variant='solid'
					color='primary'>
					<DicesIcon />
					Mix outfit
				</Button>
			</CardHeader>
			<CardBody className='overflow-visible py-2 space-y-4'>
				<div className='flex justify-between border p-4 rounded-lg border-slate-50'>
					<h4 className='font-bold text-large'>Shirt</h4>
					<Image
						alt='Shirt'
						className='object-cover rounded-xl'
						src={randomItem(CLOTH_TYPE.SHIRT)?.image}
						width={IMAGESIZE}
						height={IMAGESIZE}
					/>
				</div>
				<div className='flex justify-between border p-4 rounded-lg border-slate-50'>
					<h4 className='font-bold text-large'>Pant</h4>
					<Image
						alt='pant'
						className='object-cover rounded-xl'
						src={randomItem(CLOTH_TYPE.PANT)?.image}
						width={IMAGESIZE}
						height={IMAGESIZE}
					/>
				</div>
				<div className='flex justify-between border p-4 rounded-lg border-slate-50'>
					<h4 className='font-bold text-large'>Shoes</h4>
					<Image
						alt='Shoes'
						className='object-cover rounded-xl'
						src={randomItem(CLOTH_TYPE.SHOES)?.image}
						width={IMAGESIZE}
						height={IMAGESIZE}
					/>
				</div>
			</CardBody>
		</Card>
	);
}
