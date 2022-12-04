import React, { useState } from 'react'
import '@splidejs/react-splide/css'
import update from 'immutability-helper'
import { useTranslation } from 'react-i18next'
import { Form, useFormik, FormikProvider } from 'formik'

import { Add, Remove } from '@mui/icons-material'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { Box, Button, FormLabel, Stack, Tooltip, useTheme } from '@mui/material'

import { useKitchen } from 'contexts/kitchen'
import { updateKitchenById } from 'api/kitchens'
import kitchenValidationSchema from 'schemas/kitchen'
import { useKitchenById, useKitchens } from 'hooks/kitchens'

import Select from 'components/FormInputs/Select'
import TextInput from 'components/FormInputs/TextInput'
import SelectLocations from 'components/CustomersView/KitchenPage/SelectLocations'
import AddLocationDialog from 'components/CustomersView/KitchenPage/AddLocationDialog'

const DIALOGS = {
  ADD_LOCATION: 'ADD_LOCATION',
}

function KitchenPage() {
  const theme = useTheme()
  const { t } = useTranslation()
  const [openDialog, setOpenDialog] = useState('')

  const { kitchenId } = useKitchen()
  const { mutate: mutateKitchens } = useKitchens()
  const {
    kitchen,
    mutate: mutateKitchen,
    isLoading,
  } = useKitchenById(kitchenId)

  const handleOnSubmit = async (values) => {
    try {
      const updatedKitchen = await updateKitchenById(kitchenId, values)
      mutateKitchen(updatedKitchen)
      mutateKitchens()
    } catch (error) {
      console.log(`Could not update kitchen: ${error.message}`)
    }
  }

  const formik = useFormik({
    initialValues: kitchen || {},
    enableReinitialize: true,
    validateOnMount: true,
    validateOnBlur: false,
    onSubmit: handleOnSubmit,
    validationSchema: kitchenValidationSchema,
  })

  const handleOnClickRemoveImage = (index) => () => {
    formik.setFieldValue(
      'image',
      update(formik.values.image, { $splice: [[index, 1]] })
    )
  }

  if (isLoading) return <div>{t('loading')}</div>

  return (
    <>
      <FormikProvider value={formik}>
        <Stack as={Form} direction="column" maxWidth="md">
          <TextInput name="name" label="Name" required fullWidth />

          <TextInput name="website" label="Website" required fullWidth />

          <Stack direction="row" spacing={2}>
            <Stack flex={1} direction="column" alignItems="stretch" spacing={0}>
              <FormLabel>{t('Images')}</FormLabel>
              {formik.values.image?.map((_, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="flex-start"
                  spacing={1}
                >
                  <Stack flex={1} spacing={0}>
                    <TextInput name={`image.${index}.url`} fullWidth />
                  </Stack>
                  <Button
                    onClick={handleOnClickRemoveImage(index)}
                    component={Box}
                    variant="outlined"
                    color="error"
                    sx={{ marginTop: '24px !important', padding: '7px' }}
                  >
                    <Remove />
                  </Button>
                </Stack>
              ))}
              <TextInput
                key={formik.values.image?.length + 1}
                name={`image.${formik.values.image?.length || 0}.url`}
                placeholder={t('Add new image')}
                fullWidth
              />
            </Stack>
            {!!formik.values.image?.length && (
              <Box maxWidth={theme.spacing(30)} minWidth={theme.spacing(20)}>
                <Splide aria-label="My Favorite Images">
                  {formik.values.image?.map(({ url }, index) => (
                    <SplideSlide key={url}>
                      <img
                        src={url}
                        alt={`${formik.values.name}_${index + 1}`}
                        loading="lazy"
                      />
                    </SplideSlide>
                  ))}
                </Splide>
              </Box>
            )}
          </Stack>

          <Stack direction="row" alignItems="flex-start" spacing={1}>
            <SelectLocations
              name="location"
              label="Location"
              required
              multiple
              fullWidth
            />
            <Tooltip title={t('Create new location')}>
              <Button
                onClick={() => setOpenDialog(DIALOGS.ADD_LOCATION)}
                component={Box}
                variant="outlined"
                sx={{ marginTop: '39px !important', padding: '7px' }}
              >
                <Add />
              </Button>
            </Tooltip>
          </Stack>

          <Select
            required
            fullWidth
            name="intentions"
            label="Intentions"
            options={['Dine-in', 'Takeout', 'Delivery']}
            multiple
          />

          <Select
            name="currency"
            label="Currency"
            options={['$', '€', '₪']}
            required
            fullWidth
          />

          <Stack direction="row" justifyContent="flex-end" spacing={1} my={4}>
            <Button
              disabled={!formik.dirty}
              color="primary"
              variant="outlined"
              onClick={formik.resetForm}
            >
              {t('reset')}
            </Button>
            <Button
              disabled={!formik.dirty || !formik.isValid}
              color="primary"
              variant="contained"
              type="submit"
            >
              {t('save')}
            </Button>
          </Stack>
        </Stack>
      </FormikProvider>
      {openDialog === DIALOGS.ADD_LOCATION && (
        <AddLocationDialog
          onClose={() => setOpenDialog('')}
          onSave={(location) => {
            formik.setFieldValue('location', [location.id])
            setOpenDialog('')
          }}
        />
      )}
    </>
  )
}

export default KitchenPage
