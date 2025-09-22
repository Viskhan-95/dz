import { atom } from 'jotai';
import { loadable } from 'jotai/utils';
import { commentAtom } from '../model/comment.state';
import type { Comment } from '../model/comment.state';

// Loadable версия основного атома комментария
export const commentLoadableAtom = loadable(commentAtom);

// Сохранение комментария
export const saveCommentAtom = atom(null, async (get, set, newComment: string) => {
	set(commentAtom, { fullComment: newComment });
});

// Обновление комментария
export const updateCommentAtom = atom(null, async (get, set, fullComment: string) => {
	const comment = { fullComment };
	set(commentAtom, comment);
});
