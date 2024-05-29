// El subtutiulo es el subtitulo de cada pagina, tiene un diseño particular.
import './Subtitulo.css'
function Subtitulo({clase, texto}){
    return (
        <div className='subtitulo'>
            <h1>{texto.toUpperCase()}</h1>
        </div>
    );
};

export default Subtitulo;

/* <div className={clase}><h1><span>{ ` ${texto.toUpperCase()} ` }</span> </h1> </div>
*/