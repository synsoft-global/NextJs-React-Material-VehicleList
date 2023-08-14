import { createAsyncThunk } from "@reduxjs/toolkit"
import { organizationService } from "../services/organization.service"


export const createOrgainzation = createAsyncThunk('createOrgainzation', organizationService.create)
export const updateOrgainzation = createAsyncThunk('updateOrgainzation', organizationService.update)
export const getOrgainzationList = createAsyncThunk('getOrgainzationList', organizationService.list)
export const getOrgainzationListItem = createAsyncThunk('getOrgainzationListItem', organizationService.item)
export const deleteOrgainzation = createAsyncThunk('deleteOrgainzation', organizationService.deleteOrg)