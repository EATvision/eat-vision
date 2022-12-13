import React, { createContext, useContext } from 'react'

const ReactTableContext = createContext()

export const ReactTableProvider = ({ ReactTable = {}, children } = {}) => (
  <ReactTableContext.Provider value={ReactTable}>
    {children}
  </ReactTableContext.Provider>
)

export const useReactTableContext = () => {
  const context = useContext(ReactTableContext)

  if (!context)
    throw Error('Tried using useReactTableContext outside of it\'s provider')

  return context
}
