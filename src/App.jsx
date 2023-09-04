import './App.css'
import { contexto } from './componentes/contexto/contexto'
import { useContext } from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
function App() {
  const {datos } = useContext(contexto);


  return (
    <>
      <BrowserRouter>
        <header>
        </header>
        <Routes>
          {datos.categorias.map((categoria)=> (
            <Route path={`/categorias/${categoria}`} element={<Inicio categoria={categoria}/>} key={categoria}/>
          ))}
          {datos.data.map((dato)=>{
            return (
              <Route path={`/producto/${dato.id}`} element={<ProductoSeleccionado dato={dato}/>} key={dato.id}/>
            )
          })}
          {datos.usuario.map((dato, index)=>{
            return (
              <Route path={`/perfil/${dato.usuario}`} element={<Perfil usuario={dato}/>} key={index}/>
            )
          })}
        </Routes>
      </BrowserRouter>

      {console.log(datos.data)}
    </>
  )
}

export default App
