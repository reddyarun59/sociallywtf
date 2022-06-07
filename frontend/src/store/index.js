import { configureStore } from "@reduxjs/toolkit"
import { postOfFollowingReducer, userReducer } from "../Reducers/User"


export const store=configureStore({
    reducer:{
        user: userReducer,
        postOfFollowing:postOfFollowingReducer
    }
})