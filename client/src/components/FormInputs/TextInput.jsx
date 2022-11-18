import React, { useEffect, useState } from 'react'
import { useField } from 'formik'
import { useDebouncedCallback } from 'use-debounce'
import {
  TextField,
  FormLabel,
  FormControl,
  FormHelperText,
} from '@mui/material'

function TextInput({ label, required, debounce = 200, helperText, ...props }) {
  const [field, meta, helpers] = useField(props)
  const [value, setValue] = useState(meta.value ?? '')

  const debouncedSetFieldValue = useDebouncedCallback((...props) => {
    helpers.setValue(...props).then(() => helpers.setTouched(true))
  }, debounce)

  const error = meta.touched && meta.error

  useEffect(() => {
    setValue(meta.value ?? '')
  }, [meta.value])

  const handleOnChange = ({ target }) => {
    const { value } = target
    setValue(value)
    debouncedSetFieldValue(value)
  }

  return (
    <FormControl required={required} margin="normal" error={!!error}>
      <FormLabel>{label}</FormLabel>
      <TextField
        size="small"
        margin="dense"
        variant="outlined"
        {...field}
        {...props}
        value={meta.value ?? ''}
        {...(debounce && { onChange: handleOnChange, value })}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  )
}

export default TextInput
