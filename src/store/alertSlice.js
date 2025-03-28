import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    alertData: {
        type: "",
        message: ""
    },
    isOpen: false,
    isModalOpen: false,
    isOfferModalOpen: false,
}

export const alertSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        setAlertData: (state, action) => {
            state.alertData = action.payload
        },
        setIsOpen: (state, action) => {
            state.isOpen = action.payload
        },
        setIsModalOpen: (state, action) => {
            state.isModalOpen = action.payload
        },
        setIsOfferModalOpen: (state, action) => {
            state.isOfferModalOpen = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAlertData, setIsOpen, setIsModalOpen, setIsOfferModalOpen } = alertSlice.actions

export default alertSlice.reducer