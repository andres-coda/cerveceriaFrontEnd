import React from "react";
import { useParams } from "react-router-dom";
import Reservas from "./Reservas";

function EditarReserva() {
    const { id } = useParams(); 

    return <Reservas reservaEdit={id} />;
}

export default EditarReserva;
