import AnimatedSVG from "../animacion/AnimatedSVG";
import Subtitulo from "../subtitulo/Subtitulo";
import './noAutorizado.css'
function NoAutorizado(){
    return(
        <div className="conteinerGeneral">
            <div className="no-autorizado">
                <Subtitulo texto={'No tiene autorización para entrar a esta página'}/>
                <AnimatedSVG />
            </div>
        </div>
    )
}

export default NoAutorizado;