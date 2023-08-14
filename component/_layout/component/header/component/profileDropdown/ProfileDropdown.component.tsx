import { ProfileDropdownProps } from './ProfileDropdown.interface'
import { Popover, List, ListItemButton, ListItemText, ListItemIcon, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { handleLogout } from '@/lib/redux/slices/auth.slice'
import { useReduxDispatch } from '@/hooks/redux'



export default function ProfileDropdown(props:ProfileDropdownProps) {
  const {t} = useTranslation()
  const {open, handleClose} = props
  const dispatch = useReduxDispatch()


  let menus = [
    {label:'menu.profile', icon:PermIdentityOutlinedIcon, href:'#'},
    {label:'menu.help', icon:ContactSupportOutlinedIcon, href:'#'},
    {label:'menu.setting', icon:SettingsOutlinedIcon, href:'#'},
    {label:'menu.logout', icon:LogoutOutlinedIcon, href:'#', onClick: () => dispatch(handleLogout())},
  ]

  return (
    <Popover 
        open={Boolean(open)} 
        anchorEl={open} 
        onClick={handleClose} 
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} 
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
      >
       <Box component='nav'>
        <List dense>
          {menus.map((item, index) => 
            <ListItemButton onClick={item.onClick} key={index}>
              <ListItemIcon>
                <item.icon/>
              </ListItemIcon>
              <ListItemText primary={t(item.label)} />
            </ListItemButton>
          )}
        </List>
       </Box>
    </Popover>
  )
}
