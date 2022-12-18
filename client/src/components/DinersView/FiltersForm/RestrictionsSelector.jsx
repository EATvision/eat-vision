import {
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { t } from 'i18next'
import React from 'react'
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material'
import { useDebounce } from 'use-debounce'

import { useGetComponentLabel } from 'hooks/ingredients'

const loadFoodGroupsOptions = async (inputValue) => {
  const { data } = await axios.get(`/api/v1/foodGroups?q=${inputValue}`)
  return data
}

const getFoodGroupsByIds = async (ids) => {
  const { data } = await axios.get(`/api/v1/foodGroups?ids=${ids?.join(',')}`)
  return data
}

const loadIngredientsOptions = async (inputValue) => {
  const { data } = await axios.get(`/api/v1/ingredients?q=${inputValue}`)
  return data
}

const getIngredientsByIds = async (ids) => {
  const { data } = await axios.get(`/api/v1/ingredients?ids=${ids?.join(',')}`)
  return data
}

function RestrictionsSelector({ filters, setFilters, filterType, disabled }) {
  const theme = useTheme()
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [debouncedInputValue] = useDebounce(inputValue, 500)

  const handleChangeInputValue = (e) => {
    setInputValue(e.target.value)
  }

  const handleClearInputValue = () => {
    setInputValue('')
  }

  React.useEffect(() => {
    let active = true
    const updateOptions = async () => {
      setLoading(true)

      const selectedFoodGroupsData =
        filters[filterType]?.length > 0
          ? await getFoodGroupsByIds(filters[filterType])
          : []
      const selectedIngredientsData =
        filters[filterType]?.length > 0
          ? await getIngredientsByIds(filters[filterType])
          : []
      const foodGroupsData = await loadFoodGroupsOptions(debouncedInputValue)
      const ingredientsData = await loadIngredientsOptions(debouncedInputValue)

      if (active) {
        const uniqueIds = []

        const updatedOptions = [
          ...foodGroupsData,
          ...ingredientsData,
          ...selectedFoodGroupsData,
          ...selectedIngredientsData,
        ].filter((element) => {
          const isDuplicate = uniqueIds.includes(element.id)

          if (!isDuplicate) {
            uniqueIds.push(element.id)

            return true
          }

          return false
        })

        setOptions(updatedOptions)
        setLoading(false)
      }
    }

    updateOptions()

    return () => {
      active = false
    }
  }, [filterType, filters, debouncedInputValue])

  // const handleClickAddNewIngredient = (ing) => () => {
  //   console.log(`Adding new ingredient ${ing} request `)
  // }
  // const handleFilterOptions = (ops, params) => {
  //   const filtered = filter(ops, params)

  //   if (params.inputValue !== '') {
  //     filtered.push({
  //       freeSolo: true,
  //       inputValue: params.inputValue,
  //       title: `Add "${params.inputValue}"`,
  //     })
  //   }

  //   return filtered
  // }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <TextField
        autoFocus
        fullWidth
        variant="standard"
        value={inputValue}
        onChange={handleChangeInputValue}
        label={!disabled && t('ingredients_selector_placeholder')}
        sx={{ marginTop: theme.spacing(2) }}
        InputProps={{
          endAdornment: (
            <>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {!loading && inputValue?.length > 0 && (
                <IconButton sx={{ padding: 0 }} onClick={handleClearInputValue}>
                  <CloseIcon size="small" />
                </IconButton>
              )}
            </>
          ),
        }}
      />

      {options.length === 0 ? (
        <Typography
          sx={{
            fontSize: '2.5rem',
            textAlign: 'center',
            margin: 'auto',
            flex: 1,
            alignItems: 'center',
            display: 'flex',
            color: 'rgb(128 128 128 / 25%)',
          }}
        >
          {t('empty_components_restriction_selector')}
        </Typography>
      ) : (
        <List sx={{ flex: 1, overflow: 'auto', marginBottom: '50px' }}>
          {options?.map((option) => (
            <OptionListItem
              key={option.id}
              data={option}
              filters={filters}
              setFilters={setFilters}
              filterType={filterType}
            />
          ))}
        </List>
      )}
    </Box>
  )
}

const OptionListItem = ({ data, filters, setFilters, filterType }) => {
  const getOptionLabel = useGetComponentLabel()

  const isSelected = React.useMemo(
    () => filters?.[filterType]?.includes(data.id),
    [data.id, filterType, filters]
  )

  const handleClickOption = () => {
    const updatedOptions = filters?.[filterType]?.includes(data.id)
      ? filters[filterType].filter((op) => op !== data.id)
      : [...filters[filterType], data.id]

    setFilters({
      ...filters,
      [filterType]: updatedOptions,
    })
  }

  return (
    <Box>
      <ListItem
        button
        onClick={handleClickOption}
        secondaryAction={isSelected && <CheckIcon />}
      >
        <ListItemText>{getOptionLabel(data)}</ListItemText>
      </ListItem>

      <Divider component="li" />
    </Box>
  )
}

export default RestrictionsSelector
