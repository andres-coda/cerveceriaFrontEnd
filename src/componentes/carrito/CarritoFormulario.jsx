import { useContext } from "react";
import Boton from "../boton/Boton";
import FormularioInput from "../formularioInput/FormularioInput";
import { contexto } from "../contexto/contexto";
import { convertEnumValueToDisplayValue } from "../../utils/convertValue";

function CarritoFormulario({btnClick, tarjeta, detalle, setDetalle}){
    const {datos} =useContext(contexto);
    const onselect=(e) => {
        const select = e.target.value;
        const option= datos.metodoPago.find(metodo => convertEnumValueToDisplayValue(metodo.metodoPago) === select);
        const idMetodo = datos.metodoPago.find(metodo => convertEnumValueToDisplayValue(metodo.metodoPago) === select)?.id;
        setDetalle((prev)=>({...prev, idMetodo:idMetodo,  metodoPago: convertEnumValueToDisplayValue(option.metodoPago)}));
      }

    const onChange = (e) => {
        setDetalle({
            ...detalle,
            [e.target.name]: e.target.value
        })
    }
    return(
        <form onSubmit={btnClick} className='formulario-metodo-pago'>
        <FormularioInput 
            id="metodoPago"
            value={detalle.metodoPago} 
            tipo={"select"} 
            texto={"Metodo de Pago"} 
            onChan={onselect} 
            opciones={[...datos.metodoPago.map((metodo) => convertEnumValueToDisplayValue(metodo.metodoPago))]} 
            />
        <FormularioInput id={"detalle"} value={detalle.detalle} tipo={"text"} texto={"Detalles del pedido"} onChan={onChange} />
        <Boton btn={{id:tarjeta.id, clase: "comun", texto:tarjeta.texto}} btnClick={btnClick} />
    </form>
    )
}

export default CarritoFormulario;