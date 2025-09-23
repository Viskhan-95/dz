// entities/address/model/address.hooks.ts
import { useAtomValue, useSetAtom } from 'jotai';
import { addressAtom } from './address.state'; // импорт из model
import { addressLoadableAtom, saveAddressAtom, updateAddressAtom } from '../api/addressApi';

export const useAddress = () => useAtomValue(addressAtom);
export const useAddressLoadable = () => useAtomValue(addressLoadableAtom);
export const useSaveAddress = () => useSetAtom(saveAddressAtom);
export const useUpdateAddress = () => useSetAtom(updateAddressAtom);
