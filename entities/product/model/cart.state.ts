import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CartItem = {
	id: number;
	name: string;
	subTitle: string;
	image: string;
	price: number;
	quantity: number;
	size: string;
};

export type CartState = {
	items: CartItem[];
};

export const cartAtom = atomWithStorage<CartState>(
	'cart_state',
	{ items: [] },
	createJSONStorage(() => AsyncStorage),
);

export const cartItemsCountAtom = atom((get) => {
	const state = get(cartAtom) as CartState | undefined;
	const items = state?.items ?? [];
	return items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
});

export const cartTotalAtom = atom((get) => {
	const state = get(cartAtom) as CartState | undefined;
	const items = state?.items ?? [];
	return items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
});
