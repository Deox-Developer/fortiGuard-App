import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Obtener todas las cuentas
export async function getAccounts(req, res) {
    try {
        const accounts = await prisma.account.findMany();
        res.json(accounts);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Crear una cuenta
export async function createAccount(req, res) {
    try {
        const {
            nameAccount,
            email,
            password,
            roleAccount
        } = req.body;

        if (!nameAccount || !email || !password || !roleAccount) {
            return res.status(400).json({
                message: 'Los campos obligatorios son requeridos.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAccount = await prisma.account.create({
            data: {
                nameAccount,
                email,
                password: hashedPassword, // Almacena la contraseña hasheada
                roleAccount,
            }
        });

        res.json(newAccount);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Actualizar una cuenta
export async function updateAccount(req, res) {
    try {
        const accountId = req.params.id;

        const {
            nameAccount,
            email,
            password,
            roleAccount
        } = req.body;

        if (!nameAccount || !email || !roleAccount) {
            return res.status(400).json({
                message: 'Los campos obligatorios son requeridos.'
            });
        }

        const existingAccount = await prisma.account.findUnique({
            where: {
                idAccount: accountId
            }
        });

        if (!existingAccount) {
            return res.status(404).json({
                message: 'La cuenta especificada no existe.'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedAccount = await prisma.account.update({
            where: {
                idAccount: accountId
            },
            data: {
                nameAccount,
                email,
                password: hashedPassword,
                roleAccount,
            }
        });

        res.json(updatedAccount);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Desactivar una cuenta (borrado lógico)
export async function softDeleteAccount(req, res) {
    try {
        const accountId = req.params.id;

        const existingAccount = await prisma.account.findUnique({
            where: {
                idAccount: accountId
            }
        });

        if (!existingAccount) {
            return res.status(404).json({
                message: 'La cuenta especificada no existe.'
            });
        }

        await prisma.account.update({
            where: {
                idAccount: accountId
            },
            data: {
                statusAccount: false
            }
        });

        res.json({ message: 'La cuenta ha sido desactivada con éxito.' });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Eliminar una cuenta
export async function deleteAccount(req, res) {
    try {
        const accountId = req.params.id;

        const existingAccount = await prisma.account.findUnique({
            where: {
                idAccount: accountId
            }
        });

        if (!existingAccount) {
            return res.status(404).json({
                message: 'La cuenta especificada no existe.'
            });
        }

        await prisma.account.delete({
            where: {
                idAccount: accountId
            }
        });

        res.json({
            message: 'La cuenta ha sido eliminada exitosamente.'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}