import { configureStore } from '@reduxjs/toolkit'
import alertSlice from './alertSlice';
import userSlice from './userSlice';
import productsSlice from './productsSlice';

const store = configureStore({
    reducer: {
        alert: alertSlice,
        users: userSlice,
        products: productsSlice
    }
})

export default store;