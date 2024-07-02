import { useContext, useEffect, useState } from "react";
import { contexto } from "../contexto/contexto";
import Subtitulo from "../subtitulo/Subtitulo";
import { fetchGet } from "../funciones fetch/funciones";
import { URL_USUARIO } from "../../endPoints/endPoints";
import AnimatedSVG from "../animacion/AnimatedSVG";
import './perfil.css'
import { FaRegAddressCard } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { RiUserSettingsLine } from "react-icons/ri";

function Perfil(){
  const {datos} = useContext(contexto);
  const [ perfil, setPerfil ] = useState(null)

  const perfilReload = async () => {
    try {
      const perfilActual = await fetchGet(URL_USUARIO+'/'+datos.userAct.sub, localStorage.getItem('token'));
      if (perfilActual) {
        setPerfil(perfilActual)
        console.log(perfilActual);
      }
    } catch (error){
      return false
    }
  }

  useEffect(()=>{
    perfilReload();
  },[])
  return(
    <div className="conteinerGeneral">
      {datos.userAct ? (
        <Subtitulo texto={datos.userAct.username}/>
      ): (null)}
    { perfil ? (
      <div className="perfil">
      <img src={datos.imgPerfil[perfil.id % datos.imgPerfil.length]} alt={perfil.username} />
        <div className="perfil-detalles">
          <h3><FaRegAddressCard /> {`${perfil.name} ${perfil.lastname}`}</h3>
          <h4><CiLocationOn /> {perfil.direccion}</h4>
          <h5>{perfil.age}</h5>
          <p><RiUserSettingsLine />{perfil.role}</p>
        </div>
      </div>
    ) : (
      <AnimatedSVG />
    )
    } 
    </div>
  )
}
export default Perfil;
