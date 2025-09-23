import { atom } from 'jotai';
import { loadable, atomFamily } from 'jotai/utils';
import { http } from '../../../shared/http';
import type { Product } from '../model/product.state';
import { selectedTypeAtom, searchTextAtom } from '../model/product.state';
import axios from 'axios';

// Унифицированный тип результата
type LoadableData<T> =
	| { state: 'loading' }
	| { state: 'hasError'; error: unknown }
	| { state: 'hasData'; data: T };

// Триггер для ручного обновления списка товаров (увеличение числа перезапускает загрузку)
const productsRefreshAtom = atom(0);

// Единый запрос к серверу: all / по категории / по поиску / категория+поиск
const serverProductsBaseAtom = atom(async (get) => {
	// зависимость от триггера (перечитывание при ручном рефреше)
	void get(productsRefreshAtom);
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

// Базовый atomFamily: обращается к `coffee-api/id/:id`
export const productByIdBaseAtomFamily = atomFamily((id: number | string) =>
	atom(async () => {
		try {
			const { data } = await http.get<Product>(`id/${id}`, {
				validateStatus: (s) => (s >= 200 && s < 300) || s === 404,
			});
			// Если сервер вернул 404, http.get бросит или вернет undefined в data по настройкам
			return data ?? null;
		} catch (e) {
			if (axios.isAxiosError(e) && e.response?.status === 404) {
				return null;
			}
			throw e;
		}
	}),
);

// Loadable-обертка для удобного использования в UI
export const productByIdLoadableAtom = (id: number | string) =>
	loadable(productByIdBaseAtomFamily(id));

// Экспортируем действие для ручного обновления с UI (pull-to-refresh)
export const refreshProductsAtom = atom(null, (get, set) => {
	const current = get(productsRefreshAtom);
	set(productsRefreshAtom, current + 1);
});

// --- Хук для использования в компонентах ---
export const createUseProductById = (useStore?: Parameters<typeof atom>[0]) => {
	return (id: number | string) => {
		return productByIdLoadableAtom(id);
	};
};
