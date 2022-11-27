const { useMemo, useCallback } = require('react')

const {
  updateCustomerInfo,
  addCustomer: addCustomerRequest,
} = require('api/admin/customers')

const useCustomerActions = ({ mutateCustomers, onSuccess, onFailure }) => {
  const onSuccessFn = useCallback(() => {
    if (onSuccess) onSuccess()
  }, [onSuccess])

  const onFailureFn = useCallback(() => {
    if (onFailure) onFailure()
  }, [onFailure])

  const updateCustomer = useCallback(
    async (customer) => {
      try {
        await updateCustomerInfo(customer)
        await mutateCustomers()
        onSuccessFn()
      } catch (error) {
        console.error(error)
        onFailureFn()
      }
    },
    [mutateCustomers, onFailureFn, onSuccessFn]
  )
  const addKitchenToCustomer = useCallback(
    async (customer, kitchenIdToAdd) => {
      await updateCustomer({
        ...customer,
        kitchens: [...customer.kitchens, { _id: kitchenIdToAdd }],
      })
    },
    [updateCustomer]
  )

  const removeKitchenFromCustomer = useCallback(
    async (customer, kitchenId) => {
      const filteredKitchens = customer.kitchens.filter(
        (kitchen) => kitchen._id !== kitchenId
      )

      await updateCustomer({
        ...customer,
        kitchens: filteredKitchens,
      })
    },
    [updateCustomer]
  )

  const addCustomer = useCallback(
    async (customer) => {
      try {
        await addCustomerRequest(customer)
        await mutateCustomers()
        onSuccessFn()
      } catch (error) {
        console.error(error)
        onFailureFn()
      }
    },
    [mutateCustomers, onFailureFn, onSuccessFn]
  )
  return useMemo(
    () => ({
      addCustomer,
      updateCustomer,
      addKitchenToCustomer,
      removeKitchenFromCustomer,
    }),
    [
      addCustomer,
      addKitchenToCustomer,
      removeKitchenFromCustomer,
      updateCustomer,
    ]
  )
}

export default useCustomerActions
