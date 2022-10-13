import axios from 'axios'
import React from 'react'
import { useFormikContext } from 'formik'
import {
  Box,
  FormControl, InputAdornment, List, ListItem, ListItemText, ListSubheader, TextField, Typography, useTheme,
} from '@mui/material'
import AsyncSelect from 'react-select/async'
import _get from 'lodash/get'
import { useParams } from 'react-router-dom'
import { useKitchenById } from '../../../hooks/kitchens'

const loadOptions = async (inputValue) => {
  const { data } = await axios.get(`/api/dishes?q=${inputValue}`)
  return data
}

const getDishesByIds = async (ids) => {
  const { data } = await axios.get(`/api/dishes?ids=${ids.join(',')}`)
  return data
}

function DishFormSelect({ label, name, disableAdditionalPrices = false }) {
  const theme = useTheme()
  const { kitchenId } = useParams()

  const { kitchen } = useKitchenById(kitchenId)

  const {
    values, touched, errors, setFieldValue,
  } = useFormikContext()

  const [localDishes, setlocalDishes] = React.useState([])

  const setDishes = async (dish) => {
    const data = await getDishesByIds(dish.map((d) => d.id))
    setlocalDishes(data)
  }

  React.useEffect(() => {
    setDishes(_get(values, name))
  }, [values, name])

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '')
    return inputValue
  }

  const handleChangeDishes = (value) => {
    const modifiedDish = value.map((d) => ({ id: d._id || d.id, type: 'dish', price: 0 }))
    setFieldValue(name, modifiedDish)
    setDishes(modifiedDish)
  }

  const handleChangeDishAdditionalPrice = (dishId) => (e) => {
    const modifiedDish = _get(values, name).reduce((acc, d) => {
      if (d.id === dishId) {
        return [...acc, { ...d, price: e.target.value }]
      }
      return [...acc, d]
    }, [])
    setFieldValue(name, modifiedDish)
  }

  return (
    <Box sx={{ marginTop: theme.spacing(2) }}>
      <Typography variant="h6">{label}</Typography>
      <FormControl fullWidth margin="normal">
        <AsyncSelect
          fullWidth
          defaultOptions
          value={localDishes}
          onChange={handleChangeDishes}
          isMulti
          cacheOptions
          loadOptions={loadOptions}
          onInputChange={handleInputChange}
          getOptionLabel={(e) => e.name}
          getOptionValue={(e) => e.id}
          closeMenuOnSelect={false}
          placeholder="Type to search dishes"
        />

        {touched[name] && errors[name] ? (
          <div className="error">{errors[name]}</div>
        ) : null}
      </FormControl>

      {
        !disableAdditionalPrices
        && localDishes.length > 0
        && (
        <List
          subheader={(
            <ListSubheader component="div" id="nested-list-subheader">
              Additional Price
            </ListSubheader>
        )}
        >
          {
          localDishes.map((d, index) => (
            <ListItem key={d.id || d._id} sx={{ display: 'flex', alignItems: 'center' }}>
              <ListItemText sx={{ flex: 1, margin: theme.spacing(2) }}>
                {d.name}
              </ListItemText>
              <TextField
                sx={{ width: 150 }}
                id="additionalPrice"
                name="additionalPrice"
                type="number"
                value={_get(values, `[${name}][${index}].price`)}
                onChange={handleChangeDishAdditionalPrice(d.id)}
                // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                InputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  startAdornment: <InputAdornment position="start">+</InputAdornment>,
                  endAdornment: <InputAdornment position="end">{kitchen?.currency}</InputAdornment>,
                }}
              />
            </ListItem>
          ))
        }
        </List>
        )
      }
    </Box>
  )
}

export default DishFormSelect
