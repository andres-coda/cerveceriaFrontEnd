import React, { createContext} from 'react'



export const sucursalContext = createContext({});
function SucursalProvider({children}){

const sucursales = [
    {
      id: 1,
      name: "Green Beer, Saladillo",
      direccion: "Alvear 345",
      tel: "2264-45852130",
      email: "greenbeersaladillo@gmail.com",
      instagram: "@greenbeersaladillo",
      facebook: "greenbeersaladillo79",
      img: "https://www.laguiadebuenosaires.com/wp-content/uploads/2018/06/cervecerias-buenos-aires-antares.jpg"
    },
    {
      id: 2,
      name: "Green Beer, Junín",
      direccion: "Monte verde 1455",
      tel: "2874-45664864",
      email: "greenbeerjunin@gmail.com",
      instagram: "@greenbeerjunin",
      facebook: "greenbeerjunin79",
      img: "https://media-cdn.tripadvisor.com/media/photo-s/15/8e/0e/ad/salon.jpg"
    },
    {
      id: 3,
      name: "Green Beer, Tandil",
      direccion: "Azul 785",
      tel: "22844-4553233130",
      email: "greenbeertandil@gmail.com",
      instagram: "@greenbeertandil",
      facebook: "greenbeertandil79",
      img: "https://mancub-agp-production.s3.eu-central-1.amazonaws.com/media/cache/60/70/6070836920b5a80d7fca0604b73f6a22/uZlatehoTigra-07.jpg"
    },
    {
        id:4,
        name: "Green Beer, Lobos",
        direccion: "Rocallosa 1345",
        tel: "2227-479462130",
        email: "greenbeerlobos@gmail.com",
        instagram: "@greenbeerlobos",
        facebook: "greenbeerlobos79",
        img:"https://www.cronista.com/files/image/382/382185/6165d01ef0762_360_202!.webp?s=4211815eebff1c156447326907bda7c4&d=1689828506&oe=jpg"        
    },
    {
        id:5,
        name: "Green Beer, La plata",
        direccion: "Calle 82 5345",
        tel: "221-45852130",
        email: "greenbeerlaplata@gmail.com",
        instagram: "@greenbeerlaplata",
        facebook: "greenbeerlaplata79",
        img:"https://www.laguiaderoma.com/wp-content/uploads/2019/10/cervecerias-BrewDog-roma.jpg"
    },
    {
      id:6,
      name: "Green Beer, Sierra de la Ventana",
      direccion: "Calle rocallosa 2345",
      tel: "2564-45852130",
      email: "greenbeersierraventana@gmail.com",
      instagram: "@greenbeersierraventana",
      facebook: "greenbeersierraventana79",
      img:"https://media.viajando.travel/p/79dd4dbb0621bea062069a1ec3a5e137/adjuntos/236/imagenes/000/540/0000540978/1200x0/smart/la-cerveceria-patagonia-circuito-chico-es-un-exito-su-vista-panoramica-y-su-increible-cerveza.png"
  }
   
]  
    

  

    return(
    <sucursalContext.Provider value={sucursales}>
        {children}
    </sucursalContext.Provider>
  )
}

export default SucursalProvider;