import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/lib/redux/store/store'


export const useReduxDispatch: () => AppDispatch = useDispatch
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector