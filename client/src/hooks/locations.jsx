import { useMemo } from 'react'
import useSWR from 'swr'
import _keyBy from 'lodash/keyBy'
import fetcher from '../api/fetcher'

export const useLocations = ({ mapById = false } = {}) => {
  const { data, error, ...rest } = useSWR('/api/v2/locations', fetcher)

  const locations = useMemo(() => {
    if (!mapById) return data
    return _keyBy(data, 'id')
  }, [data, mapById])

  return {
    locations,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}

export const useLocationById = (locationId) => {
  const { data, error, ...rest } = useSWR(
    locationId && `/api/v2/locations/${locationId}`,
    fetcher
  )

  return {
    location: data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  }
}
