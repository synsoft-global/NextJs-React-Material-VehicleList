import { createAsyncThunk } from "@reduxjs/toolkit";
import { agencyService } from "../services/agency.service";



export const createAgency = createAsyncThunk('createAgency',agencyService.agencyManagementCreate)
export const updateAgency = createAsyncThunk('updateAgency',agencyService.agencyManagementUpdate)
export const getAgencyListItem= createAsyncThunk('getAgencyListItem', agencyService.agencyManagementListItem)
export const getAgencyListByOrganization = createAsyncThunk('getAgencyListByOrganization', agencyService.agencyManagementListByOrg)
export const getAgencyDropDownList = createAsyncThunk('getAgencyDropDownList', agencyService.agencyManagementDropDownList)
export const deleteAgency = createAsyncThunk('deleteAgency',agencyService.agencyManagementDelete)
