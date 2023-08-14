export interface LayoutProps {
  children: React.ReactNode
  title: string
  header?: boolean
  footer?: boolean
  sidebar?: boolean
  user?: boolean | null
}