import './Menu.css';
import { useContext, useState } from 'react';
import { contexto } from '../contexto/contexto';
import MenuTarjeta from '../menuTarjeta/MenuTarjeta';
import MenuDetalles from '../menuDetalles/MenuDetalles';
import { Link } from 'react-router-dom';
function Menu({categoria}) {
    const { datos } = useContext(contexto);
    const [ menuDetalle, setMenuDetalle ] = useState(undefined);
    const btnClick = (e) => {
        const btn = e.currentTarget.id;
        setMenuDetalle(datos.data.find((dato)=> Number(dato.id)===Number(btn)));
    }
    
  const setSeccionPorCategoria = () => {
    switch (categoria) {
      case "bebida":
        return ["Cerveza", "Vino", "Agua"];
      case "clasica":
        return ["Menu"];
      case "sandwich":
        return ["Sándwich"];
      case "sintacc":
        return ["Sin TACC"];
      case "vegetariana":
        return ["Comida Vegetariana"];
      default:
        return [categoria];
    }
  };

  const seccion = setSeccionPorCategoria();
    return (
        <div className='conteinerGeneral'>
        <div className='menu'>
            {datos.categorias.map((dato)=> ( seccion.includes(dato) || categoria === undefined ?(
                <div key={dato} className='menuCatYTitulo'>
                    <Link to={`/menu/${dato}`}><h4> {dato.toUpperCase()} </h4></Link>
                    <div className='menuCategoria'>
                    {datos.data.map((menu)=>{
                        if (menu.category === dato) {
                            return <MenuTarjeta key={menu.id} dato={menu} click={btnClick}/> 
                        } else {
                            return null
                        }
                    })}
                    </div>
                </div>
                ) : (null)
            ))}
            {menuDetalle != undefined ? (<MenuDetalles dato={menuDetalle} setMenuDetalles={setMenuDetalle}/>) : (null)} 
        
        </div>
        </div>
    );
};

export default Menu;