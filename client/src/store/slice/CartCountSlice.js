export const createCartCountSlice = (set) =>({
    cartCount: 0,
    setCartCount: (cartCount) => set({cartCount})
})