import { Dispatch, SetStateAction } from "react"


export interface DeletePopupProps{
  deleteItem: number | undefined
  setDeleteItem: Dispatch<SetStateAction<number | undefined>>
  service: any
  onDelete?: any
}