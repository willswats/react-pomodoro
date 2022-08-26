import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from 'store';

// Use this instead of useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
