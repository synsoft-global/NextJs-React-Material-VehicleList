import { createAsyncThunk } from "@reduxjs/toolkit";
import { vehicleManagementService } from "../services/vehicleManagement.service";



export const createVehicles = createAsyncThunk('createVehicles', vehicleManagementService.vehicleManagementCreate)
export const updateVehicles = createAsyncThunk('updateVehicles', vehicleManagementService.vehicleManagementUpdate)
export const getVehiclesItemById = createAsyncThunk('getVehiclesItemById', vehicleManagementService.vehicleManagementItemList)
export const getVehicleListByOrg = createAsyncThunk('getVehicleListByOrg', vehicleManagementService.vehicleManagementListByOrg)
export const deleteVehicles = createAsyncThunk('deleteVehicles', vehicleManagementService.vehicleManagementDelete)
