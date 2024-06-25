import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleLeft, faAngleRight);

import './App.css'
import { contexto } from './componentes/contexto/contexto'
import { useContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './componentes/auth/Login';
import Registro from './componentes/auth/Registro';
import  Home  from './componentes/Home/Home';
import Footer from './componentes/footer/Footer'
import Header from './componentes/header/Header'
import Carrito from './componentes/carrito/Carrito';
import MenuCargar from './componentes/menuCargar/MenuCargar';
import DondeEstamos  from './componentes/DondeEstamos/DondeEstamos';
import Reservas from './componentes/reservas/Reservas';
import EditarReserva from './componentes/reservas/EditarReservas';
import ModalUsers from "./componentes/modalUsers/ModalUsers";
import PrivateRoute from "./componentes/privateRoute/PrivateRoute";
import { AuthProvider } from "./componentes/auth/AuthContext";
import AddSucursal from "./componentes/DondeEstamos/AddSucursal";
import MenuDetalles from "./componentes/menuDetalles/MenuDetalles";
import ModalCarrito from "./componentes/carrito/ModalCarrito";
import MostrarPedidos from "./componentes/pedidos/pedidos";
import MostrarPedidosGenerales from "./componentes/pedidos/pedidosGenerales";
import ReservasList from "./componentes/reservas/ReservasList";
import ReservasRealizadas from "./componentes/reservas/ReservasRealizadas";
import ListaDeUsuario from "./componentes/ListaDeUsuario/ListaDeUsuario";
import Menu from "./componentes/menu/Menu";
import NoAutorizado from "./componentes/privateRoute/noAutorizado";

function App() {
  const { datos } = useContext(contexto);
  return ( 
    <BrowserRouter>
    <AuthProvider>   
        <Header /> 
        <Routes>
          {Array.isArray(datos.productos) ? ( datos.productos.map((dato)=>{
            return (
              <Route path={`/menu/${dato.idProducto}`} element={<MenuDetalles idProducto={dato.idProducto}/>} key={`producto-${dato.idProducto}`}/>
            )
          })):(null)}
          {Array.isArray(datos.categoria) ? ( datos.categoria.map((categorias)=>{
            return (
              <Route path={`/menu/${categorias.nombre}`} element={<Menu categoria={categorias}/>} key={`categoria-${categorias.idCategoria}`}/>
            )
          })):(null)}
          {Array.isArray(datos.tipo) ? (datos.tipo.map((tipo)=>{
            return (
              <Route path={`/menu/${tipo.nombre}`} element={<Menu categoria={tipo}/>} key={`tipo-${tipo.idNombre}`}/>
            )
          })):(null)}
          <Route path='/' element={<Home />}/>
          <Route path='/menu' element={<Menu categoria={undefined}/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/metodopago' element={<ModalCarrito />}/>
          <Route path='/dondeestamos' element={<DondeEstamos />} />
          <Route path='/carrito' element={<Carrito />}/>
          <Route path="/reservas" element={<PrivateRoute roles={['user', 'admin']} />}>
            <Route path='/reservas' element={<Reservas />} />            
          </Route>
          <Route path="/cargarmenu" element={<PrivateRoute roles={['admin']} />}>
            <Route path='/cargarmenu' element={<MenuCargar />} />
          </Route>
          <Route path="/cargarsucursales" element={<PrivateRoute roles={['admin']} />}>
            <Route path='/cargarsucursales' element={<AddSucursal />} />
          </Route>
           <Route path="/perfil" element={<PrivateRoute roles={['user', 'admin']} />}>
            <Route path='/perfil' element={<ModalUsers />} />
          </Route>
          <Route path='/listadeusuarios' element={<ListaDeUsuario/>}/>
          <Route path='/reservasrealizadas' element={<ReservasRealizadas />} />
          <Route path='/pedidos' element={<MostrarPedidos/>} />
          <Route path='/pedidos-generales' element={<MostrarPedidosGenerales/>}/>
          <Route path='/listadoreservas' element={<ReservasList/>} />
          <Route path='listadoreservas/reservas/editar/:id' element={<EditarReserva />} />
          <Route path='unauthorized' element={<NoAutorizado />} />
        </Routes>
      <Footer />
    </AuthProvider>  
      </BrowserRouter>  
  )
}

export default App;

