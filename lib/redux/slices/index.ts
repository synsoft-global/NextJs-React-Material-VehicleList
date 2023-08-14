import { combineReducers } from "redux"
import layoutSlice from "./layout.slice"
import authSlice from "./auth.slice"
import localSlice from "./local.slice"
import vehicleConfigSlice from "./vehicleConfig.slice"
import organizationSlice from "./organization.slice"
import agencySlice from "./agency.slice"
import vehiclesManageMentSlice from "./vehiclesManageMent.slice"



const rootReducer = combineReducers({
  layout: layoutSlice,
  auth: authSlice,
  local: localSlice,
  vehicleConfig: vehicleConfigSlice,
  organization: organizationSlice,
  agency:agencySlice,
  vehiclesManageMent:vehiclesManageMentSlice
})

export default rootReducer