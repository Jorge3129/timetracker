import { createSlice } from '@reduxjs/toolkit'
import dayjs from "dayjs";

export const endSlice = createSlice({
    name: 'counter',
    initialState: {
        end: dayjs(),
    },
    reducers: {
        setEndRed: (state, action) => {
            return state.end.add(action.payload);
        },
    },
})

export const { setEndRed } = endSlice.actions;

export const selectEnd = (state) => state.counter.end

export default endSlice.reducer;
