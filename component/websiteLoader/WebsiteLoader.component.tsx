import { CircularProgress, Backdrop, Theme, Stack } from '@mui/material'
import Image from 'next/image'
import config from '@/config'
import { useReduxSelector } from '@/hooks/redux'



export default function WebsiteLoader() {
  const loading = useReduxSelector(state => state.layout.loading)

  return (
    <Backdrop sx={style.root} open={loading}>
      <Stack direction='column' sx={style.progressContainer} className='center'>
        <CircularProgress color="inherit" />
      </Stack>
      <Image src={config.brandLogo} width={100} height={56} alt='website logo' priority/>
    </Backdrop>
  )
}



/* == Style == */
const style = {
  root: {
    color: 'primary.main', opacity:'1 !important', zIndex: (theme: Theme) => theme.zIndex.drawer + 1, bgcolor:'common.white',
    '&.MuiBackdrop-root': {flexFlow:'column', bgcolor:'#f8f9fa', py:3}
  },
  progressContainer:{flexGrow:1, py:3}
}
