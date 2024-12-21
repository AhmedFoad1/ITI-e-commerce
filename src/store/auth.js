
import { createSlice } from '@reduxjs/toolkit';

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        currentUser: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.currentUser = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.currentUser = null;
        },
        register: (state, action) => {
            
            state.currentUser = action.payload;
            state.isLoggedIn = true;
        },
    },
});

export default authReducer.reducer; // Store
export const authActions = authReducer.actions; // Actions from the app components
