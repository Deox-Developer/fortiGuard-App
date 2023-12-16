import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Configurar dotenv para cargar variables de entorno desde .env
dotenv.config();

export function authenticateToken(req, res, next) {
  try {
    // Manejo de Token en el Encabezado
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado en el encabezado Authorization' });
    }

    const secret = process.env.JWT_SECRET;

    // Verificar el token JWT
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        if (err.name === 'JsonWebTokenError') {
          return res.status(403).json({ error: 'Token no válido' });
        } else if (err.name === 'TokenExpiredError') {
          return res.status(403).json({ error: 'Token expirado' });
        } else {
          return res.status(403).json({ error: 'Error al verificar el token' });
        }
      }
      

      // Token válido, adjuntar la información del usuario a la solicitud
      req.user = user;
      next();
    });
  } catch (error) {
    // Manejar excepciones al leer la variable de entorno JWT_SECRET
    console.error('Error al leer la variable de entorno JWT_SECRET:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}