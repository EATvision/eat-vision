import React, { useState } from 'react'

import { useTheme } from '@emotion/react'
import { Box, Button, Chip, IconButton, TextField } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import ReactTable from '../ReactTable'
import useTableSettings from '../ReactTable/useTableSettings'
import { useIngredients } from 'hooks/ingredients'
import useIngredientsColumns from './useIngredientsColumns'
import IngredientsDialog from './IngredientsDialog'

const ChipChooser = ({
  title,
  entities,
  getEntitiyLabel = (e) => e.name,
  handleAddEntity,
  handleRemoveEntity,
}) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {title}:
      {handleAddEntity && (
        <IconButton onClick={handleAddEntity}>
          <AddCircleIcon />
        </IconButton>
      )}
      <Box
        sx={{
          margin: `0px ${theme.spacing(1)}`,
          '& > *': {
            margin: `${theme.spacing(1)} !important`,
          },
        }}
      >
        {entities.map((entity) => (
          <Chip
            key={entity._id}
            label={getEntitiyLabel(entity)}
            onDelete={() => handleRemoveEntity(entity._id)}
          />
        ))}
      </Box>
    </Box>
  )
}

const CustomerRowExpander = ({
  row,
  // showAddKitchensButton,
  // onAddKitchenToCustomer,
  // onRemoveKitchenFromCustomer,
}) => {
  const { subIngredients = [] } = row.original
  // const customer = row.original
  return (
    <ChipChooser
      title="Ingredients"
      entities={subIngredients}
      handleAddEntity={() => {}} //TODO - add functions
      handleRemoveEntity={() => {}}
    />
  )
}

const IngrdientsView = () => {
  const theme = useTheme()
  const [ingredientToEdit, setIngredientToEdit] = useState()
  const {
    page,
    setPage,
    rowsPerPage,
    searchQuery,
    setSearchQuery,
    setRowsPerPage,
  } = useTableSettings()

  const {
    ingredients,
    amountOfIngredients,
    // mutate: mutateIngredient,
  } = useIngredients({
    page,
    rowsPerPage,
    search: searchQuery,
    lookUpIngredients: true,
  })

  const columns = useIngredientsColumns()

  const onSearchChange = (e) => setSearchQuery(e.currentTarget.value)
  const onCloseIngredeintDialog = () => setIngredientToEdit(false)
  const onOpenIngredeintDialog = () => setIngredientToEdit(true)
  const onEditIngredient = ({ row }) => {
    const { original: ingredient } = row
    setIngredientToEdit(ingredient)
  }

  return (
    <Box sx={{ p: 4 }}>
      <IngredientsDialog
        ingredient={ingredientToEdit}
        onClose={onCloseIngredeintDialog}
      />
      <Box sx={{ minWidth: '900px', maxWidth: '1100px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > *': {
              margin: theme.spacing(1),
            },
            justifyContent: 'space-between',
          }}
        >
          <TextField
            onChange={onSearchChange}
            label="Search Users"
            type="search"
          />
          <Button
            variant="outlined"
            onClick={onOpenIngredeintDialog}
            startIcon={<AddCircleIcon />}
          >
            Add Ingredient
          </Button>
        </Box>
        <Box sx={{ paddingTop: 4 }}>
          <ReactTable
            page={page}
            data={ingredients}
            columns={columns}
            onEditRow={onEditIngredient}
            dataCount={amountOfIngredients}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
            expandableRowComponent={({ row }) =>
              CustomerRowExpander({
                // showAddKitchensButton:
                //   row?.original?.kitchens?.length < kitchens.length,
                // onAddKitchenToCustomer,
                // onRemoveKitchenFromCustomer: removeKitchenFromCustomer,
                row,
              })
            }
          />
        </Box>
      </Box>
    </Box>
  )
}

export default IngrdientsView
