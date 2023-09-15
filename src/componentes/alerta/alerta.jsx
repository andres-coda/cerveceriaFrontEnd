

const Alerta = ({ mensaje }) => {
    const { msj, error } = mensaje
    return (
        <div style={{padding: "1rem", color: error ? "red" : "green" }}>
            <h6>
                {msj}
            </h6>
        </div>
    )
}

export default Alerta;

