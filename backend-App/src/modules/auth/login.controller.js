import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const prisma = new PrismaClient();

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Correo electrónico y contraseña son obligatorios.'
            });
        }

        const user = await prisma.account.findUnique({
            where: {
                email: email
            }
        });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({
                message: 'Credenciales incorrectas o usuario no encontrado.'
            });
        }

        dotenv.config();

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            console.error('La variable de entorno JWT_SECRET no está configurada.');
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }

        const token = jwt.sign({ userId: user.id, userEmail: user.email }, secret, {
            expiresIn: '15m', // Duración del token (ajustar según necesidades)
        });

        res.json({ token });
    } catch (error) {
        console.error('Error en la función login:', error);
        res.status(500).json({
            message: 'Error interno del servidor.'
        });
    }
}

export async function logout(req, res) {
    try {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ error: 'Token no proporcionado' });
        }

        dotenv.config();
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            console.error('La variable de entorno JWT_SECRET no está configurada.');
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }

        // En una aplicación real, aquí deberías invalidar el token en la base de datos
        // o en algún otro sistema persistente

        res.json({ message: 'Deslogueo exitoso' });
    } catch (error) {
        console.error('Error en la función logout:', error);
        res.status(500).json({
            message: 'Error interno del servidor.'
        });
    }
}