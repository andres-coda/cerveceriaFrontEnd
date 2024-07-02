import { useContext, useState } from 'react';
import '../pedidos/pedidos.css'
import { contexto } from '../contexto/contexto';
import Subtitulo from '../subtitulo/Subtitulo';
import PedidosCard from '../pedidos/pedidosCard';
import AnimatedSVG from '../animacion/AnimatedSVG';
import { URL_USUARIO } from '../../endPoints/endPoints';
import { fetchGet } from '../funciones fetch/funciones';

function MostrarPedidosUsuario(){
    const {datos} = useContext(contexto);
    const [pedidos, setPedidos] = useState(datos.pedidosUsuarioActual.pedidos)

    const formatoFecha = (fecha) => {
        const date = new Date(fecha);
        const dia = date.getDate();
        const mes = date.getMonth() + 1; 
        const año = date.getFullYear();
        return `${dia}/${mes}/${año}`;
        }

    const reload = async () => {
        try {
            const usuario = await fetchGet(URL_USUARIO+'/'+datos.pedidosUsuarioActual.id, localStorage.getItem('token'));
            if (usuario) {
                const pedidosConUsuario = usuario.pedidos.map(pedido => ({
                    ...pedido,
                    usuario: {
                        id: usuario.id,
                        username: usuario.username,
                        // Añade aquí otros campos del usuario si es necesario
                    }
                }));
                setPedidos(pedidosConUsuario);
                return true;
            }
        }catch (error) {
            console.log(error);
            return false
        }
    }
  
    const fetchPedidos = async () =>{
        const pedidosFetch = await reload();
    }
    if (datos.userAct&& pedidos == null) fetchPedidos();
    
    return(
        <div className="conteinerGeneral">
            <Subtitulo clase={"subtitulo"} texto={`Pedidos de ${datos.pedidosUsuarioActual.username}`} />
            {pedidos!=null && pedidos.length >0 ? (
                <>
                    <p className='pedido-cantidad'>{`${pedidos.length} pedidos realizados`}</p>
                    <div className="pedidos-menu">
                        {pedidos.map((dato,index)=>(
                            <PedidosCard 
                                pedido={dato}
                                key={`pedido-${dato.id}-${index}`}
                                reload={reload}
                                children={
                                    <>
                                       <p className='pedido-fecha'> {formatoFecha(dato.fecha)}  </p>
                                    </>
                                }
                                textoAlerta={`el pedido de la fecha ${formatoFecha(dato.fecha)}`}
                                />
                        ))}
                    </div>
                </>

            ):(
                <AnimatedSVG />
            )}
        </div>
    )
}

export default MostrarPedidosUsuario;