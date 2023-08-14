import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, Typography, Card, Box, Avatar } from '@mui/material'
import { DeletePopupProps } from './DeletePopup.interface'
import { LoadingButton } from '@mui/lab'
import { useReduxDispatch } from '@/hooks/redux'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'



export default function DeletePopup(props: DeletePopupProps) {
  const {t} = useTranslation()
  const {deleteItem, service, setDeleteItem, onDelete} = props
  console.log(deleteItem)
  const [loading, setLoading] = useState(false)
  const dipatch = useReduxDispatch()


  const handleClose = () => {
    setDeleteItem(undefined)
  }


  const handleSubmit = async () => {
    setLoading(true)
    await dipatch(service(deleteItem)).unwrap()
      .then(() => {
        if(onDelete){
          const loading = toast.loading(t('apiResponseCode.UPDATING'))
          dipatch(onDelete())
          setTimeout(() => toast.dismiss(loading), 500)
        }
      })
      .catch(() => {})
    setLoading(false)
    setDeleteItem(undefined)
  }


  return (
    <Dialog open={loading || !!deleteItem} onClose={handleClose}>
      <Card elevation={0} sx={style.card}>
        <Stack spacing={1.5}>
          <Avatar sx={style.icon}>
            <DeleteOutlineIcon/>
          </Avatar>
          <Box>
            <DialogTitle sx={style.heading}>{t('common.delete')}</DialogTitle>
            <Typography variant='body2'>{t('common.areYouSure')}?</Typography>
          </Box>
        </Stack>
        <Stack sx={style.footer} spacing={1}>
          <Button onClick={handleClose} color='inherit' disabled={loading}>Cancel</Button>
          <LoadingButton loading={loading} onClick={handleSubmit} variant='contained' color='error'>{t('common.delete')}</LoadingButton>
        </Stack>
      </Card>
    </Dialog>
  )
}


/* == Style == */
const style = {
  card: {minWidth:{xs:290, sm:400}},
  heading: {p:0},
  icon: {mt:1},
  footer: {justifyContent:'end', mt:3},
}