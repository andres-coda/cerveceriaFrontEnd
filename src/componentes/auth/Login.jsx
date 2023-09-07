import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navegarAlRegistro = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Te Logueaste con exito");
  };

  const irARegistro = () => {
    navegarAlRegistro("/registro");
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5 formularioLogin">
        <div className="col-md-6 text-white ">
          <h2>Iniciar Sesión</h2>
          <hr />
          <form onSubmit={handleSubmit} className="separarFormulario">
            <div className="form-group">
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
          </form>
          <button onClick={irARegistro} className="btn botonEnviar mt-3">
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

