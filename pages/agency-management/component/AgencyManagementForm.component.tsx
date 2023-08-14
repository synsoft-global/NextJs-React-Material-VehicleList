import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FormControl, FormControlLabel, FormHelperText, Checkbox, Grid, Stack, Typography, TextField, Autocomplete, CircularProgress, FormLabel, Box, Button } from '@mui/material'
import { AgencyManagementFieldProps, IOperationHours } from './AgencyManagement.interface'
import { useTranslation } from 'react-i18next'
import { Controller } from 'react-hook-form'
import { useReduxDispatch, useReduxSelector } from '@/hooks/redux'
import { getCountry, getState, getCurrency } from '@/lib/redux/actions/local.action'
import { getkeyFromObject, stringTest } from '@/utils'
import { THUNK_STATUS } from '@/lib/redux/constants/status.constant'
import { useForm } from 'react-hook-form'
import { LoadingButton } from '@mui/lab'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { TimePicker } from '@mui/x-date-pickers'
import { createAgency, getAgencyListByOrganization, updateAgency } from '@/lib/redux/actions/agency.action'
import { User } from '@/lib/redux/slices/auth.slice'
import moment from 'moment'



let constantDate = '2022-04-17T'


/* hour of opration object define */
let operationHoursOBJ = [{ active: false, startTime: null, endTime: null, label: 'Monday', key: 'mondayStartTime' },
{ active: false, startTime: null, endTime: null, label: 'Tuesday', key: 'tuesdayStartTime' },
{ active: false, startTime: null, endTime: null, label: 'Wednesday', key: 'wednesdayStartTime' },
{ active: false, startTime: null, endTime: null, label: 'Thursday', key: 'thursdayStartTime' },
{ active: false, startTime: null, endTime: null, label: 'Friday', key: 'fridayStartTime' },
{ active: false, startTime: null, endTime: null, label: 'Saturday', key: 'saturdayStartTime' },
{ active: false, startTime: null, endTime: null, label: 'Sunday', key: 'sundayStartTime' }]


export default function AgencyManagementForm(props: AgencyManagementFieldProps) {
  const { mode, defaultValues } = props
  const router = useRouter()
  const { t } = useTranslation()
  const dispatch = useReduxDispatch()
  const formStates = useReduxSelector(state => state.agency)[mode]
  const { country, state } = useReduxSelector(state => state.local)
  const user: User | null = useReduxSelector(state => state.auth.user)
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { handleSubmit, control, setValue, formState: { errors }, watch, resetField } = useForm<IAgencyFormData>({
    resolver: yupResolver(schema),
    defaultValues: { ...defaultValues }
  })

  console.log(errors)

  /* operation state  define*/
  const [operationHours, setOperationHours] = useState<IOperationHours[]>([])


  /* watch */
  const stripePaymentGatway = watch('ispaymentgatewayEnabled')

  
  const loadState = (countryId: number | undefined) => {
    setValue('stateId', '')
    setSelectedCountry(countryId || null)
    countryId && dispatch(getState(countryId as number))
  }


  useLayoutEffect(() => {
    dispatch(getCountry())
  }, [])


  /* Only run edit time  */
  useEffect(() => {
    if (defaultValues?.countryId.id && defaultValues?.stateId) {
      setSelectedCountry(defaultValues.countryId)
      dispatch(getState(defaultValues.countryId.id as number)).unwrap()
        .then((response) => {
          setValue('stateId', response.data.find((item: any) => item.id == defaultValues.stateId) || '')
        })
    }
  }, [])


  useEffect(() => {
    if (!!defaultValues?.agencyAvailability) {
      const { agencyId, createdAt, createdBy, updatedAt, id, updatedBy, ...rest } = defaultValues.agencyAvailability[0]
      let agencyModified = agencyHourDefaultValue(rest)
      console.log(agencyModified)
      setOperationHours(agencyModified)
    }
    else {
      setOperationHours(operationHoursOBJ)
    }
  }, [])


  const handleChange = (key: string, value: any, index: number) => {
    setOperationHours((items: any) => {
      items[index][key] = value
      return [...items]
    })
  }


  const onSubmit = async (formData: any) => {
    setIsSubmitted(true)
    console.log('1')
    if (operationHours.find(item => item.active && (!item.startTime?._isValid || !item.endTime?._isValid))) return
    console.log('2',operationHours.find(item => item.active && !item.startTime.isBefore(item.endTime)))
    if (operationHours.find(item => item.active && !item.startTime.isBefore(item.endTime))) return
    console.log('3', )
   
    if (stripePaymentGatway && Boolean(!Boolean(formData.paymentGatewayPublickey?.length) || !Boolean(formData.paymentGatewaySecretKey?.length))) return
    console.log('4')
  
    const { countryId, stateId, noOfRegisteredVehicles, ispaymentgatewayEnabled,status, ...finalFormData } = formData
    finalFormData.countryId = countryId.id
    finalFormData.stateId = stateId.id
    finalFormData.ispaymentgatewayEnabled = stripePaymentGatway
    finalFormData.noOfRegisteredVehicles = Number(noOfRegisteredVehicles)
    finalFormData.agencyAvailability = operationHoursData(operationHours)
    finalFormData.status  = status ? "1" : "0"
    finalFormData.organizationId = user?.orgOBJ[0]?.id as number


    if(!ispaymentgatewayEnabled){ finalFormData.paymentGatewayPublickey = ''; finalFormData.paymentGatewaySecretKey = ''}

    if (mode == 'add') {
      await dispatch(createAgency(finalFormData)).unwrap()
        .then(() => {
          router.push('./')
          dispatch(getAgencyListByOrganization(user?.orgOBJ[0]?.id as number))
        })
    }
    else {
      console.log(finalFormData)
      await dispatch(updateAgency({id: Number(router.query.id), params: finalFormData})).unwrap()
        .then(() => {
          router.push('../')
          dispatch(getAgencyListByOrganization(user?.orgOBJ[0]?.id as number))
        })
    }

  }


  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>

        {/* == Agency Form Field */}

        {/* Agency Name */}
        <Grid item xs={12} sm={6}>
          <Controller name='name' control={control}
            render={({ fieldState: { error }, field: { value, onChange } }) =>
              <TextField label={t('page.agencyManagement.fieldName.agencyName')} required value={value || ''} onChange={onChange} error={!!error} helperText={t(error?.message ?? '')} sx={style.field} />
            }
          />
        </Grid>

        {/* Number Of vehicle */}
        <Grid item xs={12} sm={6}>
          <Controller name='noOfRegisteredVehicles' control={control}
            render={({ fieldState: { error }, field: { value, onChange } }) =>
              <TextField label={t('page.agencyManagement.fieldName.numberOfVehicle')} required value={value || ''} onChange={onChange} error={!!error} helperText={t(error?.message ?? '')} sx={style.field} />
            }
          />
        </Grid>

        {/* Agency Code */}
        <Grid item xs={12} sm={6}>
          <Controller name='agencyCode' control={control}
            render={({ fieldState: { error }, field: { value, onChange } }) =>
              <TextField type='number' label={t('page.agencyManagement.fieldName.agencyCode')} required value={value || ''} onChange={onChange} error={!!error} helperText={t(error?.message ?? '')} sx={style.field} />
            }
          />
        </Grid>

        {/* Agency Address */}
        <Grid item xs={12} sm={6}>
          <Controller name='address1' control={control}
            render={({ fieldState: { error }, field: { value, onChange } }) =>
              <TextField label={t('page.agencyManagement.fieldName.agencyAddress')} required value={value || ''} onChange={onChange} error={!!error} helperText={t(error?.message ?? '')} sx={style.field} />
            }
          />
        </Grid>

        {/* Country */}
        <Grid item xs={12} sm={6}>
          <Controller name='countryId' control={control}
            render={({ fieldState: { error }, field: { value, onChange, onBlur } }) => {
              let data = country.data, apiFailed = country.status == THUNK_STATUS.FAILED, apiFailedMessage = 'message.countryApiFailed'
              return (
                <Autocomplete value={value || null} options={data} onBlur={onBlur}
                  onChange={(e, data: any) => { onChange(data), loadState(data?.id) }}
                  disabled={apiFailed}
                  loading={!Boolean(data.length)}
                  getOptionLabel={(option: any) => option.name}
                  isOptionEqualToValue={(option: any, value: any) => option.name === value.name}
                  renderOption={(props, option: any) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img loading="lazy" width="20" src={`https://flagcdn.com/w20/${option.sortName.toLowerCase()}.png`} alt="" />
                      {option.name} <Typography variant='body3' sx={style.badge} ml={1}>{option.sortName}</Typography>
                    </Box>
                  )}
                  renderInput={(params) =>
                    <TextField {...params} required label={t('page.register.fieldName.country')} sx={style.field}
                      error={!!error || apiFailed}
                      helperText={apiFailed ? t(apiFailedMessage) : t(error?.message ?? '')}
                      inputProps={{ ...params.inputProps, required: false }}
                      InputProps={{ ...params.InputProps, endAdornment: <>{!apiFailed && (Boolean(data.length) ? null : <CircularProgress color="inherit" size={20} />)}{params.InputProps.endAdornment}</> }}
                    />
                  }
                />
              )
            }}
          />
        </Grid>

        {/* State */}
        <Grid item xs={12} sm={6}>
          <Controller name='stateId' control={control}
            render={({ fieldState: { error }, field: { value, onChange, onBlur } }) => {
              let data = state.data, apiFailed = state.status == THUNK_STATUS.FAILED, apiFailedMessage = 'message.stateApiFailed'
              return (
                <Autocomplete value={value || null} options={data} onBlur={onBlur}
                  onChange={(e, data) => onChange(data)}
                  disabled={!Boolean(selectedCountry) || apiFailed}
                  loading={Boolean(!apiFailed && selectedCountry && !Boolean(data.length))}
                  getOptionLabel={(option: any) => option.name}
                  isOptionEqualToValue={(option: any, value: any) => option.name === value.name}
                  renderInput={(params) =>
                    <TextField {...params} required label={t('page.register.fieldName.state')} sx={style.field}
                      error={!!error || apiFailed}
                      helperText={apiFailed ? t(apiFailedMessage) : t(error?.message ?? '')}
                      inputProps={{ ...params.inputProps, required: false, autoComplete: 'new-password' }}
                      InputProps={{ ...params.InputProps, endAdornment: <>{!apiFailed && selectedCountry && (Boolean(data.length) ? null : <CircularProgress color="inherit" size={20} />)}{params.InputProps.endAdornment}</> }}
                    />
                  }
                />
              )
            }}
          />
        </Grid>

        {/* City */}
        <Grid item xs={12} sm={6}>
          <Controller name='city' control={control}
            render={({ fieldState: { error }, field: { value, onChange } }) =>
              <TextField label={t('page.register.fieldName.city')} required value={value || ''} onChange={onChange} error={!!error} helperText={t(error?.message ?? '')} sx={style.field} />
            }
          />
        </Grid>

        {/* Zip */}
        <Grid item xs={12} sm={6}>
          <Controller name='postalCode' control={control}
            render={({ fieldState: { error }, field: { value, onChange } }) =>
              <TextField label={t('page.agencyManagement.fieldName.zip')} required type='string' value={value || ''} onChange={onChange} error={!!error} helperText={t(error?.message ?? '')} sx={style.field} />
            }
          />
        </Grid>


        {/* == Hours Of Operation == */}
        <Grid item xs={12}>
          <Typography variant='h2' mt={2}>{t('page.agencyManagement.add.hoursOfOperation')}</Typography>
        </Grid>

        {/* Hour Of Operation */}
        <Grid item xs={12} >
          <Grid container spacing={2}>
            {operationHours.map((item, index) =>
              <Grid item xs={12} key={index}>
                <Grid container spacing={2} alignItems='center'>

                  <Grid item minWidth={150}>
                    <FormControl>
                      <FormControlLabel label={item.label} control={<Checkbox checked={item.active} onChange={() => handleChange('active', !item.active, index)} />} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TimePicker
                      label='Start Time'
                      ampm={false}
                      format="HH:mm"
                      disabled={!item.active}
                      defaultValue={item.startTime}
                      onChange={(value) => { console.log(value); handleChange('startTime', value, index)}}
                      slotProps={{
                        textField: {
                          required: item.active,
                          error: (isSubmitted && item?.startTime?._isValid !== true) ? true : undefined,
                          inputProps: { required: false },
                          helperText: item.active && item?.endTime?._isValid !== true ? "Enter correct time" : ''
                        }
                      }}
                    />
                    {/* <FormHelperText error>{!item.active ? (isSubmitted && item?.startTime?._isValid !== true) && "Enter vaild time" : ''}</FormHelperText> */}
                  </Grid>

                  <Grid item className='center'><Box sx={style.line} /></Grid>

                  <Grid item xs={12} sm={4}>
                    <TimePicker
                      label='End Time'
                      ampm={false}
                      format="HH:mm"
                      minTime={item.active && item.startTime}
                      defaultValue={item.endTime}
                      disabled={item?.startTime?._isValid !== true}
                      onChange={(value) => handleChange('endTime', value, index)}
                      // onError={()=>{console.log('asdjkas')}}
                      slotProps={{
                        textField: {
                          required: item.active,
                          error: (isSubmitted && item?.endTime?._isValid !== true) ? true : undefined,
                          inputProps: { required: false, },
                          helperText: item.active && item?.endTime?._isValid !== true ? "Enter correct time" : ''
                        }
                      }}
                    />
                  </Grid>

                </Grid>
              </Grid>
            )}
          </Grid>

          {/* Is Agency Active  */}
          <Grid item mt={2}>
            <Controller name='status' control={control} defaultValue={false}
              render={({ fieldState: { error }, field: { value, onChange } }) =>
                <FormControl error={!!error} fullWidth={false} >
                  <FormControlLabel
                    label={t('page.agencyManagement.fieldName.agencyActive')}
                    componentsProps={{ typography: { color: error ? 'error.main' : undefined } }}
                    control={<Checkbox checked={value} onChange={onChange} />}
                  />
                  <FormHelperText>{t(error?.message ?? '')}</FormHelperText>
                </FormControl>
              }
            />
          </Grid>
        </Grid>

        {/* == Payment Configuration == */}
        <Grid item xs={12}>
          <Stack direction={'row'} gap={4}>
            <Typography variant='h2' sx={style.whiteSpace} className='center'>{t('page.agencyManagement.add.paymentConfiguration')}</Typography>
            <Controller name='ispaymentgatewayEnabled' control={control} defaultValue={false}
              render={({ fieldState: { error }, field: { value, onChange } }) =>
                <FormControl error={!!error} fullWidth={false}>
                  <FormControlLabel
                    label={t('page.agencyManagement.fieldName.enableStripePaymentGatway')}
                    componentsProps={{ typography: { color: error ? 'error.main' : undefined } }}
                    control={<Checkbox checked={value} onChange={onChange} />}
                  />
                  <FormHelperText>{t(error?.message ?? '')}</FormHelperText>
                </FormControl>
              }
            />
          </Stack>
        </Grid>

        {/* == Payment Configuration == */}
        {stripePaymentGatway &&
          <>
            {/* Stripe Public Key* */}
            <Grid item xs={12} sm={6}>
              <Controller name='paymentGatewayPublickey' control={control}
                render={({ fieldState: { error }, field: { value, onChange } }) =>
                  <TextField type='number' label={t('page.agencyManagement.fieldName.stripePublicKey')}
                    required={stripePaymentGatway} value={value || ''}
                    onChange={onChange}
                    error={!!error} 
                    helperText={t(error?.message ?? '')} />
                }
              />
            </Grid>

            {/* Stripe Secret Key* */}
            <Grid item xs={12} sm={6}>
              <Controller name='paymentGatewaySecretKey' control={control}
                render={({ fieldState: { error }, field: { value, onChange } }) =>
                  <TextField type='number' label={t('page.agencyManagement.fieldName.stripeSecretKey')}
                    required={stripePaymentGatway} value={value || ''}
                    onChange={onChange}
                    error={!!error} 
                    helperText={t(error?.message ?? '')} />
                }
              />
            </Grid>
          </>
        }

      </Grid >

      {/* == Footer == */}
      <Stack mt={3} spacing={1} justifyContent='end'>
        <Link href={mode == 'add' ?  './' : '../'}><Button component='span'>{t('Cancel')}</Button></Link>
        <LoadingButton variant='contained' loading={formStates.status === THUNK_STATUS.LOADING} type='submit'>{t('Save')}</LoadingButton>
      </Stack>

    </Box>
  )
}


/* == Validation == */
export const schema = yup.object({
  name: yup.string().required(),
  noOfRegisteredVehicles: yup.string().trim().matches(/^[0-9]+$/).max(30).required(),
  agencyCode: yup.string().trim().matches(/^[0-9]+$/).max(30).required(),
  address1: yup.string().required(),
  stateId: yup.object().required(),
  countryId: yup.object().required(),
  city: yup.string().trim().max(100).required().test(stringTest),
  postalCode: yup.string().trim().matches(/^[0-9]+$/).max(30).required(),
  status: yup.boolean(),
  ispaymentgatewayEnabled: yup.boolean(),
  paymentGatewayPublickey: yup.string().when('ispaymentgatewayEnabled', (ispaymentgatewayEnabled, schema) => {
    return ispaymentgatewayEnabled[0] ? schema.required('Public key is required').trim().matches(/^[0-9]+$/, 'Invalid input').max(30) : schema.trim().matches(/^[0-9]+$/, 'Invalid input').max(30);
  }),
  paymentGatewaySecretKey: yup.string().when('ispaymentgatewayEnabled', (ispaymentgatewayEnabled, schema) => {
    return ispaymentgatewayEnabled[0] ? schema.required('Secret key is required').trim().matches(/^[0-9]+$/, 'Invalid input').max(30) : schema.trim().matches(/^[0-9]+$/, 'Invalid input').max(30);
  }),
})

export type IAgencyFormData = yup.InferType<typeof schema>


/* == Style == */
const style = {
  field: { '.MuiInputBase-root': { bgcolor: 'white', borderRadius: 1 } },
  line: { width: 10, bgcolor: 'divider', height: '1px' },
  badge: { px: 1, borderRadius: 1, border: 1, borderColor: 'divider' },
  whiteSpace: { whiteSpace: 'nowrap' }
}


/* == Utils Function == */
function operationHoursData(operationHours: any) {
  const activeDays = operationHours.filter((item: any) => item.active === true)

  return activeDays.map((item: any) => {
    switch (item.label) {
      case 'Monday':
        return { mondayStartTime: moment(item.startTime).format('HH:mm:ss'), mondayEndTime: moment(item.endTime).format('HH:mm:ss') }
      case 'Tuesday':
        return { tuesdayStartTime: moment(item.startTime).format('HH:mm:ss'), tuesdayEndTime: moment(item.endTime).format('HH:mm:ss') }
      case 'Wednesday':
        return { wednesdayStartTime: moment(item.startTime).format('HH:mm:ss'), wednesdayEndTime: moment(item.endTime).format('HH:mm:ss') }
      case 'Thursday':
        return { thursdayStartTime: moment(item.startTime).format('HH:mm:ss'), thursdayEndTime: moment(item.endTime).format('HH:mm:ss') }
      case 'Friday':
        return { fridayStartTime: moment(item.startTime).format('HH:mm:ss'), fridayEndTime: moment(item.endTime).format('HH:mm:ss') }
      case 'Saturday':
        return { saturdayStartTime: moment(item.startTime).format('HH:mm:ss'), saturdayEndTime: moment(item.endTime).format('HH:mm:ss') }
      case 'Sunday':
        return { sundayStartTime: moment(item.startTime).format('HH:mm:ss'), sundayEndTime: moment(item.endTime).format('HH:mm:ss') }
      default:
        return null
    }
  }).filter((item: any) => item !== null).reduce((acc: any, obj: any) => ({ ...acc, ...obj }), {})
}


function agencyHourDefaultValue(value:any) {
  const {
    mondayEndTime,mondayStartTime,tuesdayEndTime,tuesdayStartTime,wednesdayEndTime,wednesdayStartTime,thursdayEndTime,
    thursdayStartTime,fridayEndTime,fridayStartTime,saturdayEndTime,saturdayStartTime,sundayEndTime,sundayStartTime,} = value;

  const days = [
    {key: 'mondayStartTime', active: false, label: 'Monday', startTime: mondayStartTime, endTime: mondayEndTime },
    {key: 'tuesdayStartTime', active: false, label: 'Tuesday', startTime: tuesdayStartTime, endTime: tuesdayEndTime },
    {key: 'wednesdayStartTime', active: false, label: 'Wednesday', startTime: wednesdayStartTime, endTime: wednesdayEndTime },
    {key: 'thursdayStartTime', active: false, label: 'Thursday', startTime: thursdayStartTime, endTime: thursdayEndTime },
    {key: 'fridayStartTime', active: false, label: 'Friday', startTime: fridayStartTime, endTime: fridayEndTime },
    {key: 'saturdayStartTime', active: false, label: 'Saturday', startTime: saturdayStartTime, endTime: saturdayEndTime },
    {key: 'sundayStartTime', active: false, label: 'Sunday', startTime: sundayStartTime, endTime: sundayEndTime },
  ];

  let updatedArray = days.map((item) => {
    const { label, startTime, endTime } = item;

    if (startTime !== null && endTime !== null) {
      return {...item, active: true, startTime: moment(constantDate + startTime), endTime: moment(constantDate + endTime)};
    } else {
      return { ...item };
    }
  });

  return updatedArray;
}
