import { useContext, useEffect, useState } from 'react';
import './Menu.css';
import { contexto } from '../contexto/contexto';
import Subtitulo from '../subtitulo/Subtitulo';
import { Link } from 'react-router-dom';
import MenuTarjeta from '../menuTarjeta/MenuTarjeta';
import MenuDetalles from '../menuDetalles/MenuDetalles';
import MenuDetallesAux from '../menuDetalles/MenuDetallesAux';
import { fetchGet } from '../funciones fetch/funciones';
import { URL_PRODUCTO } from '../../endPoints/endPoints';

function MenuAux({categoria}){
  const { datos} = useContext(contexto);
  const [ menuDetalle, setMenuDetalle ]= useState(undefined);
  
  const btnClick = async (e) => {
    const btn = e.currentTarget.id;
    const url = URL_PRODUCTO+'/'+Number(btn);
    const productoConst = await fetchGet(url, localStorage.getItem('token'))
    if (productoConst) {
      setMenuDetalle(productoConst)
    }
  }

  const setSeccionPorCategoria = () => {
    const tipos = [];
    if (categoria != undefined) {
      datos.productos.map((producto)=>{
        if (producto.categoria.nombre===categoria.nombre){
          tipos.push(producto.tipo.nombre);
        }
      })
    }
    tipos.push(categoria);
    return tipos;
  }
  const seccion= setSeccionPorCategoria()
  return (
    <div className='conteinerGeneral'>
          <Subtitulo clase={"subtitulo"} texto={categoria!==undefined ? categoria.nombre : "Carta completa"} />
        <div className='menu'>
            {datos.categoria.map((dato)=> (  categoria === undefined  ||seccion.includes(dato.nombre) || categoria.nombre === dato.nombre ?(
              <div key={dato.idCategoria} className='menuCatYTitulo'>
                    {dato.productos.length>0 ? (
                      <>
                        <Link to={`/menu/${dato.nombre}`}><h4> {dato.nombre.toUpperCase()} </h4></Link>
                        <div className='menuCategoria'>
                          {dato.productos.map((producto)=>{
                            return <MenuTarjeta key={producto.idProducto} dato={producto} click={btnClick}/> 
                          })}
                        </div>
                      </>
                    ) : (null)}
                </div>
                ) : (null)
            ))}
            {menuDetalle != undefined ? (<MenuDetallesAux dato={menuDetalle} setMenuDetalles={setMenuDetalle}/>) : (null)} 
        </div>
        </div>
  )
}
export default MenuAux;