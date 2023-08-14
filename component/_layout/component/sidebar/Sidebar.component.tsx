import React, { useState, useEffect } from 'react'
import { List, ListItemButton, ListItemText, ListItemIcon, Box, Collapse, Tooltip, Popper, Paper, Drawer, useMediaQuery, Theme } from '@mui/material'
import { SidebarProps, submenuTooltipPopup } from './Sidebar.interface'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useReduxDispatch, useReduxSelector } from '@/hooks/redux'
import { handleSidebar } from '@/lib/redux/slices/layout.slice'
import { getRoutesByRole } from '@/utils'
import Link from 'next/link'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'



export default function Sidebar(props: SidebarProps) {
  const router = useRouter()
  const {t} = useTranslation()
  const dispatch = useReduxDispatch()
  const isLgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const {sidebarWidth, sidebar, sidebarDense} = useReduxSelector(state => state.layout)
  const {user, role} = useReduxSelector(state => state.auth)
  const [submenuTooltip, setSubmenuTooltip] = useState<submenuTooltipPopup>({menuIndex: 0, element: null})
  const [menus, setMenus] = useState(getRoutesByRole(role as Roles).filter(item => item.sidebar))

  
  useEffect(() => {
    menus.map((menu, menuIndex) => {
      menu.href == router.route && handleMenu(menuIndex)
      menu?.sidebarChild?.map((submenu, subIndex) => {
        submenu.href == router.route && handleMenu(menuIndex, subIndex)
      })
    })
  }, [])
  

  const handleMenu = (menuIndex: number, submenuIndex?: number|null, href?:string) => {
    setMenus(items => {
      return items.map((item, index) => {
        item = {...item, active: menuIndex === index}
        item.sidebarChild = item.sidebarChild?.map((submenu, subIndex) => {submenu.active = (menuIndex === index && subIndex === submenuIndex); return submenu})
        return item 
      })
    })
    if(href && href !== '#') dispatch(handleSidebar({sidebar: false}))
  }


  const handleSubMenuTooltip = (event: React.MouseEvent, menuIndex: number, close?: boolean) => {
    if(close) setSubmenuTooltip({menuIndex, element: null})
    else setSubmenuTooltip({menuIndex, element:event.target})
  }

  
  const MenuList = <>
    <Box component='nav' py={2}>
      <List>
        {menus.map((menu, index) => 
          <React.Fragment key={index}>

            {/* == Menus == */}
            <Tooltip title={t(menu.label)} placement='right' open={sidebarDense && !Boolean(menu.sidebarChild?.length) ? undefined : false} key={`${sidebarDense}`} arrow>
              <Link href={menu.href || '#'}>
                <ListItemButton component='li' sx={{...style.listButton}} className={menu.active ? 'active': ''} onClick={() => handleMenu(index, null, menu.href)} onMouseEnter={(event) => handleSubMenuTooltip(event, index)}>
                  <ListItemIcon sx={{color:menu.active? 'primary.main': 'text.secondary'}}>{menu.icon && <menu.icon/>}</ListItemIcon>
                  {!sidebarDense && <ListItemText primaryTypographyProps={{noWrap: true}} primary={t(menu.label)} sx={{...style.listText, color:menu.active? 'primary.main': 'text.secondary'}}/>}
                  {!sidebarDense && Boolean(menu?.sidebarChild?.length) && <ExpandMoreOutlinedIcon sx={{...style.dropdownIcon, color:menu.active? 'primary.main': 'text.secondary', transform:menu.active ? 'rotate(180deg)' : ''}}/>}
                </ListItemButton>
              </Link>
            </Tooltip>


            {/* == Sub-menus == */}
            {!sidebarDense &&
            <Collapse in={Boolean(menu.active)} timeout='auto'>
              {menu.sidebarChild?.map((submenu, subIndex) => 
                <List component="div" disablePadding key={subIndex}>
                  <Link href={submenu.href || '#'}>
                    <ListItemButton onClick={() => handleMenu(index, subIndex, submenu.href)}>
                      <ListItemText primary={t(submenu.label)} sx={{...style.listText, pl:8, color:submenu.active? 'primary.main': 'text.secondary'}}/>
                    </ListItemButton>
                  </Link>
                </List>
              )}
            </Collapse>}

          </React.Fragment>
        )}
      </List>
    </Box>
  </>
  
  
  return (
    !isLgUp 
    ? <Drawer open={sidebar} onClose={() => dispatch(handleSidebar({sidebar: false}))}> {MenuList} </Drawer>
    : <Box component='aside' id='sidebar' sx={{...style.root, minWidth:sidebarDense ? 81:sidebarWidth, maxWidth:sidebarDense ? 81:sidebarWidth}} onMouseLeave={(event) => handleSubMenuTooltip(event, 0, true)}>
        { MenuList }

        {/* == Sub-menu Tooltip == */}
        {isLgUp && sidebarDense &&
        <Popper open={Boolean(submenuTooltip.element)} anchorEl={submenuTooltip.element} placement='right-start' disablePortal>
          <Paper elevation={4}>
            {menus[submenuTooltip.menuIndex].sidebarChild?.map((submenu, subIndex) => 
              <List component="div" disablePadding key={subIndex}>
                <Link href={submenu.href || '#'}>
                  <ListItemButton onClick={() => handleMenu(submenuTooltip.menuIndex, subIndex)}>
                    <ListItemText primary={t(submenu.label)} sx={{overflow:'unset !important', color:submenu.active? 'primary.main': 'text.secondary'}}/>
                  </ListItemButton>
                </Link>
              </List>
            )}
          </Paper>
        </Popper>}
      </Box>
  )
}



/* == Style == */
const style = {
  root: {bgcolor:'common.white', height:1, overflow:'hidden auto', zIndex:1},
  dropdownIcon: {mr:1, fontSize:21, color:'text.secondary', transition:'transform 0.3s'},
  listText: {my:0},
  listButton: {
    px:3, pr:0, py:1.5, zIndex:1, flexWrap:'nowrap',
    '&.active': {color:'primary.main'},
    '&.active:before': {content:`''`, position:'absolute', left:0, height:1, bgcolor:'primary.main', width:5},
    '&.active:after': {content:`''`, position:'absolute', inset:0, bgcolor:'primary.light', zIndex:-1},
  },
}