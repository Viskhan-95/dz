import { atom } from 'jotai';
import { loadable } from 'jotai/utils';
import { http } from '../../../shared/http';
import { cartAtom } from '../../product/model/cart.state';
import { addressAtom } from '../../address/model/address.state';

export type OrderItem = {
	id: number;
	size: string; // 'S' | 'M' | 'L'
	quantity: number;
};

export type OrderRequest = {
	address: string;
	orderItems: OrderItem[];
};

export type OrderResponse = {
	orderId: number;
	status: 'ok';
};

// Собираем payload заказа из текущих стейтов адреса и корзины
export const orderPayloadAtom = atom<OrderRequest>((get) => {
	const address = get(addressAtom);
	const cart = get(cartAtom);
	const items = (cart?.items ?? [])
		.filter((i) => i.quantity > 0)
		.map<OrderItem>((i) => ({ id: i.id, size: String(i.size ?? 'M'), quantity: i.quantity }));
	return {
		address: address?.fullAddress ?? '',
		orderItems: items,
	};
});

// Отправка заказа. Можно вызывать с кастомным payload либо возьмется из стейта
export const postOrderAtom = atom(null, async (get, _set, payload?: Partial<OrderRequest>) => {
	const base = get(orderPayloadAtom);
	const body: OrderRequest = {
		address: payload?.address ?? base.address,
		orderItems: payload?.orderItems ?? base.orderItems,
	};

	// Важно: эндпоинт зависит от вашего http-клиента. Если базовый url = '/coffee-api', то путь ниже 'order'
	const res = await http.post<OrderResponse>('order', body);
	return res.data;
});

export const orderPayloadLoadableAtom = loadable(orderPayloadAtom);

