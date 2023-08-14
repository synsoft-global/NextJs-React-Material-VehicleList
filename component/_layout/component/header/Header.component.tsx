import { useState } from 'react'
import { Box, Stack, IconButton, Avatar, Typography, ButtonBase, Divider, Theme, useMediaQuery } from '@mui/material'
import { HeaderProps } from './Header.interface'
import { useTranslation } from 'react-i18next'
import { useReduxDispatch, useReduxSelector } from '@/hooks/redux'
import { handleSidebar } from '@/lib/redux/slices/layout.slice'
import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ProfileMenu from '@/component/_layout/component/header/component/profileDropdown/ProfileDropdown.component'
import config from '@/config'
import LanguageDropdown from '@/component/languageDropdown/LanguageDropdown.component'



export default function Header(props: HeaderProps) {
  const {t} = useTranslation()
  const {isSidebar} = props
  const dispatch = useReduxDispatch()
  const isLgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const isSmUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)
  const {sidebarWidth, sidebarDense} = useReduxSelector(state => state.layout)


  const handleProfileDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(element => element ? null : event.currentTarget)
  }


  return (
    <Stack component='header' id='header' sx={style.root}>
      <Stack>
        <Stack justifyContent='space-between' sx={{width:isLgDown ? 'auto':sidebarWidth, pl:{xs:2, sm:3}}}>
          {/* Logo */}
          {!isLgDown &&
          <Link href='/' style={style.logoLink}>
            <ButtonBase component='span' sx={style.logo}>
              <Box component='img' src={config.brandLogo} height={45}/>
            </ButtonBase>
          </Link>}

          {/* Menu */}
          {isSidebar &&
          <Stack alignItems='center'>
            <IconButton onClick={() => dispatch(handleSidebar(isLgDown ? {sidebar:true} : {dense:!sidebarDense, sidebar:true}))} edge='start'>
              <MenuIcon/>
            </IconButton>
          </Stack>}
        </Stack>
        
        {/* Agnency Name & Status */}
        <ButtonBase sx={style.agencyBox}>
          <Stack direction='column' justifyContent='center'>
            <Typography variant='body1' color='primary' fontWeight={600} sx={style.agencyName}>Ace Rentals Services</Typography>
            <Stack alignItems='center'>
              <Box sx={style.statusColor}/>
              <Typography variant='body2' ml={1}>{t('status.active')}</Typography>
            </Stack>
          </Stack>
        </ButtonBase>
      </Stack>

      <Stack sx={style.headerRight} spacing={{xs:1, sm:2}} divider={<Divider orientation="vertical" flexItem sx={style.divider}/>}>
        {/* Language */}
        <LanguageDropdown/>
        
        {/* Profile */}
        <ButtonBase className='center' sx={style.profile} onClick={handleProfileDropdown}>
          <Avatar sx={style.avatar}/>
          {isSmUp && <Typography sx={style.name} variant='body2'>Jhon</Typography>}
          {isSmUp && <ExpandMoreIcon sx={style.arrow}/>}
          <ProfileMenu open={menuAnchor} handleClose={handleProfileDropdown}/>
        </ButtonBase>
      </Stack>
    </Stack>
  )
}



/* == Style == */
const style = {
  root: {boxShadow:'4', bgcolor:'common.white', zIndex:2, justifyContent:'space-between', minHeight:55},
  container: {},
  logo: {flexGrow:1, display:'flex', py:1},
  logoLink: {display:'flex'},
  headerRight: {pr:{xs:2, sm:3}, justifyContent:'space-between'},
  avatar: {height:32, width:32, mr:{xs:0, sm:1}, bgcolor:'primary.main'},
  name: {fontWeight:500, color:'primary.main'},
  arrow: {fontSize:19, ml:0.5, color:'primary.main'},
  profile: {color:'primary.main'},
  divider: {height:'30%', alignSelf:'center'},
  statusColor: {bgcolor:'success.light', height:8, width:8, borderRadius:50},
  agencyBox: {ml:{xs:1, sm:3}},
  agencyName: {whiteSpace:'nowrap', textOverflow:'ellipsis', overflow:'hidden', maxWidth:'max(40vw, 150px)'}
}