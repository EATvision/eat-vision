export const getRelevantMenus = (menus) => {
  const DAYS_NAMES = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]

  const currentDate = new Date().toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return (
    menus?.filter((menu) =>
      menu.workingHours.every(
        (menuWorkingHour) =>
          menuWorkingHour?.day?.includes(DAYS_NAMES[new Date().getDay()]) &&
          menuWorkingHour.start <= currentDate &&
          menuWorkingHour.end >= currentDate
      ))
    || []
  )
}