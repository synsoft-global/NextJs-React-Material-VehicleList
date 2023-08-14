import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material'

interface childRouter{
  label: string
  href: string
  active?: boolean
}

export interface Route{
  label: string
  href: string
  sidebar?: boolean
  permission: Roles[]
  icon?: OverridableComponent<SvgIconTypeMap> & { muiName: string }
  active?: boolean
  child?: childRouter[]
  sidebarChild?: childRouter[]
}