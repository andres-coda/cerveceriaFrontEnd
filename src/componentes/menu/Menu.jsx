import './Menu.css';
import { useContext } from 'react';
import { contexto } from '../contexto/contexto';
import MenuTarjeta from '../menuTarjeta/MenuTarjeta';
function Menu() {
    const { datos } = useContext(contexto);
    return (
        <div className='menu'>
            {datos.categorias.map((dato)=>(
                <>
                    <h5> {dato} </h5>
                    <div className='menuCategoria'>
                    {datos.data.map((menu)=>{
                        if (menu.category === dato) {
                            return <MenuTarjeta dato={menu} /> 
                        } else {
                            return null
                        }
                    })}
                    </div>
                </>
            ))}
        
        </div>
    );
};

export default Menu;