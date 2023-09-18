import './FormularioInput.css'
function FormularioInput ({id, tipo, texto, onChan, value}){
    return (
        <>
            <label htmlFor={id}>{texto.toUpperCase()}</label>
            <input id={id} type={tipo}placeholder={texto} name={id} onChange={onChan} value={value} required></input>
        </>
    );
};

export default FormularioInput;