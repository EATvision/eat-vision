import React, { useMemo, useState } from 'react'
import { useField } from 'formik'
import { useDebounce } from 'use-debounce'

import { useKitchen } from 'contexts/kitchen'
import { useDishById, useDishes } from 'hooks/dishes'

import Select from 'components/FormInputs/Select'

const DEBOUNCE = 500

const SelectDishes = ({ name, label, multiple, ...props }) => {
  const [, meta, helpers] = useField(name)
  const { kitchenId } = useKitchen()
  const [inputValue, setInputValue] = useState('')
  const [debouncedName] = useDebounce(inputValue, DEBOUNCE)

  const { dish } = useDishById(meta.value)

  const handleOnChange = (e, value) => {
    helpers.setValue(value.id).then(() => helpers.setTouched(true))
  }

  const { dishes } = useDishes(
    { search: debouncedName, kitchens: [kitchenId] },
    { mapById: true }
  )

  const dishesOptions = useMemo(
    () => (dishes ? Object.values(dishes) : []),
    [dishes]
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
      options={dishesOptions}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      getOptionLabel={(option) => option?.name || ''}
      value={dish || null}
      onChange={handleOnChange}
      {...props}
    />
  )
}

export default SelectDishes
