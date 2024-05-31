import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Por favor selecciona un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = response.data.imageUrl;
      
      await saveImageUrlToDatabase(imageUrl);

      setUploadStatus('Imagen subida con éxito: ' + imageUrl);
    } catch (error) {
      setUploadStatus('Error subiendo la imagen: ' + error.message);
    }
  };

  const saveImageUrlToDatabase = async (imageUrl) => {
    try {
      // Reemplaza esta URL con el endpoint de tu API para guardar la URL en la base de datos
      await axios.post('http://localhost:3000/save-image-url', { imageUrl });
    } catch (error) {
      console.error('Error guardando la URL de la imagen en la base de datos:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir Imagen</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default ImageUpload;
