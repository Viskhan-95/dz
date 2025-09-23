import { atom } from 'jotai';
import { cartAtom, type CartItem, type CartState } from '../model/cart.state';

export const addToCartAtom = atom(
	null,
	async (get, set, newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
		const { items } = (await get(cartAtom)) as CartState;
		const quantityToAdd = newItem.quantity ?? 1;
		const sizeKey = newItem.size ? String(newItem.size) : 'na';

		const index = items.findIndex(
			(i: CartItem) => i.id === newItem.id && (i.size ? String(i.size) : 'na') === sizeKey,
		);

		if (index >= 0) {
			const updated = [...items];
			updated[index] = { ...updated[index], quantity: updated[index].quantity + quantityToAdd };
			set(cartAtom, { items: updated });
		} else {
			const item: CartItem = {
				id: newItem.id,
				name: newItem.name,
				subTitle: newItem.subTitle,
				image: newItem.image,
				price: newItem.price,
				size: newItem.size,
				quantity: quantityToAdd,
			};
			set(cartAtom, { items: [...items, item] });
		}
	},
);

export const removeFromCartAtom = atom(
	null,
	async (get, set, payload: { id: number; size?: string }) => {
		const { items } = (await get(cartAtom)) as CartState;
		const sizeKey = payload.size ? String(payload.size) : 'na';
		const filtered = items.filter((i: CartItem) => {
			const iSizeKey = i.size ? String(i.size) : 'na';
			return !(i.id === payload.id && iSizeKey === sizeKey);
		});
		set(cartAtom, { items: filtered });
	},
);

export const changeQuantityAtom = atom(
	null,
	async (
		get,
		set,
		payload: { id: number; size?: string; quantity: number; clampToZero?: boolean },
	) => {
		const { items } = (await get(cartAtom)) as CartState;
		const updated = items
			.map((i: CartItem) => {
				const iSizeKey = i.size ? String(i.size) : 'na';
				const payloadKey = payload.size ? String(payload.size) : 'na';
				if (i.id === payload.id && iSizeKey === payloadKey) {
					return { ...i, quantity: payload.quantity };
				}
				return i;
			})
			.filter((i: CartItem) => (payload.clampToZero ? i.quantity > 0 : true));
		set(cartAtom, { items: updated });
	},
);

export const clearCartAtom = atom(null, (_get, set) => {
	set(cartAtom, { items: [] });
});
