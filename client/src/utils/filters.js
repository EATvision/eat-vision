import _flatten from 'lodash/flatten'

export const defaultFilters = {
  diets: [],
  exclude: [],
  avoidOrReduce: [],
  allergies: [],
}

export const diets = [
  'Vegetarian',
  'Vegan',
  'Pregnancy diet',
  'Gluten Free',
  'Lactose Free',
  'No Sugar',
]


export const doesUserHaveFilters = (filters) =>
  _flatten(Object.values(filters)).length > 0