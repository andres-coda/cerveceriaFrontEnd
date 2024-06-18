import './modalGeneral.css'
import { FaTimes } from "react-icons/fa";
import Boton from "../boton/Boton";

function ModalGeneral({children, onClose, isOpen}){
    if (!isOpen) return null
    return (
        <div className='modalFondoTransparente'>
            <div className="modalFondo">
                <Boton btn={{id:"cerrar", clase: "cerrar", texto:<FaTimes />}} btnClick={onClose} />
                {children}
            </div>
        </div>
    )
}

export default ModalGeneral;