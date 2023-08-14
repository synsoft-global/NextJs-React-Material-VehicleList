import { useState } from "react"
import { ButtonBase, Theme, Typography, useMediaQuery, Popover, List, ListItemButton, ListItemText, ListItemIcon, Box, Avatar } from "@mui/material"
import { useTranslation } from 'react-i18next'
import { useReduxSelector } from "@/hooks/redux"
import { handleLanguage } from '@/lib/redux/slices/auth.slice'
import { useReduxDispatch } from '@/hooks/redux'
import { LanguageDropdownProps } from "./LanguageDropdown.interface"
import config from "@/config"



export default function LanguageDropdown(props: LanguageDropdownProps) {
  const { i18n } = useTranslation()
  const dispatch = useReduxDispatch()
  const {responsive=true, fullName=false, sx} = props
  const {language} = useReduxSelector(state => state.auth)
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const isSmUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))


  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code)
    dispatch(handleLanguage(code))
  }


  return <>
    <ButtonBase onClick={(event: React.SyntheticEvent) => setAnchorEl(event.currentTarget)} sx={{...sx}}>
      {(isSmUp || !responsive) && <Avatar sx={style.flag} src={config.supportedLanguages.find(item => item.code === language)?.icon}/>}
      <Typography sx={style.name} variant='body2'>{config.supportedLanguages.find(item => item.code === language)?.[fullName ? 'label' : 'code']}</Typography>
    </ButtonBase>

    <Popover 
      open={!!anchorEl} 
      anchorEl={anchorEl} 
      onClick={() => setAnchorEl(null)}
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} 
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
    >
      <Box component='nav'>
        <List dense>
          {config.supportedLanguages.map((item, index) => 
            <ListItemButton onClick={() => changeLanguage(item.code)} key={index}>
              <ListItemIcon>
                <Avatar src={item.icon} sx={style.icon}/>
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          )}
        </List>
      </Box>
    </Popover>
  </>
}



/* == Style == */
const style = {
  flag: {height:23, width:23, mr:1},
  name: {fontWeight:500, color:'primary.main'},
  icon: {height:25, width:25, border:1, borderColor:'divider'}
}