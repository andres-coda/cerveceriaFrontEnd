import './App.css'
import { contexto } from './componentes/contexto/contexto'
import { useContext } from 'react'
import Map from './componentes/Mapa/Mapa';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Menu from './componentes/menu/Menu';
import QuienesSomos from './componentes/QuienesSomos/QuienesSomos';
import MenuDetalles from './componentes/menuDetalles/MenuDetalles';
import Login from './componentes/auth/Login';
import Registro from './componentes/auth/Registro';
import  Home  from './componentes/Home/Home';
import Footer from './componentes/footer/Footer'
import Header from './componentes/header/Header'
import Carrito from './componentes/carrito/Carrito';
import MenuCargar from './componentes/menuCargar/MenuCargar';
import SugerenciaCarrusel from './componentes/sugerenciaCarrusel/SugerenciaCarrusel';
function App() {
  const { datos } = useContext(contexto);


  return (
    <>
      
      
      <BrowserRouter>
        <Header /> 
        <Routes>
          {datos.data.map((dato)=>{
            return (
              <Route path={`/menu/${dato.id}`} element={<MenuDetalles dato={dato}/>} key={dato.id}/>
            )
          })}
          {datos.categorias.map((categorias)=>{
            return (
              <Route path={`/menu/${categorias}`} element={<Menu categoria={categorias}/>} key={categorias}/>
            )
          })}
          {datos.tipo.map((tipo)=>{
            return (
              <Route path={`/menu/${tipo}`} element={<Menu categoria={tipo}/>} key={tipo}/>
            )
          })}
          <Route path='/' element={<Home />}/>
          <Route path='/menu' element={<Menu categoria={undefined}/>}/>
          <Route path='/map' element={<Map />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/quienessomos' element={<QuienesSomos />}/>
          <Route path='/carrito' element={<Carrito />}/>
          <Route path='/cargarmenu' element={ <MenuCargar />}/>
          <Route path='/sugcarrusel' element={ <SugerenciaCarrusel />} />
        </Routes>
      <Footer />
      </BrowserRouter>


    </>
  )
}

export default App;

