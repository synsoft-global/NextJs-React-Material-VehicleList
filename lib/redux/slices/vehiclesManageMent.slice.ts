import { createSlice } from "@reduxjs/toolkit"
import { THUNK_STATUS } from "../constants/status.constant"
import { createVehicles, getVehicleListByOrg, getVehiclesItemById, updateVehicles } from "../actions/vehicleManagement.action"



/* == Initial State == */
const initialState: IAgencyState = {
  list: {
    status: '',
    error: null,
    data: [],
    total: 0
  },
  item: {
    status: '',
    error: null,
    data: [],
  },
  add: {
    status: '',
    error: null,
    data: {}
  },
  edit: {
    status: '',
    error: null,
    data: {}
  },
  delete: {
    status: '',
    error: null,
  }
}



/* == Slice == */
const vehiclesManageMentSlice = createSlice({
  name: 'vehicleManagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    /* Vehicle Add */
    builder.addCase(createVehicles.pending, (state, action) => {
      state.add.status = THUNK_STATUS.LOADING
    })
    builder.addCase(createVehicles.fulfilled, (state, action) => {
      state.add.status = THUNK_STATUS.SUCCESS
    })
    builder.addCase(createVehicles.rejected, (state, action) => {
      state.add.status = THUNK_STATUS.FAILED
    })

    /* Vehicle Update */
    builder.addCase(updateVehicles.pending, (state, action) => {
      state.edit.status = THUNK_STATUS.LOADING
    })
    builder.addCase(updateVehicles.fulfilled, (state, action) => {
      state.edit.status = THUNK_STATUS.SUCCESS
    })
    builder.addCase(updateVehicles.rejected, (state, action) => {
      state.edit.status = THUNK_STATUS.FAILED
    })


    /* Vehicle List */
    builder.addCase(getVehicleListByOrg.pending, (state, action) => {
      state.list.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getVehicleListByOrg.fulfilled, (state, action) => {
      state.list.status = THUNK_STATUS.SUCCESS
      state.list.data = action.payload.data
      state.list.total = action.payload.total
    })
    builder.addCase(getVehicleListByOrg.rejected, (state, action) => {
      state.list.status = THUNK_STATUS.FAILED
    })


    /* Vehicle List Item*/
    builder.addCase(getVehiclesItemById.pending, (state, action) => {
      state.item.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getVehiclesItemById.fulfilled, (state, action) => {
      state.item.status = THUNK_STATUS.SUCCESS
      state.item.data = action.payload.data
    })
    builder.addCase(getVehiclesItemById.rejected, (state, action) => {
      state.item.status = THUNK_STATUS.FAILED
    })

  }
})


export default vehiclesManageMentSlice.reducer



/* == Interface == */
interface IAgencyState {
  list: ApiListState
  item: ApiListState
  add: ApiItemState
  edit: ApiItemState
  delete: ApiDeleteState
}