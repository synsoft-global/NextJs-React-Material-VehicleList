import { useLayoutEffect, useState } from "react"
import { Box } from "@mui/material"
import { LayoutProps } from "./Layout.interface"
import { useRouter } from "next/router"
import { useTranslation } from "react-i18next"
import { useReduxSelector } from "@/hooks/redux"
import Header from "@/component/_layout/component/header/Header.component"
import Sidebar from "@/component/_layout/component/sidebar/Sidebar.component"
import useElementsVariable from "@/hooks/useElementsVariable"
import Footer from "@/component/_layout/component/footer/Footer.component"
import Head from "next/head"
import PageNotFound from "@/pages/404/component/PageNotFound.component"



export default function Layout(props: LayoutProps) {
  useElementsVariable()
  const router = useRouter()
  const {t} = useTranslation()
  const [permission, setPermission] = useState<Boolean | null>(null)
  const {loading} = useReduxSelector(state => state.layout)
  const currentUser = useReduxSelector(state => state.auth.user)
  const {children, title, header=true, footer=true, sidebar=true, user=true} = props


  useLayoutEffect(() => {
    if(!loading){
      (() => {
        if(currentUser && user == false) return router.push('/')
        if(!currentUser && user) return router.push('/login')
        if(user == null) setPermission(true)
        setPermission(true)
      })()
    }
  }, [loading, router.route])


  if(permission == false) return <PageNotFound/>
  if(loading || permission == null) return <></>
  return <>
    <Head>
      {title && <title>{`${t(title)} - Ostool`}</title>}
    </Head>

    <Box sx={style.root}>
      {header && <Header isSidebar={sidebar}/>}
      <Box sx={style.bodyBox}>
        {sidebar && <Sidebar/>}
        <Box sx={style.container}>
          <Box component='main' sx={{...style.main, py:header && footer ? 3:0}}>
            {children}
          </Box>
          {footer && <Footer/>}
        </Box>
      </Box>
    </Box>
  </>
}



/* == Style == */
const style = {
  root: {height: 1, display: 'flex', flexFlow: 'column', bgcolor: 'common.body', overflow:'hidden'},
  bodyBox: {flexGrow: 1, display: 'flex', flexFlow: 'row', flexWrap: 'nowrap', height:'calc(var(--screen-height) - var(--header-height))'},
  container: {flexGrow: 1, height:1, overflow:'auto', display:'flex', flexFlow:'column'},
  main: {flexGrow:1}
}
