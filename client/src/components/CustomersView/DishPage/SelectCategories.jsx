import React, { useMemo } from 'react'

import Select from 'components/FormInputs/Select'

import { useKitchen } from 'contexts/kitchen'
import { useCategories } from 'hooks/categories'

const SelectCategories = ({ multiple, ...rest }) => {
  const { kitchenId } = useKitchen()
  const { categories, isLoading: isLoadingCategories } = useCategories({
    kitchens: [kitchenId],
    mapById: true,
  })

  const options = useMemo(
    () => (categories ? Object.keys(categories) : []),
    [categories]
  )

  return (
    <Select
      options={options}
      getOptionLabel={(option) =>
        (categories && categories[option]?.name) || ''
      }
      disabled={isLoadingCategories}
      multiple={multiple}
      {...rest}
    />
  )
}

export default SelectCategories
