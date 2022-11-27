import axios from 'axios'

const defaultCustomer = {
  kitchens: [],
}
export const updateCustomerInfo = async (newCustomerInfo) => {
  const { _id: customerId, ...restOfCustomerInfo } = newCustomerInfo
  restOfCustomerInfo.kitchens = restOfCustomerInfo.kitchens.map(
    (kitchen) => kitchen._id
  )

  const { data } = await axios.put(
    `/api/v2/admin/customers/${customerId}`,
    restOfCustomerInfo
  )
  return data
}

export const addCustomer = async (customer) => {
  const { data } = await axios.post('/api/v2/admin/customers/', {
    ...defaultCustomer,
    ...customer,
  })
  return data
}
