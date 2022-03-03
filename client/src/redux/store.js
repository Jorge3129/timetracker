import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice";
import activityReducer from "./activitySlice";

export default configureStore({
    reducer: {
        user: userReducer,
        activities: activityReducer,
    },
})
