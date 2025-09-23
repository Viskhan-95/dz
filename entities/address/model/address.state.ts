import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Address = {
	fullAddress: string;
};

// Храним адрес в AsyncStorage под ключом 'user_address'
export const addressAtom = atomWithStorage<Address | null>(
	'user_address',
	null,
	createJSONStorage(() => AsyncStorage),
);
