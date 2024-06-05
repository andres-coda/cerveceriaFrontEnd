import './pedidos.css'
import { useContext, useEffect, useState } from "react";
import Subtitulo from "../subtitulo/Subtitulo";
import { contexto } from "../contexto/contexto";
import { URL_USUARIO } from "../../endPoints/endPoints";
import AnimatedSVG from "../animacion/AnimatedSVG";
import PedidosCard from "./pedidosCard";
import { fetchGet } from "../funciones fetch/funciones";

function MostrarPedidos(){
    const {datos} = useContext(contexto);
    const [pedidos, setPedidos] = useState(null)

  
    const fetchPedidos = async () =>{
        try {
            const usuario = await fetchGet(URL_USUARIO+'/'+datos.userAct.sub, localStorage.getItem('token'));
            console.log("estoy por aqui");
            console.log(usuario);
            if (usuario) {
                setPedidos(usuario.pedidos)
            }
        }catch (error) {
            console.log(error);
        }
    }
    if (datos.userAct&& pedidos == null) fetchPedidos();

    const btnClick = (e) =>{
        const btn = e.target.id;
        console.log(btn);
    }

    
    return(
        <div className="conteinerGeneral">
            <Subtitulo clase={"subtitulo"} texto={"Lista de pedidos realizados"} />
            {console.log(pedidos)}
            {pedidos!=null && pedidos.length >0 ? (
                <div className="pedidos-menu">
                    {pedidos.map((dato)=>(
                        <>
                        {console.log(dato)}
                        <PedidosCard pedido={dato} click={btnClick} key={dato.id} />
                        </>
                    ))}
                </div>

            ):(
                <AnimatedSVG />
            )}
        </div>
    )
}

export default MostrarPedidos;

