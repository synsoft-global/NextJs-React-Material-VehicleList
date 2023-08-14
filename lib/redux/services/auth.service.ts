import axios from "axios"
import config from "@/config"


export interface LoginProps {
  email: string,
  password: string
}

const userLogin = async (params: LoginProps) => {
  return await axios.post('/auth/login', params)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}


const userRegister = async (params: any) => {
  return await axios.post('/auth/register', params)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

const currentUser = async (token: string) => {
  return await fetch(config.apiBaseUrl + '/shared/loggedInUser', { headers: { Authorization: `Bearer ${token}` } })
    .then(response => response.json())
    .catch(error => Promise.reject(error))
}

const verifyOTP = async (params: any) => {
  return await axios.post('/auth/verifyotp', params)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}

const reSendOtp = async (params: any) => {
  return await axios.post('/auth/resendOtp', params)
    .then(response => response.data)
    .catch(error => Promise.reject(error))
}


export const authService = {
  userLogin,
  userRegister,
  currentUser,
  verifyOTP,
  reSendOtp,
}