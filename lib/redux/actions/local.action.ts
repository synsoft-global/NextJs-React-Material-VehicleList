import { createAsyncThunk } from "@reduxjs/toolkit"
import { localService } from "../services/local.service"


export const getCountry = createAsyncThunk('getCountry', localService.country)
export const getState = createAsyncThunk('getState', localService.state)
export const getCurrency = createAsyncThunk('getCurrency', localService.currency)