import CreateModal from './CreateOutfitModal';
import ClothItem from './ClothItem';
import type { clothesType } from '@/db/schema';

type Props = {
	listCloth: clothesType[];
};

async function ListClothes({ listCloth }: Props) {
	// const list = [
	// 	{
	// 		title: 'Orange',
	// 		img: '/images/fruit-1.jpeg',
	// 		price: '$5.50',
	// 	},
	// 	{
	// 		title: 'Tangerine',
	// 		img: '/images/fruit-2.jpeg',
	// 		price: '$3.00',
	// 	},
	// 	{
	// 		title: 'Raspberry',
	// 		img: '/images/fruit-3.jpeg',
	// 		price: '$10.00',
	// 	},
	// 	{
	// 		title: 'Lemon',
	// 		img: '/images/fruit-4.jpeg',
	// 		price: '$5.30',
	// 	},
	// 	{
	// 		title: 'Avocado',
	// 		img: '/images/fruit-5.jpeg',
	// 		price: '$15.70',
	// 	},
	// 	{
	// 		title: 'Lemon 2',
	// 		img: '/images/fruit-6.jpeg',
	// 		price: '$8.00',
	// 	},
	// 	{
	// 		title: 'Banana',
	// 		img: '/images/fruit-7.jpeg',
	// 		price: '$7.50',
	// 	},
	// 	{
	// 		title: 'Watermelon',
	// 		img: '/images/fruit-8.jpeg',
	// 		price: '$12.20',
	// 	},
	// ];

	return (
		<div className='space-y-4 flex-grow'>
			<CreateModal />
			<div className='gap-4 grid grid-cols-2 sm:grid-cols-4 max-h-[360px] lg:max-h-[680px] overflow-y-auto'>
				{listCloth.map((item) => (
					<ClothItem
						item={item}
						key={item.id}
					/>
				))}
			</div>
		</div>
	);
}
export default ListClothes;
