import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import activityAPI from '../utils/activityAPI'

export const getActivities = createAsyncThunk(
    'activities/getActivities',
    async (thunkAPI) => {
        const response = await activityAPI.get();
        return response.data
    }
)

export const activitySlice = createSlice({
    name: 'activities',
    initialState: {entities: [], loading: false},
    reducers: {
        addActivity: (state, action) => {
            return state.entities.push(action.payload);
        }
    },
    extraReducers: {
        [getActivities.pending]: (state) => {
            state.loading = true
        },
        [getActivities.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.entities = payload
        },
        [getActivities.rejected]: (state) => {
            state.loading = false
        },
    },
})

export const selectActivities = (state) => state.activities;
export const {addActivity} = activitySlice.actions

export default activitySlice.reducer
