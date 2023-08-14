import { createSlice, PayloadAction } from '@reduxjs/toolkit'



/* == Initial State == */
const initialState = {
  sidebarWidth: 280,
  sidebarDense: false,
  sidebar: false,
  loading: true
}



/* == Slice == */
export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    handleLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    handleSidebar: (state, action: PayloadAction<{ dense: boolean, sidebar?: boolean } | { dense?: boolean, sidebar: boolean }>) => {
      const { payload: { dense, sidebar } } = action

      if (sidebar !== undefined) state.sidebar = sidebar
      if (dense !== undefined) state.sidebarDense = dense
      localStorage.setItem('sidebarDense', String(state.sidebarDense))

      const sidebarElement: HTMLElement | null = document.querySelector('#sidebar')
      if (!sidebarElement) return
      sidebarElement.style.transition = '0.3s'
      setTimeout(() => sidebarElement.style.transition = 'unset', 300)
    }
  }
})


export const { handleLoader, handleSidebar } = layoutSlice.actions
export default layoutSlice.reducer