import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProveedorContexto } from './componentes/contexto/contexto.jsx'
import SucursalProvider from './Nosotros/DondeEstamos/contextoSucursales/SucursalProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SucursalProvider>
    <ProveedorContexto>
      <App />
    </ProveedorContexto>
    </SucursalProvider>
  </React.StrictMode>,
)
