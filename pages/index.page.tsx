import React from 'react'
import Layout from '@/component/_layout/Layout.component'
import { Card, Container, Typography, Box, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'



export default function Page() {
  const {t} = useTranslation()

  return (
    <Container>
      <Card className='animate'>

        {/* == Heading == */}
        <Typography variant='h1'>{t('page.dashboard.heading')}</Typography>
        <Box sx={{height:200}}></Box>
        
      </Card>
    </Container>
  )
}



/* == Layout == */
Page.getLayout = ( page: React.ReactElement ) => {
  return <Layout title='page.dashboard.title'>{page}</Layout>
} 