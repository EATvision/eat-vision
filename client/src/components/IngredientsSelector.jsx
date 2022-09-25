import { t } from 'i18next'
import axios from 'axios'
import React from 'react'
import AsyncSelect from 'react-select/async'
import { Typography, useTheme } from '@mui/material'

const loadOptions = async (inputValue) => {
  const { data } = await axios.get(`/api/ingredients?q=${inputValue}`)
  return data
}

const getIngredientsByIds = async (ids) => {
  const { data } = await axios.get(`/api/ingredients?ids=${ids.join(',')}`)
  return data
}

function DietsSelector({ filters, setFilters }) {
  const theme = useTheme()
  const [avoidedIngredients, setAvoidedIngredients] = React.useState([])

  React.useEffect(() => {
    const setIngredients = async () => {
      const data = await getIngredientsByIds(filters.avoid)
      setAvoidedIngredients(data)
    }
    setIngredients()
  }, [filters])

  // const { ingredients, isLoading, isError } = useIngredients(search)

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '')
    return inputValue
  }

  const handleChangeIngredients = (value) => {
    setAvoidedIngredients(value)
    setFilters((currFilters) => ({ ...currFilters, avoid: value.map((v) => v.id) }))
  }

  // if (isError) return <div>{JSON.stringify(isError)}</div>
  return (
    <>
      <Typography variant="h4" sx={{ textAlign: 'center', margin: theme.spacing(3) }}>{t('things_i_avoid')}</Typography>
      <Typography variant="h5" sx={{ textAlign: 'center', margin: theme.spacing(3) }}>{t('choose_relevant_options')}</Typography>

      <AsyncSelect
        defaultOptions
        value={avoidedIngredients}
        onChange={handleChangeIngredients}
        isMulti
        cacheOptions
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        getOptionLabel={(e) => e.name}
        getOptionValue={(e) => e.id}
        closeMenuOnSelect={false}
      />

      <div className="flex flex-col w-1/2 mx-auto m-auto mt-4">
        {/* {
          isLoading
            ? <div>LOADING</div>
            : (
              <div>
                {
                  ingredients.map((ingredient) => (
                    <div key={ingredient.id}>{ingredient.name}</div>
                  ))
                }
              </div>
            )
        } */}
      </div>
    </>
  )
}

export default DietsSelector
