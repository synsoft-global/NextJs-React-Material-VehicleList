import { createAsyncThunk } from "@reduxjs/toolkit"
import { LoginProps, authService } from "../services/auth.service"


// export const userLogin = createAsyncThunk('userLogin', authService.userLogin)
export const userLogin = createAsyncThunk('userLogin', async (params: LoginProps, { rejectWithValue }) => {
  try {
    const response = await authService.userLogin(params)
    return response
  } catch (error:any) {
    return rejectWithValue(error?.response?.data);
  }
})


export const userRegister = createAsyncThunk('userRegister', authService.userRegister)
export const currentUser = createAsyncThunk('currentUser', authService.currentUser)
export const verifyOTP = createAsyncThunk('verifyOTP', authService.verifyOTP)
export const resendOTP = createAsyncThunk('resendOTP', authService.reSendOtp)