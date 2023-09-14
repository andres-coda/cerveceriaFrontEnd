import './Subtitulo.css'
function Subtitulo({clase, texto}){
    return (
        <div className={clase}><h1><span>{ texto }</span> </h1> </div>
    );
};

export default Subtitulo;