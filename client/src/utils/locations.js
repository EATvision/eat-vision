export const getLocationName = (location) =>
  location
    ? `${location.streetAddress}, ${location.city}, ${location.country}`
    : ''
