import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  createFilterOptions,
  TextField,
} from '@mui/material'
import axios from 'axios'
import { t } from 'i18next'
import React from 'react'
import { useGetComponentLabel } from '../../../hooks/ingredients'

const filter = createFilterOptions()

const loadOptions = async (inputValue) => {
  const { data } = await axios.get(`/api/ingredients?q=${inputValue}`)
  return data
}

const getIngredientsByIds = async (ids) => {
  const { data } = await axios.get(`/api/ingredients?ids=${ids.join(',')}`)
  return data
}

function IngredientsSelector({ filters, setFilters, filterType, disabled }) {
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
  }, [filterType, filters])

  const handleInputChange = (newValue) => {
    setInputValue(newValue)
  }

  const handleChangeIngredients = (e, value) => {
    setRestrictedIngredients(value)
    setFilters({
      ...filters,
      [filterType]: value?.map((v) => v.id) || [],
    })
  }

  React.useEffect(() => {
    let active = true
    ;(async () => {
      setLoading(true)
      const data = await loadOptions(inputValue)

      if (active) {
        const uniqueIds = []

        const updatedOptions = [...data, ...restrictedIngredients].filter(
          (element) => {
            const isDuplicate = uniqueIds.includes(element.id)

            if (!isDuplicate) {
              uniqueIds.push(element.id)

              return true
            }

            return false
          }
        )

        setOptions(updatedOptions)
        setLoading(false)
      }
    })()

    return () => {
      active = false
    }
  }, [inputValue, restrictedIngredients])

  const handleClickAddNewIngredient = (ing) => () => {
    console.log(`Adding new ingredient ${ing} request `)
  }
  // eslint-disable-next-line no-unused-vars
  const handleFilterOptions = (ops, params) => {
    const filtered = filter(ops, params)

    if (params.inputValue !== '') {
      filtered.push({
        freeSolo: true,
        inputValue: params.inputValue,
        title: `Add "${params.inputValue}"`,
      })
    }

    return filtered
  }

  const getOptionLabel = useGetComponentLabel()

  return (
    <Autocomplete
      readOnly={disabled}
      ListboxProps={{ sx: { maxHeight: '70vh' } }}
      id="ingfredients-select"
      multiple
      open={!disabled && options.length > 0}
      // disableCloseOnSelect
      noOptionsText={t('no_options')}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={getOptionLabel}
      options={options}
      value={restrictedIngredients}
      onChange={handleChangeIngredients}
      onInputChange={(e, newInputValue, reason) => {
        if (reason !== 'reset') handleInputChange(newInputValue)
      }}
      // freeSolo
      // filterOptions={handleFilterOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          autoFocus
          variant="standard"
          value={inputValue}
          label={!disabled && t('ingredients_selector_placeholder')}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {!disabled && params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      // eslint-disable-next-line no-unused-vars
      renderOption={({ fullWidth, ...props }, option, { selected }) =>
        option.name ? (
          <li {...props} key={option.id}>
            <Checkbox style={{ marginRight: 8 }} checked={selected} />
            {getOptionLabel(option)}
          </li>
        ) : (
          <div
            {...props}
            key={option.title}
            onClick={handleClickAddNewIngredient(option.title)}
          >
            {option.title}
          </div>
        )
      }
    />
  )
}

export default IngredientsSelector
