import React, { useState, useCallback } from 'react'

import {
  Chip,
  Select,
  Button,
  Switch,
  Dialog,
  MenuItem,
  useTheme,
  TextField,
  FormLabel,
  IconButton,
  InputLabel,
  Typography,
  FormControl,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControlLabel,
} from '@mui/material'
import { Box } from '@mui/system'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import { useKitchens } from 'hooks/kitchens'
import useCustomers from 'hooks/admin/useCustomers'

import ReactTable from '../ReactTable'
import useCustomerActions from './useCustomerActions'
import useCustomerColumns from './useCustomerColumns'
import useTableSettings from '../ReactTable/useTableSettings'

const KitchensDisplay = ({
  kitchens,
  showAddKitchensButton,
  addKitchen,
  removeKitchen,
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
      Kitchens:
      {showAddKitchensButton && (
        <IconButton onClick={addKitchen}>
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
        {kitchens.map((kitchen) => (
          <Chip
            key={kitchen._id}
            label={kitchen.name}
            onDelete={() => removeKitchen(kitchen._id)}
          />
        ))}
      </Box>
    </Box>
  )
}
const CustomerRowExpander = ({
  row,
  showAddKitchensButton,
  onAddKitchenToCustomer,
  onRemoveKitchenFromCustomer,
}) => {
  const { kitchens } = row.original
  const customer = row.original
  return (
    <KitchensDisplay
      kitchens={kitchens}
      addKitchen={() => onAddKitchenToCustomer(customer)}
      removeKitchen={(kitchenId) =>
        onRemoveKitchenFromCustomer(customer, kitchenId)
      }
      showAddKitchensButton={showAddKitchensButton}
    />
  )
}

const KitchenSelect = ({ chosenKitchen, customer = {}, setChosenKitchen }) => {
  const { kitchens = [], isLoading: isKitchensLoading } = useKitchens()

  const { kitchens: customerKitchen = [] } = customer
  const customerKitchenIds = customerKitchen.map((kitchen) => kitchen._id)

  const filteredKitchens = kitchens.filter(
    (kitchen) => !customerKitchenIds.includes(kitchen._id)
  )

  if (isKitchensLoading) return 'loading kitchens...'

  return (
    <Select
      value={chosenKitchen}
      label="Kitchen"
      onChange={(event) => setChosenKitchen(event.target.value)}
    >
      {filteredKitchens.map((kitchen) => (
        <MenuItem key={kitchen._id} value={kitchen._id}>
          {kitchen.name}
        </MenuItem>
      ))}
    </Select>
  )
}

const ActionDialog = ({
  open,
  onClose,
  disableSave,
  onSaveClick,
  dialogTitle,
  dialogContent,
}) => {
  const theme = useTheme()

  return (
    <Dialog open={open}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <Box sx={{ padding: theme.spacing(1) }}>{dialogContent}</Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>exit</Button>
        <Button disabled={disableSave} onClick={onSaveClick}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
const KitchensDialog = ({
  open,
  onClose,
  customer = {},
  addKitchenToCustomer,
}) => {
  const theme = useTheme()

  const [chosenKitchen, setChosenKitchen] = useState('')

  const onSaveClick = () => addKitchenToCustomer(customer, chosenKitchen)
  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      disableSave={!chosenKitchen}
      onSaveClick={onSaveClick}
      dialogTitle="Add Kitchen to customer"
      dialogContent={
        <>
          <Typography sx={{ paddingBottom: theme.spacing(1) }}>
            Please choose a kitchen to add:
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Kitchen</InputLabel>
            <KitchenSelect
              customer={customer}
              chosenKitchen={chosenKitchen}
              setChosenKitchen={setChosenKitchen}
            />
          </FormControl>
        </>
      }
    />
  )
}

const CustomerDialog = ({ open, onSave, onClose, customer = {} }) => {
  const theme = useTheme()

  const [customerName, setCustomerName] = useState(customer.name || '')
  const [isSuspended, setIsSuspended] = useState(customer.isSuspended || false)
  const onSaveClick = () =>
    onSave({ ...customer, name: customerName, isSuspended })

  const onCustomerNameChange = (e) => setCustomerName(e.target.value)
  const handleIsSuspendedChange = (event) => {
    setIsSuspended(event.target.checked)
  }
  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      onSaveClick={onSaveClick}
      dialogTitle="Edit Customer"
      dialogContent={
        <Box
          sx={{
            '& > *': {
              margin: `${theme.spacing(1)} !important`,
            },
          }}
        >
          <Typography sx={{ paddingBottom: theme.spacing(1) }}>
            Please choose a kitchen to add:
          </Typography>
          <FormControl fullWidth>
            <FormLabel>Name</FormLabel>
            <TextField
              variant="outlined"
              value={customerName}
              onChange={onCustomerNameChange}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={isSuspended}
                onChange={handleIsSuspendedChange}
              />
            }
            label="Is Suspended"
          />
        </Box>
      }
    />
  )
}

const KITCHEN_DIALOG = 'kitchen_dialog'
const CUSTOMER_DIALOG = 'customer_dialog'

const CustomersView = () => {
  const theme = useTheme()

  const [customerToEdit, setCustomerToEdit] = useState()
  const [selectedDialog, setSelectedDialog] = useState()

  const {
    page,
    setPage,
    rowsPerPage,
    searchQuery,
    setSearchQuery,
    setRowsPerPage,
  } = useTableSettings()

  const {
    customers,
    amountOfCustomers,
    mutate: mutateCustomers,
  } = useCustomers({
    page,
    rowsPerPage,
    searchQuery,
  })

  const onCloseDialogs = useCallback(() => {
    setCustomerToEdit(undefined)
    setSelectedDialog(undefined)
  }, [])
  const {
    addCustomer,
    updateCustomer,
    addKitchenToCustomer,
    removeKitchenFromCustomer,
  } = useCustomerActions({
    mutateCustomers,
    onSuccess: onCloseDialogs,
  })
  const { kitchens = [] } = useKitchens()
  const columns = useCustomerColumns()

  const onSearchChange = (e) => setSearchQuery(e.currentTarget.value)
  const onRowsPerPageChange = (e) => setRowsPerPage(e.target.value)
  const onEditRow = ({ row }) => {
    const { original: customer } = row
    setCustomerToEdit(customer)
    setSelectedDialog(CUSTOMER_DIALOG)
  }

  const onAddKitchenToCustomer = (customer) => {
    setCustomerToEdit(customer)
    setSelectedDialog(KITCHEN_DIALOG)
  }

  const onAddCustomer = () => {
    setCustomerToEdit({})
    setSelectedDialog(CUSTOMER_DIALOG)
  }
  const openKitchenDialog = customerToEdit && selectedDialog === KITCHEN_DIALOG
  const openEditCustomerDialog =
    customerToEdit && selectedDialog === CUSTOMER_DIALOG
  return (
    <Box sx={{ p: 4 }}>
      {!!openKitchenDialog && (
        <KitchensDialog
          key={customerToEdit}
          customer={customerToEdit}
          onClose={onCloseDialogs}
          open
          addKitchenToCustomer={addKitchenToCustomer}
        />
      )}

      {!!openEditCustomerDialog && (
        <CustomerDialog
          key={customerToEdit}
          customer={customerToEdit}
          onClose={onCloseDialogs}
          open
          onSave={
            Object.values(customerToEdit).length === 0
              ? addCustomer
              : updateCustomer
          }
        />
      )}

      <Box sx={{ maxWidth: 800 }}>
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
            onClick={onAddCustomer}
            startIcon={<AddCircleIcon />}
          >
            Add Customer
          </Button>
        </Box>
        <Box sx={{ paddingTop: 4 }}>
          <ReactTable
            page={page}
            data={customers}
            columns={columns}
            onEditRow={onEditRow}
            dataCount={amountOfCustomers}
            isExpandable
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={onRowsPerPageChange}
            expandableRowComponent={({ row }) =>
              CustomerRowExpander({
                showAddKitchensButton:
                  row?.original?.kitchens?.length < kitchens.length,
                onAddKitchenToCustomer,
                onRemoveKitchenFromCustomer: removeKitchenFromCustomer,
                row,
              })
            }
          />
        </Box>
      </Box>
    </Box>
  )
}

export default CustomersView
