import './Boton.css'
function Boton ({btn, btnClick, titulo}) {
    return (
        <button id={btn.id} className={btn.clase} onClick={btnClick} title={titulo}>
             {typeof btn.texto === 'string' ? btn.texto.toUpperCase() : btn.texto}
        </button>
    );
};

export default Boton;