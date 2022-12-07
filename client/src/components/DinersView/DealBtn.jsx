import React from 'react'
import {
  Paper,
  Popper,
  Typography,
  Box,
  useTheme,
  Button,
  ClickAwayListener,
} from '@mui/material'

function DealBtn({ dealDescription }) {
  const theme = useTheme()

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined

  return (
    <div>
      <ClickAwayListener onClickAway={handleClose}>
        <Button
          aria-describedby={id}
          onClick={handleClick}
          variant="contained"
          color="error"
          sx={{ flex: 1 }}
        >
          {'DEAL 4 U'}
        </Button>
      </ClickAwayListener>

      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        placement="bottom-start"
        sx={{ zIndex: 1000 }}
      >
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'center',
            position: 'relative',
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.common.white,
          }}
        >
          <Box sx={{ padding: theme.spacing(1) }}>
            <Typography>{dealDescription}</Typography>
          </Box>
        </Paper>
      </Popper>
    </div>
  )
}

export default DealBtn
