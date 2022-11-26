import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  List,
  ListItem,
  Stack,
  styled,
  Typography,
} from '@mui/material'

import { useKitchen } from 'contexts/kitchen'
import { useMenusByKitchenId } from 'hooks/menus'

const MenuCard = styled(ListItem)(({ theme }) => ({
  border: '1px solid',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(0.5),
  borderColor: theme.palette.divider,
}))

function MenusManagerPage() {
  const navigate = useNavigate()
  const { kitchenId } = useKitchen()
  const { menus, isLoading } = useMenusByKitchenId(kitchenId)

  if (isLoading) return 'Loading...'

  const handleOnClickMenu = (menuId) => () => {
    navigate(`/customers/menus/${menuId}`)
  }

  return (
    <Stack direction="column">
      <Typography variant="h4">Menus</Typography>
      <Stack direction="row" justifyContent="flex-end">
        <Button variant="contained" as={Link} to={'/customers/menus/new'}>
          Add Menu
        </Button>
      </Stack>
      <Box py={3}>
        <List>
          {menus?.map((menu) => (
            <MenuCard
              button
              key={menu?.id}
              onClick={handleOnClickMenu(menu?.id)}
            >
              {menu.name}
            </MenuCard>
          ))}
        </List>
      </Box>
    </Stack>
  )
}

export default MenusManagerPage
