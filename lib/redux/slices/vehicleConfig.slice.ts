import { createSlice } from "@reduxjs/toolkit"
import { getVehicleCategoryDropDownList, getVehicleCategoryList, getVehicleTypeById, getVehicleTypeDropDownList, getVehicleTypeList, getVehiclesCategoryById, getvehiclesBrandById, getvehiclesBrandDropDownList, getvehiclesBrandList, vehiclesBrandCreate, vehiclesBrandUpdate, vehiclesCategoryCreate, vehiclesCategoryUpdate, vehiclesTypeCreate, vehiclesTypeUpdate } from "../actions/vehicleConfig.action"
import { THUNK_STATUS } from "../constants/status.constant"



/* == Initial State == */
const initialState: IVehicleConfigState = {

  /* vehicles category */
  vehiclesCategory: {
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
    edit: {
      status: '',
      error: null,
      data: {}
    },
    delete: {
      status: '',
      error: null,
    }
  },

  /* vehicles Type */
  vehiclesType: {
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
    edit: {
      status: '',
      error: null,
      data: {}
    },
    delete: {
      status: '',
      error: null,
    }
  },

  /* vehicles Brand */
  vehiclesBrand: {
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
    edit: {
      status: '',
      error: null,
      data: {}
    },
    delete: {
      status: '',
      error: null,
    }
  },
}



/* == Slice == */
const vehicleConfigSlice = createSlice({
  name: 'vehicleConfig',
  initialState,
  reducers: {},
  extraReducers: (builder) => {


    /* == Category == */

    /* Vehicle Category List */
    builder.addCase(getVehicleCategoryList.pending, (state, action) => {
      state.vehiclesCategory.list.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getVehicleCategoryList.fulfilled, (state, action) => {
      state.vehiclesCategory.list.status = THUNK_STATUS.SUCCESS
      state.vehiclesCategory.list.data = action.payload.data
    })
    builder.addCase(getVehicleCategoryList.rejected, (state, action) => {
      state.vehiclesCategory.list.status = THUNK_STATUS.FAILED
    })

    /* Vehicle Category Get item By Id */
    builder.addCase(getVehiclesCategoryById.pending, (state, action) => {
      state.vehiclesCategory.item.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getVehiclesCategoryById.fulfilled, (state, action) => {
      state.vehiclesCategory.item.status = THUNK_STATUS.SUCCESS
      state.vehiclesCategory.item.data = action.payload.data
    })
    builder.addCase(getVehiclesCategoryById.rejected, (state, action) => {
      state.vehiclesCategory.item.status = THUNK_STATUS.FAILED
    })

    /* Vehicle Category Drop Down List */
    builder.addCase(getVehicleCategoryDropDownList.pending, (state, action) => {
      state.vehiclesCategory.dropDownList.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getVehicleCategoryDropDownList.fulfilled, (state, action) => {
      state.vehiclesCategory.dropDownList.status = THUNK_STATUS.SUCCESS
      state.vehiclesCategory.dropDownList.data = action.payload.data
    })
    builder.addCase(getVehicleCategoryDropDownList.rejected, (state, action) => {
      state.vehiclesCategory.dropDownList.status = THUNK_STATUS.FAILED
    })

    /* Vehicle Category Add */
    builder.addCase(vehiclesCategoryCreate.pending, (state, action) => {
      state.vehiclesCategory.add.status = THUNK_STATUS.LOADING
    })
    builder.addCase(vehiclesCategoryCreate.fulfilled, (state, action) => {
      state.vehiclesCategory.add.status = THUNK_STATUS.SUCCESS
    })
    builder.addCase(vehiclesCategoryCreate.rejected, (state, action) => {
      state.vehiclesCategory.add.status = THUNK_STATUS.FAILED
    })

    /* Vehicle Category Update */
    builder.addCase(vehiclesCategoryUpdate.pending, (state, action) => {
      state.vehiclesCategory.edit.status = THUNK_STATUS.LOADING
    })
    builder.addCase(vehiclesCategoryUpdate.fulfilled, (state, action) => {
      state.vehiclesCategory.edit.status = THUNK_STATUS.SUCCESS
      state.vehiclesCategory.edit.data = action.payload
    })
    builder.addCase(vehiclesCategoryUpdate.rejected, (state, action) => {
      state.vehiclesCategory.edit.status = THUNK_STATUS.FAILED
    })



    /* == Type == */

    /* Vehicle Type List*/
    builder.addCase(getVehicleTypeList.pending, (state, action) => {
      state.vehiclesType.list.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getVehicleTypeList.fulfilled, (state, action) => {
      state.vehiclesType.list.status = THUNK_STATUS.SUCCESS
      state.vehiclesType.list.data = action.payload.data
    })
    builder.addCase(getVehicleTypeList.rejected, (state, action) => {
      state.vehiclesType.list.status = THUNK_STATUS.FAILED
    })

    /* Vehicle Type Get item By Id*/
    builder.addCase(getVehicleTypeById.pending, (state, action) => {
      state.vehiclesType.item.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getVehicleTypeById.fulfilled, (state, action) => {
      state.vehiclesType.item.status = THUNK_STATUS.SUCCESS
      state.vehiclesType.item.data = action.payload.data
    })
    builder.addCase(getVehicleTypeById.rejected, (state, action) => {
      state.vehiclesType.item.status = THUNK_STATUS.FAILED
    })


    /* Vehicle Type Drop Down List*/
    builder.addCase(getVehicleTypeDropDownList.pending, (state, action) => {
      state.vehiclesType.dropDownList.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getVehicleTypeDropDownList.fulfilled, (state, action) => {
      state.vehiclesType.dropDownList.status = THUNK_STATUS.SUCCESS
      state.vehiclesType.dropDownList.data = action.payload.data
    })
    builder.addCase(getVehicleTypeDropDownList.rejected, (state, action) => {
      state.vehiclesType.dropDownList.status = THUNK_STATUS.FAILED
    })

    /* Vehicle Type Add */
    builder.addCase(vehiclesTypeCreate.pending, (state, action) => {
      state.vehiclesType.add.status = THUNK_STATUS.LOADING
    })
    builder.addCase(vehiclesTypeCreate.fulfilled, (state, action) => {
      state.vehiclesType.add.status = THUNK_STATUS.SUCCESS
    })
    builder.addCase(vehiclesTypeCreate.rejected, (state, action) => {
      state.vehiclesType.add.status = THUNK_STATUS.FAILED
    })

    /* Vehicle Type Update */
    builder.addCase(vehiclesTypeUpdate.pending, (state, action) => {
      state.vehiclesType.edit.status = THUNK_STATUS.LOADING
    })
    builder.addCase(vehiclesTypeUpdate.fulfilled, (state, action) => {
      state.vehiclesType.edit.status = THUNK_STATUS.SUCCESS
    })
    builder.addCase(vehiclesTypeUpdate.rejected, (state, action) => {
      state.vehiclesType.edit.status = THUNK_STATUS.FAILED
    })


    /* == Brand == */

    /* Vehicle Brand List*/
    builder.addCase(getvehiclesBrandList.pending, (state, action) => {
      state.vehiclesBrand.list.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getvehiclesBrandList.fulfilled, (state, action) => {
      state.vehiclesBrand.list.status = THUNK_STATUS.SUCCESS
      state.vehiclesBrand.list.data = action.payload.data
    })
    builder.addCase(getvehiclesBrandList.rejected, (state, action) => {
      state.vehiclesBrand.list.status = THUNK_STATUS.FAILED
    })

    /* Vehicle Brand Get Item By Id*/
    builder.addCase(getvehiclesBrandById.pending, (state, action) => {
      state.vehiclesBrand.item.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getvehiclesBrandById.fulfilled, (state, action) => {
      state.vehiclesBrand.item.status = THUNK_STATUS.SUCCESS
      state.vehiclesBrand.item.data = action.payload.data
    })
    builder.addCase(getvehiclesBrandById.rejected, (state, action) => {
      state.vehiclesBrand.item.status = THUNK_STATUS.FAILED
    })

    /* Vehicle Brand Drop Down List*/
    builder.addCase(getvehiclesBrandDropDownList.pending, (state, action) => {
      state.vehiclesBrand.dropDownList.status = THUNK_STATUS.LOADING
    })
    builder.addCase(getvehiclesBrandDropDownList.fulfilled, (state, action) => {
      state.vehiclesBrand.dropDownList.status = THUNK_STATUS.SUCCESS
      state.vehiclesBrand.dropDownList.data = action.payload.data
    })
    builder.addCase(getvehiclesBrandDropDownList.rejected, (state, action) => {
      state.vehiclesBrand.dropDownList.status = THUNK_STATUS.FAILED
    })

    /* Vehicle Brand Add */
    builder.addCase(vehiclesBrandCreate.pending, (state, action) => {
      state.vehiclesBrand.add.status = THUNK_STATUS.LOADING
    })
    builder.addCase(vehiclesBrandCreate.fulfilled, (state, action) => {
      state.vehiclesBrand.add.status = THUNK_STATUS.SUCCESS
    })
    builder.addCase(vehiclesBrandCreate.rejected, (state, action) => {
      state.vehiclesBrand.add.status = THUNK_STATUS.FAILED
    })

    /* Vehicle Brand Update */
    builder.addCase(vehiclesBrandUpdate.pending, (state, action) => {
      state.vehiclesBrand.edit.status = THUNK_STATUS.LOADING
    })
    builder.addCase(vehiclesBrandUpdate.fulfilled, (state, action) => {
      state.vehiclesBrand.edit.status = THUNK_STATUS.SUCCESS
    })
    builder.addCase(vehiclesBrandUpdate.rejected, (state, action) => {
      state.vehiclesBrand.edit.status = THUNK_STATUS.FAILED
    })

  }
})


export default vehicleConfigSlice.reducer





/* == Interface == */
interface IVehicleConfigState {
  vehiclesCategory: ApiState,
  vehiclesType: ApiState,
  vehiclesBrand: ApiState,
}