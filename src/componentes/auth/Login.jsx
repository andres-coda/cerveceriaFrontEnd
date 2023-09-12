import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormularioInput from '../formularioInput/FormularioInput';
import Boton from "../boton/Boton";

function Login () {
  const [ login, setLogin ] = useState({})
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navegarAlRegistro = useNavigate();

  const onChan = (e) => {
    setLogin({
      ...login,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Te Logueaste con exito");
  };

  const irARegistro = () => {
    navegarAlRegistro("/registro");
  };

  return (
    <div className="container">
      <div className="formularioLogin">
        <div>
          <h2>Iniciar Sesión</h2>
          <hr />
          <form onSubmit={handleSubmit} className="separarFormulario">
            <div className="form-group">
              <FormularioInput id={`email`} tipo={`email`} texto={"Correo Electrónico: "} onChan={onChan}/>
              <label htmlFor="email">Correo Electrónico:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
            <FormularioInput id={`password`} tipo={`password`} texto={"Contraseña: "} onChan={onChan}/>
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn botonEnviar">
              Iniciar Sesión
            </button>
            <Boton btn={{id:"enviar", clase: "comun", texto: "Iniciar Sesión"}} btnClick={handleSubmit}/>
          </form>
          <button onClick={irARegistro} className="btn botonEnviar mt-3">
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

