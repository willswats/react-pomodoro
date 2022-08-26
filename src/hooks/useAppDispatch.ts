import { useDispatch } from 'react-redux';
import type { AppDispatch } from 'store';

// Use this instead of useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
