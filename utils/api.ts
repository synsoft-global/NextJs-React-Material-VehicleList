import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-hot-toast'
import i18n from '@/lib/i18next';



export function handleError(error: AxiosError | any) {
  let message: string | undefined;

  if (error.request.status >= 400 && error.request.status <= 499) message = error.response?.data?.message
  else if (error.request.status == 0) message = 'SERVER_NOT_STARTED'
  else if (error.request.status > 499) message = 'INTERNAL_SERVER_ERROR'

  message = message || error.message

  toast.error(i18n.t('apiResponseCode.' + message))
  console.error(`😲 OMG Api Failed - Details:`, {apiRoute:error?.config?.url, error})
  return Promise.reject(error)
}



export function handleResponse(response: AxiosResponse) {
  const message = response?.data?.message
  if (response.config.method === 'post' && message) toast.success(i18n.t('apiResponseCode.' + message))
  if (response.config.method === 'delete') toast.success(i18n.t('apiResponseCode.DELETED'))
  if (response.config.method === 'put') toast.success(i18n.t('apiResponseCode.UPDATED'))
  return Promise.resolve(response)
}