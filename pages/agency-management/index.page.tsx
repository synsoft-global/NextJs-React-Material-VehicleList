import { Container, Card, Stack, Typography, Box, Button, CardContent, CardActions, Grid, Divider, IconButton, Avatar, Popover, MenuList, MenuItem, ListItemIcon, ListItemText, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { useTranslation } from "react-i18next"
import { useReduxDispatch, useReduxSelector } from '@/hooks/redux'
import { User } from '@/lib/redux/slices/auth.slice'
import { deleteAgency, getAgencyListByOrganization } from '@/lib/redux/actions/agency.action'
import { useEffect, useState } from 'react';
import Layout from '@/component/_layout/Layout.component'
import Link from 'next/link';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import PinIcon from '@mui/icons-material/Pin'
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import ApartmentIcon from '@mui/icons-material/Apartment'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { THUNK_STATUS } from '@/lib/redux/constants/status.constant'
import DeletePopup from '@/component/deletePopup/DeletePopup.component'



export default function Page() {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useReduxDispatch()
  const [selectedItem, setSelectedItem] = useState<{} | any>(null)
  const user: User | null = useReduxSelector(state => state.auth.user)
  const { data, status } = useReduxSelector(state => state.agency.list)
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [deleteItem, setDeleteItem] = useState<number | undefined>()
  
  const getAgency = () => getAgencyListByOrganization(user?.orgOBJ[0]?.id as number)


  useEffect(() => {
    if(!data.length && user?.orgOBJ.length) dispatch(getAgency())
  }, [])


  const handleMore = (event: React.SyntheticEvent, params: number) => {
    setAnchorEl(event.currentTarget)
    setSelectedItem(params)
  }
  

  const handleClose = () => {
    setAnchorEl(null)
    setSelectedItem(null)
  }
  

  return (
    <Container>
      <Card className='animate'>

        {/* == Header == */}
        <Stack justifyContent='space-between' alignItems='start' spacing={3} mb={3}>
          <Typography variant='h1' mb={0}>{t('page.agencyManagement.heading')}</Typography>
          <Link href={router.asPath + '/add'}>
            <Button variant='contained' type='submit' startIcon={<AddOutlinedIcon />}>{t('page.agencyManagement.addAgency')}</Button>
          </Link>
        </Stack>

        <Grid container spacing={3}>
          {status !== THUNK_STATUS.LOADING && data.map((item) =>
            <Grid item xs={12} md={4} sm={6}>
              <Card sx={style.card} elevation={0}>
                <Typography gutterBottom variant='h2' mb={2}>{item.name}</Typography>

                <Stack direction='column' spacing={2}>

                  <Stack spacing={2}>
                    <Avatar sx={style.avatar}><DirectionsCarIcon /></Avatar>
                    <Stack direction='column'>
                      <Typography variant='body1' color='text.dark'>{t('page.agencyManagement.fieldName.numberOfVehicle')}</Typography>
                      <Typography variant='body3'>{item.noOfRegisteredVehicles}</Typography>
                    </Stack>
                  </Stack>

                  <Stack spacing={2}>
                    <Avatar sx={style.avatar}><PinIcon /></Avatar>
                    <Stack direction='column'>
                      <Typography variant='body1' color='text.dark'>{t('page.agencyManagement.fieldName.agencyCode')}</Typography>
                      <Typography variant='body3'>{item.agencyCode}</Typography>
                    </Stack>
                  </Stack>

                  <Stack spacing={2}>
                    <Avatar sx={style.avatar}><FmdGoodIcon /></Avatar>
                    <Stack direction='column'>
                      <Typography variant='body1' color='text.dark'>{t('page.agencyManagement.fieldName.agencyAddress')}</Typography>
                      <Typography variant='body3'>{item.address1}</Typography>
                    </Stack>
                  </Stack>

                  <IconButton sx={style.more} >
                    <MoreVertIcon onClick={(event) => handleMore(event, item.id)}/>
                  </IconButton>

                </Stack>
              </Card>
            </Grid>
          )}


          {/* == Component State == */}
          {status === THUNK_STATUS.LOADING && <Box sx={style.loading} className='center'><CircularProgress/></Box>}
          {status !== THUNK_STATUS.LOADING && data.length ===  0 && <Box sx={style.loading} className='center'>No Record Found</Box>}



          {/* == More Menu == */}
          <Popover open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose}>
            <MenuList>
              <MenuItem onClick={()=>{router.push(router.pathname + '/edit-agency/' + selectedItem)}}>
                <ListItemIcon><ModeEditOutlineOutlinedIcon color='info' /></ListItemIcon>
                <ListItemText>{t('common.edit')}</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => {setDeleteItem(selectedItem); setAnchorEl(null) }}>
                <ListItemIcon><DeleteOutlinedIcon color='error' /></ListItemIcon>
                <ListItemText>{t('common.delete')}</ListItemText>
              </MenuItem>
            </MenuList>
          </Popover>

        </Grid>
      </Card>


      {/* == Delete Popup == */}
      <DeletePopup deleteItem={deleteItem} setDeleteItem={setDeleteItem} service={deleteAgency} onDelete={getAgency}/>

    </Container>
  )
}


/* == Style == */
const style = {
  card: { border: 1, borderColor: 'divider', position: 'relative', pr: 6 },
  more: { position: 'absolute', top: 5, right: 5, mt: '0 !important' },
  loading:{height:200, width:1},
  avatar:{}
}



/* == Layout == */
Page.getLayout = (page: React.ReactElement) => {
  return <Layout title='page.agencyManagement.title'>{page}</Layout>
} 