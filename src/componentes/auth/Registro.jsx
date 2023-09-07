import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Registro = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repetirPassword, setRepetirPassword] = useState("")


    const navegarAlRegistro = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        evaluarContraseña(password, repetirPassword)
        console.log("Te Registraste con exito");
    }

    const irALogin = () => {
        navegarAlRegistro('/login')
    }

    const evaluarContraseña = (contraseña1, contraseña2) => {
        if (contraseña1 !== contraseña2) {
            alert("Las contraseñas deben ser iguales")
            return
        }
    }

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
                        <div className="form-group">
                            <label htmlFor="password">Repetir Contraseña:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Contraseña"
                                value={repetirPassword}
                                onChange={(e) => setRepetirPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button onClick={handleSubmit} className="btn botonEnviar mt-2">
                            Registrarse
                        </button>
                    </form>
                    <button type="submit" className="btn botonEnviar mt-3" onClick={irALogin}>
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        </div>
    )
}
