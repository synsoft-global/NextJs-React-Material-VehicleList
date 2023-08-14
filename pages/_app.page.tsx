import { useEffect, ReactElement, ReactNode } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Toaster } from 'react-hot-toast'
import { CssBaseline } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useTranslation } from 'react-i18next'
import { handleError, handleResponse } from '@/utils'
import { Provider } from 'react-redux'
import { store } from '@/lib/redux/store/store'
import { useReduxDispatch } from '@/hooks/redux'
import { handleLanguage, setUser } from '@/lib/redux/slices/auth.slice'
import { handleLoader } from '@/lib/redux/slices/layout.slice'
import { authService } from '@/lib/redux/services/auth.service'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import theme from '@/utils/theme'
import CssVariables from '@/component/cssVariables/CssVariables.component'
import WebsiteLoader from '@/component/websiteLoader/WebsiteLoader.component'
import Head from 'next/head'
import axios from 'axios'
import config from '@/config'
import Cookies from 'js-cookie'
import '@/public/styles/global.css'
import '@/lib/i18next'
import '@/lib/yub/config'



function App({ Component, pageProps, user }: Props) {
  const {t} = useTranslation()
  const dispatch = useReduxDispatch()
  const getLayout = Component.getLayout ?? ((page) => page)


  useEffect(() => {
    dispatch(setUser(user))
    const language = localStorage.getItem('language')
    language && dispatch(handleLanguage(language))
    setTimeout(() => dispatch(handleLoader(false) ), 500)
  }, [])
  

  return <>
    <Head>
      <title>{t('title')}</title>
      <link rel='icon' href={config.basePath + '/images/favicon.png'}></link>
    </Head>
    
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <CssVariables/>
        <CssBaseline/>
        <Toaster position='bottom-right'/>
        <WebsiteLoader/>
        {getLayout( <Component {...pageProps} /> )}
      </LocalizationProvider>
    </ThemeProvider>
  </>
}



/* == Redux Store Provide == */
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type Props = AppProps & {
  Component: NextPageWithLayout
  user: any
}


export default function AppRoot(props: Props) {
  return (
    <Provider store={store}>
      <App {...props}/>
    </Provider>
  )
}



/* == Axios Interceptors == */
axios.defaults.baseURL = config.apiBaseUrl

axios.interceptors.response.use(
  response => handleResponse(response), 
  error => handleError(error)
)

axios.interceptors.request.use(config => {
  if(!config.headers.Authorization) config.headers.Authorization = `Bearer ${Cookies.get('token') || ''}`
  return config
})



/* == Fetch Current User == */
AppRoot.getInitialProps = async ({ ctx }: any) => {
  let token = ctx.req?.cookies?.token || '', user = null

  token && await authService.currentUser(token)
    .then(response => user = response.data || null)
    .catch(error =>  user = null)

  return {user}
}