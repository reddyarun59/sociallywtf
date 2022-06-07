import { createReducer } from "@reduxjs/toolkit";

const initialState ={
    isAuthenticated: false,
}

export const userReducer=createReducer(initialState,{

    LoginRequest:(state)=>{
        state.loading = true;
    },

    LoginSuccess:(state,action)=>{
        state.loading=false
        state.user=action.payload
        state.isAuthenticated=true
    },

    LoginFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
        state.isAuthenticated=false
    },

    RegisterRequest:(state)=>{
        state.loading=true
    },

    RegisterSuccess:(state,action)=>{
        state.loading=false
        state.user=action.payload
        state.isAuthenticated=true
    },

    RegisterFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload
        state.isAuthenticated=false
    },

    LoadUserRequest:(state)=>{
        state.loading = true;
    },

    LoadUserSuccess:(state,action)=>{
        state.loading=false
        state.user=action.payload;
        //state.protect = true;
        state.isAuthenticated=true;
    },

    LoadUserFailure:(state,action)=>{
        state.loading=false
        state.error=action.payload;
        state.isAuthenticated=false
    }

})

export const postOfFollowingReducer = createReducer(initialState, {
    postOfFollowingRequest: (state) => {
      state.loading = true;
    },
    postOfFollowingSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    postOfFollowingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  });
  