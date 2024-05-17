//contexto para las tarjetas sucursales
import React, { createContext, useEffect, useState } from 'react'

export const sucursalContext = createContext({});
function SucursalProvider({ children }) {

  
  

  return (
    <sucursalContext.Provider value={sucursales1}>
      {children}
    </sucursalContext.Provider>
  )
}

export default SucursalProvider;