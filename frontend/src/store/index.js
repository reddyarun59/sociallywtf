import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "../Reducers/User"


export const store=configureStore({
    reducer:{
        user: userReducer
    }
})