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
        <>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Correo Electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Repetir Contraseña</label>
                    <input
                        type="password"
                        placeholder="Repetir Contraseña"
                        value={repetirPassword}
                        onChange={(e) => setRepetirPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
            <p>Ya tenes cuenta?</p>
            <button onClick={irALogin}>Logueate</button>
        </>
    )
}
