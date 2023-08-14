import { Card, Container, Divider, Box, Typography, CircularProgress } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useEffect, useLayoutEffect, useState } from "react"
import { useReduxDispatch, useReduxSelector } from "@/hooks/redux"
import { useRouter } from "next/router"
import { THUNK_STATUS } from "@/lib/redux/constants/status.constant"
import { getAgencyListItem } from "@/lib/redux/actions/agency.action"
import { getCountry, getState } from "@/lib/redux/actions/local.action"
import Layout from "@/component/_layout/Layout.component"
import AgencyManagementForm from "../component/AgencyManagementForm.component"



export default function Page() {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useReduxDispatch()
  const { data, status } = useReduxSelector(state => state.agency.item)
  const { country, state } = useReduxSelector(state => state.local)
  const [defaultValues, setDefaultValues] = useState<any | undefined>()
  const [localCountry, setLocalCountry] = useState<any | undefined>(country.data)
  const [localState, setLocalState] = useState<any | undefined>(state.data)


  useEffect(() => {
    if (!country.data.length) {
      dispatch(getCountry()).unwrap()
        .then((response) => {
          setLocalCountry(response.data)
        })
    }
  }, [])


  useEffect(() => {
    if (localCountry.length && localState) {
      dispatch(getAgencyListItem(Number(router.query.id))).unwrap()
        .then(response => {
          let data = response.data
          setDefaultValues({
            id: 139,
            name: data.name,
            address1: data.address1,
            agencyCode: data.agencyCode,
            city: data.city,
            agencyAvailability:data.agencyAvailability,
            countryId: localCountry.find((item: any) => item.id == data.countryId ? item : null),
            ispaymentgatewayEnabled: data.ispaymentgatewayEnabled,
            noOfRegisteredVehicles: data.noOfRegisteredVehicles,
            paymentGatewayPublickey: data.paymentGatewayPublickey,
            paymentGatewaySecretKey: data.paymentGatewaySecretKey,
            paymentgatewayId: data.paymentgatewayId,
            postalCode: data.postalCode,
            stateId: data.stateId,
            status: Boolean(Number(data.status))
          })
        })
    }
  }, [localCountry])


  return (
    <Container>
      <Card className='animate'>

        {/* == Header == */}
        <Typography variant='h1'>{t('page.agencyManagement.edit.heading')}</Typography>
        <Divider orientation='horizontal' sx={style.divider} />


        {/* == Vehicle Details Form == */}
        {status == THUNK_STATUS.LOADING && <Box className='center'><CircularProgress /></Box>}
        {status == THUNK_STATUS.SUCCESS && defaultValues && <AgencyManagementForm mode='edit' defaultValues={defaultValues} />}
      </Card>
    </Container>
  )
}


/* == Style == */
const style = {
  divider: { my: 3 }
}


/* == Layout == */
Page.getLayout = (page: React.ReactElement) => {
  return <Layout title='page.agencyManagement.edit.title'>{page}</Layout>
}

