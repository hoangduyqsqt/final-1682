import { createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('user');
        if(serializedState == null) return {user: null};
        return {user: JSON.parse(serializedState)}
    } catch (error) {
        return {user: null}
    }
}

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser : (state, action) => {
            state.user = action.payload.user;
            localStorage.setItem('user', JSON.stringify( state.user))
            localStorage.setItem('authToken', state.token);
        },
        setToken : (state, action) => {
            state.token = action.payload.token;
            localStorage.setItem('authToken', state.token);
        },
        logout : (state) => {
            state.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
        }
    }
})

export const {setUser, setToken, logout} = authSlice.actions;
export default authSlice.reducer;