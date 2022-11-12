import {
  Autocomplete, Checkbox, CircularProgress, TextField,
} from '@mui/material'
import axios from 'axios'
import { t } from 'i18next'
import React from 'react'

const loadOptions = async (inputValue) => {
  const { data } = await axios.get(`/api/ingredients?q=${inputValue}`)
  return data
}

const getIngredientsByIds = async (ids) => {
  const { data } = await axios.get(`/api/ingredients?ids=${ids.join(',')}`)
  return data
}

function IngredientsSelector({
  filters, setFilters, filterType, disabled,
}) {
  const [restrictedIngredients, setRestrictedIngredients] = React.useState([])
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const setIngredients = async () => {
      const data = await getIngredientsByIds(filters[filterType] || [])
      setRestrictedIngredients(data)
    }
    setIngredients()
  }, [filters])

  // const { ingredients, isLoading, isError } = useIngredients(search)

  const handleInputChange = (newValue) => {
    setInputValue(newValue.replace(/\W/g, ''))
  }

  const handleChangeIngredients = (e, value) => {
    setRestrictedIngredients(value)
    setFilters((currFilters) => ({ ...currFilters, [filterType]: value?.map((v) => v.id) || [] }))
  }

  React.useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true)
      const data = await loadOptions(inputValue)

      if (active) {
        setOptions([...data, ...restrictedIngredients])
        setLoading(false)
      }
    })()

    return () => {
      active = false
    }
  }, [inputValue])

  return (
    <Autocomplete
      readOnly={disabled}
      ListboxProps={{ sx: { maxHeight: '70vh' } }}
      id="ingfredients-select"
      multiple
      open={!disabled && options.length > 0}
      disableCloseOnSelect
      noOptionsText={t('no_options')}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      options={options}
      value={restrictedIngredients}
      onChange={handleChangeIngredients}
      onInputChange={(e, newInputValue) => {
        handleInputChange(newInputValue)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          autoFocus
          label={!disabled && t('ingredients_selector_placeholder')}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {!disabled && params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={({ fullWidth, ...props }, option, { selected }) => (
        <li {...props}>
          <Checkbox
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
    />
  )
}

export default IngredientsSelector
