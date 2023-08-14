import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createOrgainzation, getOrgainzationList, getOrgainzationListItem, updateOrgainzation } from "../actions/organization.action"
import { THUNK_STATUS } from "../constants/status.constant"



/* == Initial State == */
const initialState: IOrganizationState = {
  list: {
    status: '',
    error: null,
    data: []
  },
  item: {
    status: '',
    error: null,
    data: {}
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
const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    /* Add */
    builder.addCase(createOrgainzation.pending, (state, action) => {
      state.add.status = THUNK_STATUS.LOADING
    })
    builder.addCase(createOrgainzation.fulfilled, (state, action) => {
      state.add.status = THUNK_STATUS.SUCCESS
    })
    builder.addCase(createOrgainzation.rejected, (state, action) => {
      state.add.status = THUNK_STATUS.FAILED
    })

    /* Update */
    builder.addCase(updateOrgainzation.pending, (state, action) => {
      state.edit.status = THUNK_STATUS.LOADING
    })
    builder.addCase(updateOrgainzation.fulfilled, (state, action) => {
      state.edit.status = THUNK_STATUS.SUCCESS
    })
    builder.addCase(updateOrgainzation.rejected, (state, action) => {
      state.edit.status = THUNK_STATUS.FAILED
    })


    /* List */
    builder.addCase(getOrgainzationList.pending, (state, action) => {
      state.list.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getOrgainzationList.fulfilled, (state, action) => {
      state.list.status = THUNK_STATUS.SUCCESS
      state.list.data = action.payload.data
    })
    builder.addCase(getOrgainzationList.rejected, (state, action) => {
      state.list.status = THUNK_STATUS.FAILED
    })


    /* Item */ 
    builder.addCase(getOrgainzationListItem.pending, (state, action) => {
      state.item.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getOrgainzationListItem.fulfilled, (state, action) => {
      state.item.status = THUNK_STATUS.SUCCESS
      state.item.data = action.payload.data
    })
    builder.addCase(getOrgainzationListItem.rejected, (state, action) => {
      state.item.status = THUNK_STATUS.FAILED
    })

  }
})


export default organizationSlice.reducer



/* == Interface == */
interface IOrganizationState {
  list: ApiListState
  item: ApiItemState
  add: ApiItemState
  edit: ApiItemState
  delete: ApiDeleteState
}