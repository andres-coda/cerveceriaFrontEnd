import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Mapa.css'


function MapL() {
  const position = [ -36.014, -59.1003]; // Coordenadas del mapa

  return (
    < >
    <div className='mapa'>
    <MapContainer  className={'map'} center={position} zoom={13} style={{width: '100vw', height:'40vh'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      <Marker position={position}>
        <Popup>¡Hola, soy un marcador!</Popup>
      </Marker> 
    </MapContainer>
    </div>
        </>
  );
}

export default MapL;
