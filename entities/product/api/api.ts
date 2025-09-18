import { atom } from 'jotai';
import { loadable } from 'jotai/utils';
import { http } from '../../../shared/http';
import type { Product } from '../model/product.state';
import { selectedTypeAtom, searchTextAtom } from '../model/product.state';
import axios from 'axios';

// Унифицированный тип результата
type LoadableData<T> =
	| { state: 'loading' }
	| { state: 'hasError'; error: unknown }
	| { state: 'hasData'; data: T };

// Единый запрос к серверу: all / по категории / по поиску / категория+поиск
const serverProductsBaseAtom = atom(async (get) => {
	const type = get(selectedTypeAtom);
	const text = get(searchTextAtom).trim();

	if (text && text.length < 1) return [] as Product[];

	try {
		const { data } = await http.get<Product[]>('', {
			params: {
				...(type && type !== 'all' ? { type } : {}),
				...(text ? { text } : {}),
			},
			validateStatus: (s) => (s >= 200 && s < 300) || s === 404 || s === 204,
		});

		return Array.isArray(data) ? data : [];
	} catch (e) {
		if (axios.isAxiosError(e) && (e.response?.status === 404 || e.response?.status === 204)) {
			return [];
		}
		throw e;
	}
});

export const serverProductsLoadableAtom = loadable(serverProductsBaseAtom);

// Для удобства UI (оставляем один источник данных)
export const visibleProductsLoadableAtom = atom<LoadableData<Product[]>>((get) => {
	const res = get(serverProductsLoadableAtom);
	return res.state !== 'hasData' ? res : { state: 'hasData', data: res.data };
});
