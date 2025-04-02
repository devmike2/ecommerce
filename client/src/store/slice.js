import { create } from 'zustand'
import { createCartCountSlice } from './slice/CartCountSlice'
import { createAuthSlice } from './slice/authSlice'

export const useAppStore = create()((...a) =>({
    ...createCartCountSlice(...a),
    ...createAuthSlice(...a)
}))