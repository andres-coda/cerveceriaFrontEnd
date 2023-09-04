import './App.css'
import { contexto } from './componentes/contexto/contexto'
import { useContext } from 'react'
import Map from './componentes/Mapa/Mapa';

function App() {
  const {datos } = useContext(contexto);


  return (
    <>
      {console.log(datos.data)}
      <div className='app'>
      <Map/>
      </div>
    </>
  )
}

export default App
