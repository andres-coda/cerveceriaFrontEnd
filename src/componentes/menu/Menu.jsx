import './Menu.css';
import { useContext, useState } from 'react';
import { contexto } from '../contexto/contexto';
import MenuTarjeta from '../menuTarjeta/MenuTarjeta';
import MenuDetalles from '../menuDetalles/MenuDetalles';
function Menu() {
    const { datos } = useContext(contexto);
    const [ menuDetalle, setMenuDetalle ] = useState(undefined);
    const btnClick = (e) => {
        const btn = e.currentTarget.id;
        setMenuDetalle(datos.data.find((dato)=> Number(dato.id)===Number(btn)));
    }
    return (
        <div className='conteinerGeneral'>
        <div className='menu'>
            {datos.categorias.map((dato)=> ( dato !== "todas" && dato !== "Comida Vegetariana" ? (
                <div key={dato} className='menuCatYTitulo'>
                    <h4> {dato.toUpperCase()} </h4>
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