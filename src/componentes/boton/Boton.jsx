import './boton.css'
function Boton ({btn, btnClick}) {
    return (
        <button id={btn.id} className={btn.clase} onClick={btnClick}>{btn.texto.toUpperCase()}</button>
    );
};

export default Boton;