import React from 'react'

import Select from 'components/FormInputs/Select'

import { useLocations } from 'hooks/locations'
import { getLocationName } from 'utils/locations'

const SelectLocations = ({ name, label, ...props }) => {
  const { locations } = useLocations({ mapById: true })

  const locationsOptions = locations ? Object.keys(locations) : []

  const getOptionLabel = (option) => getLocationName(locations?.[option])

  return (
    <Select
      name={name}
      label={label}
      placeholder={`Select one ${name} or more`}
      options={locationsOptions}
      getOptionLabel={getOptionLabel}
      {...props}
    />
  )
}

export default SelectLocations
