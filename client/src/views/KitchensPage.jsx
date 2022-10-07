import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useKitchens } from '../hooks/kitchens'

function KitchensPage() {
  const { i18n } = useTranslation()
  const { kitchens, isLoading, isError } = useKitchens()

  const handleClickKitchen = (kitchen) => () => i18n.changeLanguage(kitchen.locale)

  if (isLoading) return <div>LOADING</div>
  if (isError) return <div>ERROR</div>

  return (
    <main>
      <h2>Kitchens list</h2>

      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {kitchens.map((kitchen) => (
              <Link
                className="group flex flex-col"
                to={`/kitchens/${kitchen.id}/menus`}
                key={kitchen.id}
                onClick={handleClickKitchen(kitchen)}
              >
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8  flex-1">
                  <img
                    src={kitchen?.image?.[0]?.url}
                    alt="kitchen logo"
                    className="w-full h-full object-center object-fit group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700 group-hover:opacity-75">{kitchen.name}</h3>
              </Link>

            ))}
          </div>
        </div>
      </div>

    </main>
  )
}

export default KitchensPage
