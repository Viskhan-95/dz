import { useAtomValue, useSetAtom } from 'jotai';
import { cartAtom, cartItemsCountAtom, cartTotalAtom } from './cart.state';
import {
	addToCartAtom,
	removeFromCartAtom,
	changeQuantityAtom,
	clearCartAtom,
} from '../api/cartApi';

export const useCart = () => useAtomValue(cartAtom);
export const useCartCount = () => useAtomValue(cartItemsCountAtom);
export const useCartTotal = () => useAtomValue(cartTotalAtom);

export const useAddToCart = () => useSetAtom(addToCartAtom);
export const useRemoveFromCart = () => useSetAtom(removeFromCartAtom);
export const useChangeQuantity = () => useSetAtom(changeQuantityAtom);
export const useClearCart = () => useSetAtom(clearCartAtom);
