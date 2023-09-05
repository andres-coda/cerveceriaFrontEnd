import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navegarAlRegistro = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Te Logueaste con exito")
    }

    const irARegistro = () => {
        navegarAlRegistro('/registro')
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
                <button type="submit">Iniciar Sesión</button>
            </form>
            <button onClick={irARegistro}>Registrarse</button>
        </>
    )
}
