import React, { useEffect, useState } from 'react';
import './ReservasCard.css'; 
import Subtitulo from '../subtitulo/Subtitulo';
import AnimatedSVG from '../animacion/AnimatedSVG';
import ConfirmModal from './ConfirmModal';
import { BASE_URL } from '../../endPoints/endPoints';
import { useAuth } from '../auth/AuthContext';
import ReservasCard from './ReservasCard';

const ReservasList = () => {
  const { auth } = useAuth();
  const { token } = auth || {};

  const [reservas, setReservas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReservaId, setSelectedReservaId] = useState(null);

  useEffect(() => {
    if (token) {
      fetch(`${BASE_URL}/reserva`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          const sortedData = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
          setReservas(sortedData);
        })
        .catch(error => {
          console.error('Error fetching reservations:', error);
        });
    }
  }, [token]);

  const handleDelete = (id) => {
    setSelectedReservaId(id);
    setModalOpen(true);
  };

  const confirmDelete = (id) => {
    fetch(`${BASE_URL}/reserva/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    })
    .then(response => {
      if (response.ok) {
        setReservas(reservas.filter(reserva => reserva.id !== id));
      } else {
        response.text().then(errorMessage => {
          console.error(`Error deleting reservation: ${response.status} - ${errorMessage}`);
        });
      }
      setModalOpen(false);
      setSelectedReservaId(null);
    })
    .catch(error => {
      console.error('Error deleting reservation:', error);
      setModalOpen(false);
      setSelectedReservaId(null);
    });
  };

  const handleEdit = (id) => {
    // Lógica para editar la reserva
  };

  const reservasPorFecha = reservas.reduce((acc, reserva) => {
    const [year, month, day] = reserva.fecha.split('-');
    const fecha = new Date(year, month - 1, day).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    if (!acc[fecha]) {
      acc[fecha] = [];
    }
    acc[fecha].push(reserva);
    return acc;
  }, {});

  const fechasOrdenadas = Object.keys(reservasPorFecha).sort((a, b) => {
    const fechaA = new Date(a.split('/').reverse().join('-'));
    const fechaB = new Date(b.split('/').reverse().join('-'));
    return fechaB - fechaA;
  });

  return (
    <div className='conteinerGeneral'>
      <Subtitulo clase={"subtitulo"} texto={`Lista de reservas`} />
      {reservas != null && reservas.length > 0 ? (
        <>
          <p className='pedido-cantidad'>{`${reservas.length} Reservas recibidas`}</p>
          <div className="pedidos-menu">
            {fechasOrdenadas.map(fecha => (
              <React.Fragment key={fecha}>
                <p className="fecha-general">{fecha}</p>
                {reservasPorFecha[fecha].map(reserva => (
                  <ReservasCard
                    key={reserva.id}
                    reserva={reserva}
                    onClick={() => handleEdit(reserva.id)}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </>
      ) : (
        <>
          <AnimatedSVG />
        </>
      )}
      {modalOpen && (
        <ConfirmModal
          message="¿Está seguro que desea eliminar la reserva?"
          onConfirm={() => confirmDelete(selectedReservaId)}
          onCancel={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ReservasList;


/*
<div key={fecha} className="reservas-fecha-group">
                <div className="fecha-bar">{fecha}</div>
                {reservasPorFecha[fecha].map(reserva => (
                  <ReservasCard
                    key={reserva.id}
                    reserva={reserva}
                    onClick={() => handleEdit(reserva.id)}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                  */