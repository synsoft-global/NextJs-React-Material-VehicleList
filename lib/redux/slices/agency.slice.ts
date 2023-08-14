import { createSlice } from "@reduxjs/toolkit"
import { THUNK_STATUS } from "../constants/status.constant"
import { createAgency, getAgencyDropDownList, getAgencyListByOrganization, getAgencyListItem, updateAgency } from "../actions/agency.action"



/* == Initial State == */
const initialState: IAgencyState = {
  list: {
    status: '',
    error: null,
    data: []
  },
  dropDownList: {
    status: '',
    error: null,
    data: []
  },
  add: {
    status: '',
    error: null,
    data: {}
  },
  item:{
    status:'',
    error:null,
    data:[],
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
const agencySlice = createSlice({
  name: 'agency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    /* Add */
    builder.addCase(createAgency.pending, (state, action) => {
      state.add.status = THUNK_STATUS.LOADING
    })
    builder.addCase(createAgency.fulfilled, (state, action) => {
      state.add.status = THUNK_STATUS.SUCCESS
    })
    builder.addCase(createAgency.rejected, (state, action) => {
      state.add.status = THUNK_STATUS.FAILED
    })


    /* Update */
    builder.addCase(updateAgency.pending, (state, action) => {
      state.edit.status = THUNK_STATUS.LOADING
    })
    builder.addCase(updateAgency.fulfilled, (state, action) => {
      state.edit.status = THUNK_STATUS.SUCCESS
    })
    builder.addCase(updateAgency.rejected, (state, action) => {
      state.edit.status = THUNK_STATUS.FAILED
    })


    /* List */
    builder.addCase(getAgencyListByOrganization.pending, (state, action) => {
      state.list.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getAgencyListByOrganization.fulfilled, (state, action) => {
      state.list.status = THUNK_STATUS.SUCCESS
      state.list.data = action.payload.data
    })
    builder.addCase(getAgencyListByOrganization.rejected, (state, action) => {
      state.list.status = THUNK_STATUS.FAILED
    })


    /* List Item*/
    builder.addCase(getAgencyListItem.pending, (state, action) => {
      state.item.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getAgencyListItem.fulfilled, (state, action) => {
      state.item.status = THUNK_STATUS.SUCCESS
      state.item.data = action.payload.data
    })
    builder.addCase(getAgencyListItem.rejected, (state, action) => {
      state.item.status = THUNK_STATUS.FAILED
    })


    /* Drop Down List */
    builder.addCase(getAgencyDropDownList.pending, (state, action) => {
      state.dropDownList.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getAgencyDropDownList.fulfilled, (state, action) => {
      state.dropDownList.status = THUNK_STATUS.SUCCESS
      state.dropDownList.data = action.payload.data
    })
    builder.addCase(getAgencyDropDownList.rejected, (state, action) => {
      state.dropDownList.status = THUNK_STATUS.FAILED
    })

  }
})


export default agencySlice.reducer



/* == Interface == */
interface IAgencyState {
  list: ApiListState
  item: ApiListState
  dropDownList: ApiDropDown
  add: ApiItemState
  edit: ApiItemState
  delete: ApiDeleteState
}