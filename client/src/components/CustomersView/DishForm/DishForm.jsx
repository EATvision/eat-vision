import axios from 'axios'
import React from 'react'
import {
  Button, Box, TextField, useTheme, InputAdornment,
} from '@mui/material'
import {
  Formik,
  Form,
} from 'formik'
import { useParams } from 'react-router-dom'

import DishFormSelect from './DishFormSelect'
import IngredientFormSelect from './IngredientFormSelect'
import { useKitchenById } from '../../../hooks/kitchens'

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

function DishForm() {
  const theme = useTheme()
  const { kitchenId } = useParams()

  const { kitchen } = useKitchenById(kitchenId)

  return (
    <Box sx={{ padding: theme.spacing(2), textAlign: 'start' }}>
      <h1>Any place in your app!</h1>
      <Formik
        initialValues={initialDish}
        validate={(values) => {
          const errors = {}

          return errors
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await axios.post('/api/dishes', values)
          } catch (error) {
            console.log(error)
          }
          setSubmitting(false)
        }}
      >
        {
          ({
            values, touched, errors, handleChange,
          }) => (
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
                  endAdornment: <InputAdornment position="start">{kitchen.currency}</InputAdornment>,
                }}
                value={values.price}
                onChange={handleChange}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
              />

              <IngredientFormSelect label="mandatory ingredients" name="recipe.mandatory" disableAdditionalPrices />

              <IngredientFormSelect label="choice ingredients" name="recipe.choice" />

              <IngredientFormSelect label="excludable ingredients" name="recipe.excludable" disableAdditionalPrices />

              <DishFormSelect label="sideDish ingredients" name="recipe.sideDish" disableAdditionalPrices />

              <IngredientFormSelect label="addable ingredients" name="recipe.addableIngredients" />

              <DishFormSelect label="addable dishes" name="recipe.addableDishes" />

              <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </Form>
          )
        }
      </Formik>
    </Box>
  )
}

export default DishForm
