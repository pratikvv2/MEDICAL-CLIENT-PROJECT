import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ivProducts: [],
    numOfProductsAdded: 0,
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProductsToCart: (state, action) => {
            state.ivProducts.push(action.payload)
            state.numOfProductsAdded += 1;
        },
        removeProductsFromCart: (state, action) => {
            state.ivProducts = state.ivProducts.filter(item => item.id != action.payload.id);
            state.numOfProductsAdded -= 1;
        },
        removeSpecificSingleProduct: (state, action) => {
            const index = state.ivProducts.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.ivProducts.splice(index, 1)
            }
        },
        resetCart: (state) => {
            state.ivProducts = [];
            state.numOfProductsAdded = 0;
        }
    }
});

export const { addProductsToCart, removeProductsFromCart, removeSpecificSingleProduct, resetCart } = productsSlice.actions;
export default productsSlice.reducer;


