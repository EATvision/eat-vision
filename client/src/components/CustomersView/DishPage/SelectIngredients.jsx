import React, { useMemo, useState } from 'react'
import { useField } from 'formik'
import { useDebounce } from 'use-debounce'

import Select from 'components/FormInputs/Select'
import { useIngredientById, useIngredients } from 'hooks/ingredients'

const DEBOUNCE = 500

const SelectIngredients = ({ name, label, multiple, ...props }) => {
  const [, meta, helpers] = useField(name)
  const [inputValue, setInputValue] = useState('')
  const [debouncedName] = useDebounce(inputValue, DEBOUNCE)

  const { ingredient } = useIngredientById(meta.value)

  const handleOnChange = (e, value) => {
    helpers.setValue(value.id).then(() => helpers.setTouched(true))
  }

  const { ingredients } = useIngredients({
    search: debouncedName,
    mapById: true,
  })

  const ingredientsOptions = useMemo(
    () => (ingredients ? Object.values(ingredients) : []),
    [ingredients]
  )

  return (
    <Select
      name={name}
      label={label}
      onInputChange={(_, value) => setInputValue(value)}
      placeholder={
        multiple ? `Select one ${name} or more` : `Select one ${name}`
      }
      multiple={!!multiple}
      options={ingredientsOptions}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      getOptionLabel={(option) => option?.translation_heb || ''}
      value={ingredient || null}
      onChange={handleOnChange}
      {...props}
    />
  )
}

export default SelectIngredients
