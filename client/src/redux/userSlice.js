import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem('userID') || 0

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        }
    },
})

export const selectUser = (state) => state.user;
export const { setUser} = userSlice.actions

export default userSlice.reducer
