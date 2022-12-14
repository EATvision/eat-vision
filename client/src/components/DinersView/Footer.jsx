import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { AppBar, Badge, Box, CssBaseline, Fab, Toolbar } from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import waiterSrc from '../../images/waiter_transparent_halfbody.png'
import { useDinerOrder } from 'contexts/order'
import SettingsBtn from './SettingsBtn'
import UserFiltersBtn from './UserFiltersBtn'
import UserFiltersSwitch from './UserFiltersSwitch'

const StyledBadge = styled(Badge)({
  position: 'absolute',
  zIndex: 101,
  top: -30,
  left: 0,
  right: 0,
  width: 75,
  height: 75,
  margin: '0 auto',
})

const StyledFab = styled(Fab)({
  width: 75,
  height: 75,
  border: '1px solid #e9e9e9',
  zIndex: 0,
  overflow: 'hidden',
})

export default function Footer() {
  const theme = useTheme()

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          top: 'auto',
          bottom: 0,
          backgroundColor: '#E9E9E9',
          pddingTop: theme.spacing(1),
        }}
      >
        <Toolbar>
          <UserFiltersSwitch />
          <Box sx={{ flexGrow: 1 }} />

          <MyOrderWrapper>
            {({ onClick, disabled }) => {
              return (
                <StyledFab
                  color="secondary"
                  aria-label="add"
                  onClick={onClick}
                  disabled={disabled}
                >
                  <img src={waiterSrc} />
                  {/* <RaiseHandIcon style={{ fontSize: '2.75rem', color: 'white' }} /> */}
                </StyledFab>
              )
            }}
          </MyOrderWrapper>

          <Box sx={{ flexGrow: 1 }} />
          <SettingsBtn />

          <UserFiltersBtn />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

function MyOrderWrapper({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { kitchenId, menuId } = useParams()
  const dinerOrder = useDinerOrder()

  const disabled = location.pathname.includes('/myorder')

  const numberOfDishesInMyOrder = dinerOrder?.order.length

  const handleClickMyOrder = () => {
    if (kitchenId && menuId) {
      navigate(`/diners/kitchens/${kitchenId}/menus/${menuId}/myorder`)
    } else {
      navigate(-1)
    }
  }

  return (
    <StyledBadge
      color="error"
      overlap="circular"
      invisible={numberOfDishesInMyOrder === 0}
      badgeContent={numberOfDishesInMyOrder}
    >
      {children({ onClick: handleClickMyOrder, disabled })}
    </StyledBadge>
  )
}
