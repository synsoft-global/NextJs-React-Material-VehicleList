import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { resendOTP, userLogin, userRegister, verifyOTP } from "../actions/auth.action"
import { THUNK_STATUS } from "../constants/status.constant"
import config from '@/config'
import i18n from "@/lib/i18next"
import Cookies from 'js-cookie'
import Router from "next/router"



/* == Initial State == */
const initialState: IAuthState = {
  user: null,
  status: '',
  language: config.defaultLanugage,
  role: null,
  otpVerify:{
    data:[],
    status:''
  },
  resendOTP:{
    data:[],
    status:''
  }
}



/* == Slice == */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
      localStorage.setItem('language', action.payload)
      i18n.changeLanguage(action.payload)
    },

    setUser: (state, action: PayloadAction<User | null>) => {
      if (!action.payload) {
        state.status = ''
        state.user = null
      } else {
        state.status = THUNK_STATUS.SUCCESS
        state.user = action.payload
        state.role = action.payload.roles[0].name
      }
    },

    handleLogout: (state) => {
      state.user = null
      state.status = ''
      state.role = null
      Cookies.remove('token')
      Router.replace('/login')
    }
  },
  extraReducers: (builder) => {

    /* Login */
    builder.addCase(userLogin.pending, (state, action) => {
      state.status = THUNK_STATUS.LOADING
    })

    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.status = THUNK_STATUS.SUCCESS
      state.user = action.payload.data
      state.role = action.payload.data.roles[0].name
      saveUser(action.payload.token)
    })

    builder.addCase(userLogin.rejected, (state, action) => {
      state.status = THUNK_STATUS.FAILED
    })


    /* Register */
    builder.addCase(userRegister.pending, (state, action) => {
      state.status = THUNK_STATUS.LOADING
    })

    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.status = THUNK_STATUS.SUCCESS
    })

    builder.addCase(userRegister.rejected, (state, action) => {
      state.status = THUNK_STATUS.FAILED
    })
    
    
    /* Verify Otp */
    builder.addCase(verifyOTP.pending, (state, action) => {
      state.otpVerify.status = THUNK_STATUS.LOADING
    })
    
    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      state.otpVerify.status = THUNK_STATUS.SUCCESS
      saveUser(action.payload.token)
    })
    
    builder.addCase(verifyOTP.rejected, (state, action) => {
      state.otpVerify.status = THUNK_STATUS.FAILED
    })
    
    /* resend Otp */
    builder.addCase(resendOTP.pending, (state, action) => {
      state.resendOTP.status = THUNK_STATUS.LOADING
    })
    
    builder.addCase(resendOTP.fulfilled, (state, action) => {
      state.resendOTP.status = THUNK_STATUS.SUCCESS
    })
    
    builder.addCase(resendOTP.rejected, (state, action) => {
      state.resendOTP.status = THUNK_STATUS.FAILED
    })

  } 
})


const saveUser = (token: string) => {
  Cookies.set('token', token, { expires: 1 })
  Router.reload()
}


export const { handleLanguage, setUser, handleLogout } = authSlice.actions
export default authSlice.reducer



/* == Interface == */
interface IAuthState {
  user: User | null
  status: Status | ''
  language: string
  role: Roles | null
  otpVerify:{
    data:any
    status:string
  },
  resendOTP:{
    status:string
    data:any
  },

}


export interface User {
  id: number
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
  verificationToken: string | null
  tokenExpiry: string | null
  status: number
  isEmailVerified: boolean
  emailOtp: string | null
  createdBy: number | null
  updatedBy: number | null
  lastLoginAt: string | null
  createdAt: string
  updatedAt: string
  orgOBJ: Iorganization[]
  roles: {
    id: number
    name: Roles
    createdAt: string
    updatedAt: string
    UserRole: {
      userId: number
      roleId: number
      createdBy: number
      updatedBy: number
      createdAt: string
      updatedAt: string
    }
  }[]
}


interface Iorganization{
  id: number
  logoUrl: string | null
  name: string
  address: string
  city: string
  postalCode: string
  themeColor: number
  pageContent_TnC: string
  pageContent_PrivacyPolicy: string
  preferredCurrencies: string[] | null
  status: number
  countryId: number
  stateId: number
  userId: number
  organizationId: number
  createdBy: number
  updatedBy: number
  createdAt: string
  updatedAt: string
}