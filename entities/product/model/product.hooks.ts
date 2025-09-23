import { useAtomValue } from 'jotai';
import { productByIdLoadableAtom } from '../api/api';

export const useProductByIdLoadable = (id: number | string) => {
	return useAtomValue(productByIdLoadableAtom(id));
};

export default useProductByIdLoadable;
