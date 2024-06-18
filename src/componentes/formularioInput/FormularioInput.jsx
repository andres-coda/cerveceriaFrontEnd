import './FormularioInput.css';

function FormularioInput({ id, tipo, texto, onChan, value, opciones, disabled}) {
  return (
    <div className="renglonInput">
      <label htmlFor={id}>{texto.toUpperCase()}</label>
      {tipo === "select" ? (
        <select
          id={id}
          name={id}
          onChange={onChan}
          value={value}
          required>
          {opciones.map((opcion, index) => (
            <option key={index} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={tipo}
          placeholder={texto}
          name={id}
          onChange={onChan}
          value={value}
          required
          disabled={disabled}
        />
      )}
    </div>
  );
}

export default FormularioInput;