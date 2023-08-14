type Roles = 'businessOwner' | 'superAdmin'
type Status = 'loading' | 'success' | 'failed' | ''

type Country = {
  id: number,
  sortName: string,
  name: string,
  phoneCode: string,
}

type ApiListState = {
  status: Status
  error?: any
  data: any[]
  total?: number
}

type ApiDropDown = {
  status: Status
  error?: any
  data: any[]
}

type ApiItemState = {
  status: Status
  error?: any
  data: {}
}

type ApiDeleteState = {
  status: Status
  error?: any
  data?: any[]
}


/* == Stat-Type == */
type ApiState = {
  list: ApiListState
  dropDownList: ApiDropDown
  item: ApiItemState
  add: ApiItemState
  edit: ApiItemState
  delete: ApiDeleteState
}
