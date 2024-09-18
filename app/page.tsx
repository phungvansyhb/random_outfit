import ListClothes from '@/components/Home/ListClothes';
import RandomOutfit from '@/components/Home/RandomOutfit';
import { getAllClothes } from '@/utils/clothesUtil';
import React from 'react';

const page = async () => {
	const listClothes = await getAllClothes();
	return (
		<div className='flex-col flex-col-reverse lg:flex-row flex  gap-4 justify-between container mx-auto lg:border rounded-lg shadow-lg p-2 lg:p-6'>
			<ListClothes listCloth={listClothes} />
			<RandomOutfit listCloth={listClothes} />
		</div>
	);
};

export default page;
