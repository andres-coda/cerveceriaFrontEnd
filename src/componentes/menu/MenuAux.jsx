import { useContext} from 'react';
import './Menu.css';
import { contexto } from '../contexto/contexto';
import Subtitulo from '../subtitulo/Subtitulo';
import { Link, useNavigate } from 'react-router-dom';
import MenuTarjeta from '../menuTarjeta/MenuTarjeta';

function MenuAux({categoria}){
  const { datos, setDatos} = useContext(contexto);
  const navegate = useNavigate()
  
  const btnClick = async (e) => {
    const btn = e.currentTarget.id;
    navegate(`/menu/${btn}`)
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
              <>
                {dato.productos.length>0 ? (
                  <div key={dato.idCategoria} className='menuCatYTitulo'>
                          <Link to={`/menu/${dato.nombre}`}><h4> {dato.nombre.toUpperCase()} </h4></Link>
                          <div className='menuCategoria'>
                            {dato.productos.map((producto)=>{
                              return <MenuTarjeta key={producto.idProducto} dato={producto} click={btnClick}/> 
                            })}
                          </div>
                  </div>
                ) : (null)}
              </>
              ) : (null)
            ))}
        </div>
        </div>
  )
}
export default MenuAux;