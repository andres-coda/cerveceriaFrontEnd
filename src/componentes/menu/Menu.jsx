import { useContext, useEffect, useState} from 'react';
import './Menu.css';
import { contexto } from '../contexto/contexto';
import Subtitulo from '../subtitulo/Subtitulo';
import { Link, useNavigate } from 'react-router-dom';
import MenuTarjeta from '../menuTarjeta/MenuTarjeta';

function Menu({categoria}){
  const { datos, setDatos} = useContext(contexto);
  const [productosOrdenados, setProductosOrdenados] = useState([]);
  const navegate = useNavigate();

  const reload = async () => {
    try {
        const productoFetch = await fetchGet(URL_PEDIDO, localStorage.getItem('token'));
        if (productoFetch) {
            setDatos((prev)=>({...prev,productos:productoFetch}));
            return productoFetch;              
        }
    }catch (error) {
        console.log(error);
        return error;
    }
  }   
  
  useEffect(() => {
    const sortProductosPorCategoria = (productos) => {
      return productos.sort((a, b) => {
        const nombreA = a.categoria.nombre.toLowerCase();
        const nombreB = b.categoria.nombre.toLowerCase();
        if (nombreA < nombreB) return -1;
        if (nombreA > nombreB) return 1;
        return 0;
      });
    };

    const agruparProductosPorCategoria = (productos) => {
      return productos.reduce((acc, producto) => {
        const categoriaNombre = producto.categoria.nombre;
        if (!acc[categoriaNombre]) {
          acc[categoriaNombre] = [];
        }
        acc[categoriaNombre].push(producto);
        return acc;
      }, {});
    };

    const productosOrdenados = sortProductosPorCategoria(datos.productos);
    const productosPorCategoria = agruparProductosPorCategoria(productosOrdenados);

    setProductosOrdenados(productosPorCategoria);
  }, [datos.productos]);

  const btnClick = async (e) => {
    const btn = e.currentTarget.id;
    navegate(`/menu/${btn}`)
  }
  
  return (
    <div className='conteinerGeneral'>
          <Subtitulo clase={"subtitulo"} texto={categoria!==undefined ? categoria.nombre : "Carta completa"} />
        <div className='menu'>
        {Object.keys(productosOrdenados).map((categoriaNombre, index) => (
          <div className='menuCatYTitulo' key={`categoria-${index}`}>
            <Link to={`/menu/${categoriaNombre}`}>
              <h4>{categoriaNombre.toLowerCase()}</h4>
            </Link>
            <div className='menuCategoria'>
              {productosOrdenados[categoriaNombre].map((producto) => (
                <>
                <MenuTarjeta 
                  key={producto.idProducto}
                  dato={producto}
                  reload={reload}
                  />
                </>
              ))}
            </div>
          </div>
        ))}
        </div>
        </div>
  )
}
export default Menu;
