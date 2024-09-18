import { db } from '@/db';
import { clothes, clothesType } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

export const getAllClothes = cache(async () => {
	const Clothes = await db.select().from(clothes).all();
	return Clothes;
});

export const createClothes = cache(async (clothesObj: any) => {
	try {
		await db.insert(clothes).values(clothesObj);
		return 'success';
	} catch (e) {
		console.log(e);
		return e;
	}
});

export const updateClothes = cache(async (clothesObj: clothesType) => {
	try {
		await db.update(clothes).set(clothesObj).where(eq(clothes.id, clothesObj.id));
		return 'success';
	} catch (e) {
		console.log(e);
		return e;
	}
});

export const deleteClothes = cache(async (id: string) => {
	try {
		await db.delete(clothes).where(eq(clothes.id, id));
	} catch (e) {
		console.log(e);
		return e;
	}
});
