// entities/address/model/address.hooks.ts
import { useAtomValue, useSetAtom } from 'jotai';
import { commentAtom } from './comment.state';
import { commentLoadableAtom, saveCommentAtom, updateCommentAtom } from '../api/commentApi';

export const useComment = () => useAtomValue(commentAtom);
export const useCommentLoadable = () => useAtomValue(commentLoadableAtom);
export const useSaveComment = () => useSetAtom(saveCommentAtom);
export const useUpdateComment = () => useSetAtom(updateCommentAtom);
