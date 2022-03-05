import {createSlice} from '@reduxjs/toolkit'
import taskAPI from '../utils/taskAPI'
import {createFetchDataThunk} from "./fetchDataThunk";

const initialState = {
    data: [],
    loading: false,
    error: false,
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTask: (state, action) => {
            return {data: [...state.data, action.payload], ...state};
        },
        startLoading: (state) => {
            state.loading = true;
        },
        dataFetched: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        dataFetchedWithError: (state) => {
            state.loading = false;
            state.data = [];
            state.error = true;
        },
    },
})

export const selectTasks = (state) => state.tasks;

export const getActivitiesThunk = createFetchDataThunk('tasks/get', taskSlice.actions, taskAPI.getTasks);

export const {startLoading, dataFetched, dataFetchedWithError} = taskSlice.actions

export default taskSlice.reducer
