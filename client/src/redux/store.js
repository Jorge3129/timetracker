import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice";
import activityReducer from "./activitySlice";
import taskReducer from "./taskSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        activities: activityReducer,
        tasks: taskReducer,
    },
})
