import React from 'react'
import {
  Alert, AlertTitle, Badge, Box, Button, List, ListItem, Popover, useTheme,
} from '@mui/material'

export default function AskForChangesBtn({ data }) {
  const theme = useTheme()

  const [askForChangesAnchorEl, setAskForChangesAnchorEl] = React.useState(null)

  const dishExcludableComponentsFilteredOut = data?.recipe?.excludable?.filter(
    (component) => component.isFilteredOut,
  )

  const handlePopoverOpen = (event) => {
    setAskForChangesAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAskForChangesAnchorEl(null)
  }

  if (dishExcludableComponentsFilteredOut?.length === 0) return null

  return (
    <Box
      sx={{ marginBottom: theme.spacing(1), marginTop: theme.spacing(1) }}
    >
      <Badge
        color="error"
        badgeContent={dishExcludableComponentsFilteredOut.length}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Button
          variant="contained"
          sx={{ maxWidth: 163, borderRadius: 163 }}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          ASK FOR CHANGES
        </Button>
      </Badge>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={Boolean(askForChangesAnchorEl)}
        anchorEl={askForChangesAnchorEl}
        onClose={handlePopoverClose}
        disableRestoreFocus
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Alert severity="warning">
          <AlertTitle>ASK TO EXCLUDE</AlertTitle>
          <List dense>
            {
              dishExcludableComponentsFilteredOut.map((component) => (
                <ListItem key={component.id}>{component.name}</ListItem>
              ))
            }
          </List>
        </Alert>
      </Popover>
    </Box>
  )
}
