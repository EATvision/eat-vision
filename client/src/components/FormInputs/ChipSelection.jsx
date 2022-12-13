import React, { useMemo, useState } from 'react'
import { useField } from 'formik'
import {
  Autocomplete,
  Chip,
  Collapse,
  FormControl,
  FormLabel,
  IconButton,
  TextField,
  useTheme,
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Box } from '@mui/system'
import _uniqueBy from 'lodash/uniqBy'

const ChipSelection = ({
  label,
  required,
  fullWidth,
  options,
  loading,
  onSearchChange,
  getId = (option) => option._id,
  getLabel = (option) => option.name,
  ...props
}) => {
  const theme = useTheme()

  const [, meta, helpers] = useField(props)

  const [searchValue, setSearchValue] = useState('')
  const [showAutoComplete, setShowAutoComplete] = useState(false)

  const addChip = (value) => {
    if (!value) return

    const newChips = _uniqueBy([...meta.value, value], (option) => option._id)
    helpers.setValue(newChips).then(() => helpers.setTouched(true))
    setSearchValue('')
  }
  const deleteOption = (value) => {
    const newList = meta.value.filter((currValue) => currValue !== value)
    helpers.setValue(newList).then(() => helpers.setTouched(true))
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    if (onSearchChange) {
      onSearchChange(e.target.value)
    }
  }

  const selectOptions = useMemo(() => {
    const selectedOptionIds = meta.value.map((option) => option._id)
    return options.filter((option) => !selectedOptionIds.includes(option._id))
  }, [meta.value, options])

  return (
    <FormControl required={required} margin="normal">
      <FormLabel id={`${label}-select-label`}>{label}</FormLabel>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            margin: `0px ${theme.spacing(2)}`,
          }}
        >
          <IconButton
            onClick={() =>
              setShowAutoComplete((showAutoComplete) => !showAutoComplete)
            }
          >
            <AddCircleIcon />
          </IconButton>
          <Collapse orientation="horizontal" in={showAutoComplete}>
            <Autocomplete
              sx={{ width: theme.spacing(23) }}
              // autoComplete
              size="small"
              isOptionEqualToValue={getId}
              variant="outlined"
              loading={loading}
              autoSelect
              inputValue={searchValue}
              options={selectOptions || []}
              getOptionLabel={getLabel}
              onChange={(e, newValue) => addChip(newValue)}
              renderInput={(params) => (
                <TextField
                  size="md"
                  {...params}
                  // value={searchValue}
                  onChange={handleSearch}
                  variant="outlined"
                  fullWidth={fullWidth}
                  margin="dense"
                  // placeholder={placeholder}
                />
              )}
            />
          </Collapse>
        </Box>
        {(meta.value || []).map((option) => (
          <Chip
            sx={{ margin: theme.spacing(0.5) }}
            key={getId(option)}
            label={getLabel(option)}
            onDelete={() => deleteOption(option)}
          />
        ))}
      </Box>
    </FormControl>
  )
}

export default ChipSelection
