import React from 'react'
import Subtitulo from '../../componentes/subtitulo/Subtitulo';
import Map from '../../componentes/Mapa/Mapa';
import { useEffect, useContext } from 'react'
import './DondeEstamos.css'
import Parrafo from '../../componentes/parrafo/Parrafo';
import FotoQSomos from '../../componentes/FotoQSomos/FotoQSomos';
import SucursalProvider, { sucursalContext } from './contextoSucursales/SucursalProvider';
import { FaShoppingCart } from 'react-icons/fa';



function DondeEstamos() {
    useEffect(() => {
        // Scroll a la parte superior de la página cuando el componente se monta
        window.scrollTo(0, 0);
    }, []);
    const sucursalesData = useContext(sucursalContext)
    console.log(sucursalesData);
    return (

        <section className='conteinerGeneral'>
            <Subtitulo clase={"subtitulo-para"} texto={"¿Dónde estamos?"} />
            <div className='container-all-map'>
                <div className='texto'>
                    <div>
                        <FotoQSomos props={'./src/assets/Logo.png'} />

                    </div>
                    <Parrafo clase={'paragrafh'} texto={'Somos parte de un viaje atravesado por lúpulo, verbo y amigos.Porque creemos que lo mejor que le podemos dar al mundo es nuestra cerveza'} />
                    <h1>Nuestra cede cervercera se encuentra en Bernando de Irigoyen 450 Las Flores, pcia. de Buenos Aires</h1>
                    <h2>Contamos con 12 sucursales en la provicia, y nuestro mayor sueño es expandir nuestro negocio al país.</h2>
                </div>
                <div className='ubicacion'>
                    <Map />
                </div>
            </div>
            <div className='container-all-map'>
                {sucursalesData.map((sucursales) => {
                    return (
                        <div className='cards-sucursal' key={sucursales.id}>   
                            <img className='card-img' src={sucursales.img} />
                            <h1 className='card-h1'>{sucursales.name}</h1>
                            <h3 className='card-h3'>{sucursales.direccion}</h3>
                            <h3 className='card-h3'>{sucursales.tel}</h3>
                            <h3 className='card-h3'>{sucursales.email}</h3>
                            <h3 className='card-h3'>{sucursales.instagram}</h3>
                            <h3 className='card-h3'>{sucursales.facebook}</h3>
                        </div>
                    )
                })}
            </div>

        </section>

    )
}

export default DondeEstamos;
