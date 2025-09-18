import { atom } from 'jotai';

export type Product = {
	id: number;
	name: string;
	subTitle: string;
	type: string;
	price: number;
	image: string;
	description: string;
	rating: number;
};

// Параметры фильтра
export const selectedTypeAtom = atom<string | null>(null);
export const searchTextAtom = atom<string>(''); 