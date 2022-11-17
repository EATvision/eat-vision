import axios from 'axios'
import React from 'react'
import { Button, Box, TextField, useTheme, InputAdornment } from '@mui/material'
import { Formik, Form } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'

import DishFormSelect from './DishFormSelect'
import IngredientFormSelect from './IngredientFormSelect'
import { useKitchenById } from '../../../hooks/kitchens'
import { useDishes } from '../../../api/dishes'

const initialDish = {
  name: '',
  description: '',
  price: 0,
  categories: [],
  recipe: {
    mandatory: [],
    excludable: [],
    putaside: [],
    choice: [],
    sideDish: [],
    addableIngredients: [],
    addableDishes: [],
  },
}

function DishForm({ data }) {
  const theme = useTheme()
  const navigate = useNavigate()
  const { kitchenId } = useParams()

  const { kitchen } = useKitchenById(kitchenId)
  const { mutate: mutateDishes } = useDishes()

  return (
    <Box sx={{ padding: theme.spacing(2), textAlign: 'start' }}>
      <Formik
        initialValues={data || initialDish}
        validate={() => {
          const errors = {}

          return errors
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (values?._id) {
              await axios.put(`/api/dishes/${values._id}`, values)
            } else {
              // eslint-disable-next-line no-unused-vars
              const { _id, ...dishWithNoId } = values
              await axios.post('/api/dishes', dishWithNoId)
            }
            mutateDishes()
            navigate('/customers/dishes')
          } catch (error) {
            console.log(error)
          }
          setSubmitting(false)
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
              margin="normal"
              fullWidth
              id="description"
              name="description"
              label="description"
              type="description"
              value={values.description}
              onChange={handleChange}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />

            <TextField
              margin="normal"
              fullWidth
              id="price"
              name="price"
              label="price"
              type="number"
              InputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                endAdornment: (
                  <InputAdornment position="start">
                    {kitchen?.currency}
                  </InputAdornment>
                ),
              }}
              value={values.price}
              onChange={handleChange}
              error={touched.price && Boolean(errors.price)}
              helperText={touched.price && errors.price}
            />

            <IngredientFormSelect
              label="mandatory ingredients"
              name="recipe.mandatory"
              disableAdditionalPrices
            />

            <IngredientFormSelect
              label="choice ingredients"
              name="recipe.choice"
            />

            <IngredientFormSelect
              label="excludable ingredients"
              name="recipe.excludable"
              disableAdditionalPrices
            />

            <DishFormSelect
              label="sideDish ingredients"
              name="recipe.sideDish"
              disableAdditionalPrices
            />

            <IngredientFormSelect
              label="addable ingredients"
              name="recipe.addableIngredients"
            />

            <DishFormSelect
              label="addable dishes"
              name="recipe.addableDishes"
            />

            <Button color="primary" variant="contained" fullWidth type="submit">
              {data?._id ? 'Save' : 'Submit'}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default DishForm
