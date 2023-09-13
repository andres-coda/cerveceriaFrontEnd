

const Alerta = ({ mensaje }) => {
    const { msj, error } = mensaje
    return (
        <div style={{ margin: "0 20rem", padding: "0.5rem", backgroundColor: error ? "red" : "green" }}>
            <h6>
                {msj}
            </h6>
        </div>
    )
}

export default Alerta;

