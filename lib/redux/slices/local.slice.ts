import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getCountry, getCurrency, getState } from "../actions/local.action"
import { THUNK_STATUS } from "../constants/status.constant"



/* == Initial State == */
const initialState: any = {
  country: {
    status: '',
    data: [],
    error: null
  },
  state: {
    status: '',
    data: [],
    error: null
  },
  currency: {
    status: '',
    data: [],
    error: null
  },
}



/* == Slice == */
const localSlice = createSlice({
  name: 'local',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    /* Country */
    builder.addCase(getCountry.pending, (state, action) => {
      state.country.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getCountry.fulfilled, (state, action) => {
      state.country.status = THUNK_STATUS.SUCCESS
      state.country.data = action.payload.data
    })
    builder.addCase(getCountry.rejected, (state, action) => {
      state.country.status = THUNK_STATUS.FAILED
    })


    /* State */
    builder.addCase(getState.pending, (state, action) => {
      state.state.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getState.fulfilled, (state, action) => {
      state.state.status = THUNK_STATUS.SUCCESS
      state.state.data = action.payload.data
    })
    builder.addCase(getState.rejected, (state, action) => {
      state.state.status = THUNK_STATUS.FAILED
    })


    /* Currency */
    builder.addCase(getCurrency.pending, (state, action) => {
      state.currency.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getCurrency.fulfilled, (state, action) => {
      state.currency.status = THUNK_STATUS.SUCCESS
      state.currency.data = action.payload.data
    })
    builder.addCase(getCurrency.rejected, (state, action) => {
      state.currency.status = THUNK_STATUS.FAILED
    })
  }
})


export default localSlice.reducer



/* Interface */
export interface ICountry {
  id: number
  name: string
  phone: number
  sortName: string
}