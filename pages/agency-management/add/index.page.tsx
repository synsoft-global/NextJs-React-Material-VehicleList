import {Card, Container, Typography, Stack} from '@mui/material'
import {useTranslation} from 'react-i18next'
import Layout from '@/component/_layout/Layout.component'
import AgencyManagementForm from '../component/AgencyManagementForm.component'



export default function Page() {
  const {t} = useTranslation()


  return (
    <Container>
      <Card className='animate'>

        {/* == Header == */}
        <Stack justifyContent='space-between' alignItems='start' mb={3} spacing={3}>
          <Typography variant='h1'>{t('page.agencyManagement.add.heading')}</Typography>
        </Stack>


        {/* == Agency Management Form == */}
        <AgencyManagementForm mode='add'/>

      </Card>
    </Container>
  )
}



/* == Style == */
const style = {
  divider: { my: 3}
}



/* == Layout == */
Page.getLayout = ( page: React.ReactElement ) => {
  return <Layout title='page.agencyManagement.add.title'>{page}</Layout>
} 