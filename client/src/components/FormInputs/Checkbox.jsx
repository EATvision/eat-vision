/* eslint-disable no-shadow */
import React from 'react'
import { useField } from 'formik'
import {
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox as MuiCheckbox,
} from '@mui/material'

function Checkbox({ label, required, helperText, ...props }) {
  const [, meta, helpers] = useField(props)

  const error = meta.touched && meta.error

  const handleOnChange = (event) => {
    helpers.setValue(event.target.checked).then(() => helpers.setTouched(true))
  }

  return (
    <FormControl required={required} margin="normal" error={!!error}>
      <FormControlLabel
        control={
          <MuiCheckbox
            checked={!!meta.value}
            onChange={handleOnChange}
            {...props}
          />
        }
        label={label}
      />

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {error && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  )
}

export default Checkbox
