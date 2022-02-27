import { configureStore } from '@reduxjs/toolkit'
import endReducer from "./endSlice";

export default configureStore({
    reducer: {
        endReducer,
    },
})
