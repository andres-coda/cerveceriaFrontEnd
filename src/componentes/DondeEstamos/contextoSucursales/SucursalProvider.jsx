//contexto para las tarjetas sucursales
import React, { createContext } from 'react'

export const sucursalContext = createContext({});
function SucursalProvider({ children }) {

  
  

  return (
    <sucursalContext.Provider value={sucursales}>
      {children}
    </sucursalContext.Provider>
  )
}

export default SucursalProvider;