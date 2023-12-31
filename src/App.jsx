import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleLeft, faAngleRight);

import './App.css'
import { contexto } from './componentes/contexto/contexto'
import { useContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
import DondeEstamos  from './componentes/DondeEstamos/DondeEstamos';
import Contacto from './componentes/Contacto/Contacto'
import Reservas from './componentes/reservas/Reservas';
import ModalUsers from "./componentes/modalUsers/ModalUsers";

function App() {
  const { datos } = useContext(contexto);
  return (
    <>
      <BrowserRouter>
        <Header /> 
        <Routes>
          {datos.data.map((dato)=>{
            return (
              <Route path={`/menu/${dato.id}`} element={<MenuDetalles dato={dato} setMenuDetalles="app"/>} key={dato.id}/>
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
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/quienessomos' element={<QuienesSomos />}/>
          <Route path='/dondeestamos' element={<DondeEstamos />}/>
          <Route path='/contacto' element={<Contacto />}/>
          <Route path='/carrito' element={<Carrito />}/>
          <Route path='/reservas' element={<Reservas />}/>
          <Route path='/cargarmenu' element={ <MenuCargar />}/>
          <Route path='/perfil' element={ <ModalUsers />}/>
        </Routes>
      <Footer />
      </BrowserRouter>


    </>
  )
}

export default App;

