import { useContext } from 'react';
import './MenuAcordeon.css';
import { contexto } from '../contexto/contexto';
import Boton from '../boton/Boton';
function MenuAcordeon({dato, activo, btn_click, btnClick}){
    const { datos } = useContext(contexto);
    return (
        
        <div className='menuCatYTitulo'>
            <Boton  btn={{ id: `${dato}`, clase: 'btn_menu', texto: `${dato}` }} btnClick={btn_click} />
            {activo.map((btn)=>(btn.texto===dato && btn.activo ?(
                <div className='menuCategoria' key={dato}>
                    {datos.data.map((menu)=>{
                        if (menu.category === dato) {
                            return <MenuTarjeta key={menu.id} dato={menu} click={btnClick}/> 
                        } else {
                            return null
                        }
                    })}
                </div>
            ):(
                null
            )))}
        </div>
    
    );
};

export default MenuAcordeon;