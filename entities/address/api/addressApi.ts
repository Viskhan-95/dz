import { atom } from 'jotai';
import { loadable } from 'jotai/utils';
import { addressAtom } from '../model/address.state';
import type { Address } from '../model/address.state';

// Loadable версия основного атома адреса
export const addressLoadableAtom = loadable(addressAtom);

// Сохранение адреса
export const saveAddressAtom = atom(null, async (get, set, newAddress: Address) => {
	set(addressAtom, newAddress);
});

// Обновление адреса
export const updateAddressAtom = atom(null, async (get, set, fullAddress: string) => {
	const address = { fullAddress };
	set(addressAtom, address);
});
