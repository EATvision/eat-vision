import React from 'react'
import { useField } from 'formik'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  styled,
  TextField,
  Autocomplete as MuiAutocomplete,
} from '@mui/material'

const Autocomplete = styled(MuiAutocomplete)({
  select: {
    marginTop: '8px',
    marginBottom: '4px',
  },
})

function Select({
  label,
  required,
  helperText,
  fullWidth,
  multiple,
  placeholder,
  ...props
}) {
  const [field, meta, helpers] = useField(props)
  const error = meta.touched && meta.error

  const handleOnChange = (e, value) => {
    helpers.setValue(value).then(() => helpers.setTouched(true))
  }

  return (
    <FormControl
      required={required}
      margin="normal"
      error={!!error}
      fullWidth={fullWidth}
    >
      <FormLabel id={`${label}-select-label`}>{label}</FormLabel>
      <Autocomplete
        autoComplete
        size="small"
        variant="outlined"
        {...field}
        fullWidth={fullWidth}
        onChange={handleOnChange}
        multiple={multiple}
        value={meta.value || (multiple ? [] : '')}
        {...props}
        renderInput={(params) => (
          <TextField
            size="small"
            {...params}
            variant="outlined"
            placeholder={placeholder}
          />
        )}
      />
      {error && (
        <FormHelperText error>
          {typeof error !== 'string' ? JSON.stringify(error) : error}
        </FormHelperText>
      )}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default Select
