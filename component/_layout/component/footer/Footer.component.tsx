import Link from 'next/link'
import { FooterProps } from './Footer.interface'
import { Box, ButtonBase, Container, Divider, Grid, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'
import config from '@/config'



export default function Footer(props: FooterProps) {
  const { t } = useTranslation()
  const isSmUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

  return (
    <Box component='footer' id='footer' sx={style.root}>
      <Container>
        <Grid container justifyContent='space-between' alignItems='center' spacing={{xs:0, md:3}}>
          <Grid item xs={12} md='auto'>
            <Stack spacing={{xs:0, sm:1}} direction={{xs:'column', sm:'row'}} divider={isSmUp ? <Divider orientation="vertical" variant="middle" flexItem sx={style.divider}/> : ''}>
              <Link href='/terms-conditions' className='d-flex' target='_blank'>
                <ButtonBase component='span' sx={style.link}>
                  <Typography component='span' variant='body3' py={{xs:0.5, sm:1}}>{t('menu.termsConditions')}</Typography>
                </ButtonBase>
              </Link>
              <Link href='/privacy-policy' className='d-flex' target='_blank'>
                <ButtonBase component='span' sx={style.link}>
                  <Typography component='span' variant='body3' py={{xs:0.5, sm:1}}>{t('menu.privacyPolicy')}</Typography>
                </ButtonBase>
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md='auto'>
            <Typography variant='body3'>{t('copywrite').replace('{{year}}', `${new Date().getFullYear()}`).replace('{{brandName}}', config.brandName)}</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}



/* == Style == */
const style = {
  root: {bgcolor:'common.white', boxShadow:'4', py:{xs:2, md:0}},
  divider: {my:'10px !important'},
  link: {
    color:'text.disabled', px:1, mx:-1,
    ':hover': {bgcolor:'action.hover'}
  }
}