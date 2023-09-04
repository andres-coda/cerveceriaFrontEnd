import './App.css'
import { contexto } from './componentes/contexto/contexto'
import { useContext } from 'react'

function App() {
  const {datos } = useContext(contexto);


  return (
    <>
      {console.log(datos)}
    </>
  )
}

export default App
