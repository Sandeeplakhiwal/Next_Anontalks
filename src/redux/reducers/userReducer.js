import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const authReducer = createReducer(initialState, {
  signupRequest: (state) => {
    state.loading = true;
  },
  signupSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload.user;
    state.message = action.payload.message;
  },
  signupFailed: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  },

  loginRequest: (state) => {
    state.loading = true;
  },
  loginSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload.user;
    state.message = action.payload.message;
  },
  loginFailed: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = action.payload;
  },

  logoutRequest: (state) => {
    state.loading = true;
  },
  logoutSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
    state.message = action.payload.message;
  },
  logoutFailed: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});
