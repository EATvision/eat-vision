import React from 'react'
import { Formik, Form } from 'formik'

import { Button, TextField } from '@mui/material'
import { t } from 'i18next'
import { useKitchen } from '../../contexts/kitchen'
import { useKitchenById } from '../../hooks/kitchens'
import WorkingHours from '../WorkingHours'

function GeneralInfoPage() {
  const { kitchenId } = useKitchen()
  const { kitchen, isLoading } = useKitchenById(kitchenId)

  if (isLoading) return <div>LOADING</div>

  const data = {}
  const fieldName = 'location[working_hours]'

  return (
    <Formik
      initialValues={kitchen}
      validate={() => {
        const errors = {}

        return errors
      }}
      onSubmit={async (values) => {
        console.log(values)
        // try {
        //   if (values?._id) {
        //     await axios.put(`/api/dishes/${values._id}`, values)
        //   } else {
        //     const { _id, ...dishWithNoId } = values
        //     await axios.post('/api/dishes', dishWithNoId)
        //   }
        //   mutateDishes()
        //   navigate('/customers/dishes')
        // } catch (error) {
        //   console.log(error)
        // }
        // setSubmitting(false)
      }}
    >
      {({ values, touched, errors, handleChange }) => (
        <Form>
          <TextField
            required
            margin="normal"
            fullWidth
            id="name"
            name="name"
            label="name"
            value={values.name}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />

          <TextField
            required
            margin="normal"
            fullWidth
            id="website"
            name="website"
            label="website"
            value={values.website}
            onChange={handleChange}
            error={touched.website && Boolean(errors.website)}
            helperText={touched.website && errors.website}
          />

          <TextField
            required
            margin="normal"
            fullWidth
            id="location"
            name="location"
            label="location"
            value={values.location}
            onChange={handleChange}
            error={touched.location && Boolean(errors.location)}
            helperText={touched.location && errors.location}
          />

          <TextField
            required
            margin="normal"
            fullWidth
            id="intentions"
            name="intentions"
            label="intentions"
            value={values.intentions}
            onChange={handleChange}
            error={touched.intentions && Boolean(errors.intentions)}
            helperText={touched.intentions && errors.intentions}
          />

          <TextField
            required
            margin="normal"
            fullWidth
            id="workingHours"
            name="workingHours"
            label="workingHours"
            value={values.workingHours}
            onChange={handleChange}
            error={touched.workingHours && Boolean(errors.workingHours)}
            helperText={touched.workingHours && errors.workingHours}
          />

          <TextField
            required
            margin="normal"
            fullWidth
            id="currency"
            name="currency"
            label="currency"
            value={values.currency}
            onChange={handleChange}
            error={touched.currency && Boolean(errors.currency)}
            helperText={touched.currency && errors.currency}
          />

          <WorkingHours fieldName={fieldName} data={data} />

          <Button color="primary" variant="contained" fullWidth type="submit">
            {t('save')}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default GeneralInfoPage
