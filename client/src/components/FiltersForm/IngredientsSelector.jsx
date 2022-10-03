import axios from 'axios'
import React from 'react'
import AsyncSelect from 'react-select/async'

const loadOptions = async (inputValue) => {
  const { data } = await axios.get(`/api/ingredients?q=${inputValue}`)
  return data
}

const getIngredientsByIds = async (ids) => {
  const { data } = await axios.get(`/api/ingredients?ids=${ids.join(',')}`)
  return data
}

function IngredientsSelector({ filters, setFilters, filterType }) {
  const [restrictedIngredients, setRestrictedIngredients] = React.useState([])

  React.useEffect(() => {
    const setIngredients = async () => {
      const data = await getIngredientsByIds(filters[filterType])
      setRestrictedIngredients(data)
    }
    setIngredients()
  }, [filters])

  // const { ingredients, isLoading, isError } = useIngredients(search)

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '')
    return inputValue
  }

  const handleChangeIngredients = (value) => {
    setRestrictedIngredients(value)
    setFilters((currFilters) => ({ ...currFilters, [filterType]: value.map((v) => v.id) }))
  }

  // if (isError) return <div>{JSON.stringify(isError)}</div>
  return (
    <AsyncSelect
      defaultOptions
      value={restrictedIngredients}
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
  )
}

export default IngredientsSelector
