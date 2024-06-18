export const generarClaveReserva = () => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let claveReserva = '';
        for (let i = 0; i < 6; i++) {
            const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
            claveReserva += caracteres.charAt(indiceAleatorio);
        }
        return claveReserva;
    }
