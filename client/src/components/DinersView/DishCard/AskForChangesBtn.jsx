import React from 'react'
import {
  Button,
  List,
  ListItem,
  Paper,
  Popover,
  Typography,
  Box,
  useTheme,
  Badge,
} from '@mui/material'
import { t } from 'i18next'

import waiterSrc from '../../../images/waiter_transparent_halfbody.png'
import { useGetComponentLabel } from 'hooks/ingredients'

function AskForChangesBtn({ dishExcludableComponentsFilteredOut }) {
  const theme = useTheme()
  const getComponentLabel = useGetComponentLabel()

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <Badge
        color="error"
        invisible={!dishExcludableComponentsFilteredOut}
        badgeContent={dishExcludableComponentsFilteredOut?.length}
        sx={{ width: '100%' }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Button
          aria-describedby={id}
          variant="contained"
          color="secondary"
          size="small"
          fullWidth
          onClick={handleClick}
          fullWudth
          sx={{
            fontSize: 12,
            fontStyle: 'italic',
            color: theme.palette.common.white,
            borderRadius: 50,
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
          }}
          disabled={open}
        >
          {t('ask_for_changes')}
        </Button>
      </Badge>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {dishExcludableComponentsFilteredOut?.length > 0 && (
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
              <Typography
                sx={{ lineHeight: 1.2, fontWeight: 'bold', fontSize: 20 }}
              >
                {t('my_reccomendations_for_you')}
              </Typography>
              <List dense disablePadding sx={{ fontSize: 16 }}>
                {dishExcludableComponentsFilteredOut.map((component) => (
                  <ListItem
                    key={component.id}
                    // disableGutters
                    disablePadding
                    dense
                  >
                    {`${t('ask_without_the')} ${getComponentLabel(component)}`}
                  </ListItem>
                ))}
              </List>
            </Box>

            <img alt="waiter" src={waiterSrc} width={100} loading="lazy" />
          </Paper>
        )}
      </Popover>
    </>
  )
}

export default AskForChangesBtn
