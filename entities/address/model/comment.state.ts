import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Comment = {
	fullComment: string;
};

// Храним комментарий в AsyncStorage под ключом 'user_comment'
export const commentAtom = atomWithStorage<Comment | null>(
	'user_comment',
	null,
	createJSONStorage(() => AsyncStorage),
);
