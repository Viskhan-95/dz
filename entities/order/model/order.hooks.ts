import { useAtomValue, useSetAtom } from 'jotai';
import { orderPayloadAtom, orderPayloadLoadableAtom, postOrderAtom } from '../api/orderApi';

export const useOrderPayload = () => useAtomValue(orderPayloadAtom);
export const useOrderPayloadLoadable = () => useAtomValue(orderPayloadLoadableAtom);
export const usePostOrder = () => useSetAtom(postOrderAtom);

