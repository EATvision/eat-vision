import axios from 'axios'
import { defaultFilters } from '../utils/filters'

export const defaultDiner = {
  filters: defaultFilters,
}

export const postDiner = (filters) => {
  axios.post('/api/diners/anonymous', { filters })
  // axios.post('/api/diners', { filters })
}
