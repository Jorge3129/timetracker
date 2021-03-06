import {createSlice} from '@reduxjs/toolkit'
import activityAPI from '../utils/activityAPI'
import {createFetchDataThunk} from "./fetchDataThunk";

const initialState = {
    data: [],
    loading: false,
    error: false,
};

export const activitySlice = createSlice({
    name: 'activities',
    initialState: initialState,
    reducers: {
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

export const selectActivities = (state) => state.activities;

export const getActivitiesThunk = createFetchDataThunk('activities/get', activitySlice.actions, activityAPI.get);

export const {startLoading, dataFetched, dataFetchedWithError} = activitySlice.actions

export default activitySlice.reducer
