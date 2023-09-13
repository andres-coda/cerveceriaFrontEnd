import './Parrafo.css'
function Parrafo({texto, clase }) {
    return (
        <p className={clase}>{texto}</p>
    );
};

export default Parrafo;
