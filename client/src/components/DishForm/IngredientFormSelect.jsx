import axios from 'axios'
import React from 'react'
import { useFormikContext } from 'formik'
import {
  Box,
  FormControl, FormLabel, InputAdornment, List, ListItem, ListItemText, ListSubheader, TextField, Typography, useTheme,
} from '@mui/material'
import AsyncSelect from 'react-select/async'
import _get from 'lodash/get'
import { useParams } from 'react-router-dom'
import { useKitchenById } from '../../hooks/kitchens'

const loadOptions = async (inputValue) => {
  const { data } = await axios.get(`/api/ingredients?q=${inputValue}`)
  return data
}

const getIngredientsByIds = async (ids) => {
  const { data } = await axios.get(`/api/ingredients?ids=${ids.join(',')}`)
  return data
}

function IngredientFormSelect({ label, name, disableAdditionalPrices = false }) {
  const theme = useTheme()
  const { kitchenId } = useParams()

  const { kitchen } = useKitchenById(kitchenId)

  const {
    values, touched, errors, setFieldValue,
  } = useFormikContext()

  const [localIngredients, setlocalIngredients] = React.useState([])

  const setIngredients = async (ingredient) => {
    const data = await getIngredientsByIds(ingredient.map((ing) => ing.id))
    setlocalIngredients(data)
  }

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '')
    return inputValue
  }

  const handleChangeIngredients = (value) => {
    const modifiedIngredient = value.map((ing) => ({ id: ing.id, type: 'ingredient', price: 0 }))
    setFieldValue(name, modifiedIngredient)
    setIngredients(modifiedIngredient)
  }

  const handleChangeIngredientAdditionalPrice = (ingredientId) => (e) => {
    const modifiedIngredient = _get(values, name).reduce((acc, ing) => {
      if (ing.id === ingredientId) {
        return [...acc, { ...ing, price: e.target.value }]
      }
      return [...acc, ing]
    }, [])
    setFieldValue(name, modifiedIngredient)
  }

  return (
    <Box sx={{ marginTop: theme.spacing(2) }}>
      <Typography variant="h6">{label}</Typography>
      <FormControl fullWidth margin="normal">
        <AsyncSelect
          fullWidth
          defaultOptions
          value={values[name]}
          onChange={handleChangeIngredients}
          isMulti
          cacheOptions
          loadOptions={loadOptions}
          onInputChange={handleInputChange}
          getOptionLabel={(e) => e.name}
          getOptionValue={(e) => e.id}
          closeMenuOnSelect={false}
          placeholder="Type to search ingredients"
        />

        {touched[name] && errors[name] ? (
          <div className="error">{errors[name]}</div>
        ) : null}
      </FormControl>

      {
        !disableAdditionalPrices
        && localIngredients.length > 0
        && (
        <List
          subheader={(
            <ListSubheader component="div" id="nested-list-subheader">
              Additional Price
            </ListSubheader>
        )}
        >
          {
          localIngredients.map((ing, index) => (
            <ListItem key={ing.id} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                sx={{ width: 200 }}
                id="additionalPrice"
                name="additionalPrice"
                type="number"
                value={_get(values, `[${name}][${index}].price`)}
                onChange={handleChangeIngredientAdditionalPrice(ing.id)}
                // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                InputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  startAdornment: <InputAdornment position="start">+</InputAdornment>,
                  endAdornment: <InputAdornment position="end">{kitchen.currency}</InputAdornment>,
                }}
              />
              <ListItemText sx={{ flex: 1, margin: theme.spacing(2) }}>
                {ing.name}
              </ListItemText>

            </ListItem>
          ))
        }
        </List>
        )
      }
    </Box>
  )
}

export default IngredientFormSelect
