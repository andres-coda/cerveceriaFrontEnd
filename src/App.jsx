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
function App() {
  const {datos } = useContext(contexto);


  return (
    <>
      <header>
        <Header /> 
      </header>
      <BrowserRouter>
        <Routes>
          {datos.data.map((dato)=>{
            return (
              <Route path={`/menu/${dato.id}`} element={<MenuDetalles dato={dato}/>} key={dato.id}/>
            )
          })}
          <Route path='/' element={<Home />}/>
          <Route path='/menu' element={<Menu />}/>
          <Route path='/map' element={<Map />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/quienessomos' element={<QuienesSomos />}/>
          <Route path='/carrito' element={<Carrito />}/>

        </Routes>
      </BrowserRouter>
      <Footer />

      {console.log(datos.data)}


    </>
  )
}

export default App;


/* {datos.categorias.map((categoria)=> (
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
          })} */