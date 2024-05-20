import './Boton.css'
function Boton ({btn, btnClick}) {
    return (
        <button id={btn.id} className={btn.clase} onClick={btnClick}>
             {typeof btn.texto === 'string' ? btn.texto.toUpperCase() : btn.texto}
        </button>
    );
};

export default Boton;