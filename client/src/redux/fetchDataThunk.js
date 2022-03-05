import {createAsyncThunk} from "@reduxjs/toolkit";

export function createFetchDataThunk(prefix, {startLoading, dataFetched, dataFetchedWithError}, getFromApi) {
    return createAsyncThunk(prefix, async (_, thunkApi) => {
        thunkApi.dispatch(startLoading());
        try {
            const response = await getFromApi();
            console.log(response);
            const {data, error} = response;

            if (data && !error) {
                thunkApi.dispatch(dataFetched(data));
            } else {
                throw new Error('Failed to load data.');
            }
        } catch (error) {
            console.log(error);
            thunkApi.dispatch(dataFetchedWithError());
        }
    });
}
