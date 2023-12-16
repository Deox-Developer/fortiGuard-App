import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'; // Importa el paquete cors
import { mainRoutes } from './routes/main.routes.js';

function main() {
    // Configuraciones
    dotenv.config();
    const app = express();

    // Middlewares
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(cors({
        origin: 'http://localhost:4200', // Reemplaza con el dominio de tu aplicación Angular
        optionsSuccessStatus: 200, // Algunos navegadores pueden enviar una solicitud OPTIONS antes de la solicitud POST
        credentials: true,
    }));

    // Rutas
    mainRoutes(app);

    // Define un puerto por defecto si PORT_BACK no está configurado
    const port = process.env.PORT_BACK || 3000;

    app.listen(port, () => {
        console.log(`Backend ACTIVO - listening on http://localhost:${port} by FortiGuard App`);
    });
}


main();