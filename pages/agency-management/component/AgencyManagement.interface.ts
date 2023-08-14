
export interface AgencyManagementFieldProps {
  mode:'add' | 'edit'
  defaultValues?: any
}
/* == Inteface == */
export interface IOperationHours {
  active: boolean
  label: string
  key: string
  startTime: Date | null | any
  endTime: Date | null | any
}