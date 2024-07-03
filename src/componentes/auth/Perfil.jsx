import { useContext, useEffect, useState } from "react";
import { contexto } from "../contexto/contexto";
import Subtitulo from "../subtitulo/Subtitulo";
import { fetchGet } from "../funciones fetch/funciones";
import { URL_USUARIO } from "../../endPoints/endPoints";
import AnimatedSVG from "../animacion/AnimatedSVG";
import './perfil.css'
import { FaRegAddressCard, FaRegEnvelope, FaUser, FaUserAlt, FaUserCheck, FaUserCircle, FaUserGraduate } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { RiUserSettingsLine } from "react-icons/ri";
import { MdFastfood, MdKeyboardArrowRight, MdLockOpen, MdPerson, MdPersonAdd, MdPersonOutline, MdPersonPin, MdPersonRemove, MdTableBar } from "react-icons/md";
import { IoPerson, IoPersonAdd, IoPersonOutline, IoPersonRemove } from "react-icons/io5";
import PassParrafo from "../parrafo/PassParrafo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { FiLogOut } from "react-icons/fi";

function Perfil(){
  const {datos} = useContext(contexto);
  const [ perfil, setPerfil ] = useState(null)
  const navegate = useNavigate()
  const { logout } = useAuth();

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

  const handlePedidos= ()=>{
    navegate('/pedidos')
  }  
  const handleReservas= ()=>{
    navegate('/reservasrealizadas')
  }
  useEffect(()=>{
    perfilReload();
  },[])
  return(
    <div className="conteinerGeneral">
      {datos.userAct ? (
        <div className="perfil">
          <Subtitulo texto={datos.userAct.username}/>
        </div>
      ): (null)}
    { perfil ? (
      <>
      <div className="perfil">
        <div className="perfil-cabecera">
        <img src={datos.imgPerfil[perfil.id % datos.imgPerfil.length]} alt={perfil.username} />
          <div className="perfil-detalles-cabecera">
            <ul>
              <li><h3> {`${perfil.name} ${perfil.lastname}`}</h3></li>
              <li><CiLocationOn  className="icon-perfil"/><h4> {perfil.direccion}</h4></li>
              <li><FaUserCheck className="icon-perfil"/><h5>{`${perfil.age} años`}</h5></li>
              <li id="role"><RiUserSettingsLine  className="icon-perfil"/> <p>{perfil.role}</p></li>
            </ul>
          </div>
          </div>
        </div>
        <div className="perfil">
          <div className="perfil-detalles">
            <ul>
              <li><FaRegEnvelope  className="icon-perfil"/> <p>{perfil.email}</p>
                <MdLockOpen className="icon-perfil"/><PassParrafo password={perfil.password}/>
              </li>
            </ul>
          </div>
        </div>
        <div className="perfil">
          <div className="perfil-detalles">
            <ul>          
              <li>
                <MdFastfood  className="icon-perfil"/> 
                <p>{`${perfil.pedidos.length} pedidos`}</p>
                <MdKeyboardArrowRight className="icon-perfil seleccionable" onClick={handlePedidos} />
              </li>
              <li>
                <MdTableBar  className="icon-perfil"/> 
                <p>{`${perfil.reservas.length} reservas`}</p>
                <MdKeyboardArrowRight className="icon-perfil seleccionable" onClick={handleReservas} />
              </li>    
            </ul>
          </div>
        </div>
        <div className="perfil">
          <div className="perfil-detalles">
            <ul>
              <li onClick={logout} className="seleccionable"><FiLogOut className="icon-perfil"/><p>Cerrar sesión</p></li>
            </ul>
          </div>
        </div>
        </>    
    ) : (
      <AnimatedSVG />
    )
    } 
    </div>
  )
}
export default Perfil;
