import './Menu.css';
import { useContext } from 'react';
import { contexto } from '../contexto/contexto';
import { useNavigate } from 'react-router-dom';
import MenuTarjeta from '../menuTarjeta/MenuTarjeta';
function Menu() {
    const { datos } = useContext(contexto);
    const navigate = useNavigate();
    const btnClick = (e) => {
        const btn = e.currentTarget.id;
        if (btn) navigate(`/menu/${btn}`);
    }
    return (
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
        
        </div>
    );
};

export default Menu;