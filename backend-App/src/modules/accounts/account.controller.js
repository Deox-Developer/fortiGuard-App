import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const prisma = new PrismaClient();

// Obtener todas las cuentas
export async function getAccounts(req, res) {
    try {
      const accounts = await prisma.account.findMany({
        include: {
          person: true,
          role: true,
        },
      });
      res.json(accounts);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

// Obtener los detalles de una cuenta por su ID
export async function getAccountDetails(req, res) {
    try {
        const accountId = parseInt(req.body.idAccount); // Asegúrate de que el id sea un número
        const existingAccount = await prisma.account.findUnique({
            where: {
                idAccount: accountId,
            },
            include: {
                person: true,
                role: true,
            },
        });
        if (!existingAccount) {
            return res.status(404).json({
                message: 'La cuenta especificada no existe.',
            });
        }
        res.json(existingAccount);
    } catch (error) {
        res.status(500).json({
            message: error.message,
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
            roleAccount,
            idPerson
        } = req.body;

        if (!nameAccount || !email || !password || !roleAccount || !idPerson) {
            return res.status(400).json({
                message: 'Todos los campos obligatorios son requeridos. Asegúrese de proporcionar nameAccount, email, password y roleAccount.',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAccount = await prisma.account.create({
            data: {
                nameAccount,
                email,
                password: hashedPassword,
                updateData: new Date(),
                role: {
                    connect: { idRole: roleAccount }
                },
                person: {
                    connect: { idPerson: idPerson }
                }
            }
        });

        // Generar el token
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            console.error('La variable de entorno JWT_SECRET no está configurada.');
            return res.status(500).json({
                error: 'Error interno del servidor.',
            });
        }

        const token = jwt.sign(
            {
                userId: newAccount.idAccount,
                userAccount: newAccount.nameAccount,
                userEmail: newAccount.email,
                userRole: newAccount.roleAccount,
                createDate: newAccount.createDate.toISOString(), // Convertir a formato ISO para ser compatible con JSON
            },
            secret,
            {
                expiresIn: '15m', // Duración del token (ajustar según necesidades)
            }
        );

        res.json({ token });
    } catch (error) {
        console.error('Error al crear la cuenta:', error);
        res.status(500).json({
            message: 'Error interno del servidor al crear la cuenta.',
            error: error.message,
        });
    }
}
// Actualizar una cuenta

export async function updateAccount(req, res) {
    try {
        const accountId = req.body.id;

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
                updateData: new Date(),  // Agregar la fecha de actualización
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
        const accountId = req.body.id;

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
                statusAccount: false,
                updateData: new Date(),  // Agregar la fecha de actualización
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
// Modifica la función deleteAccount en el servidor
export async function deleteAccount(req, res) {
    try {
      const accountId = parseInt(req.params.id, 10);
  
      if (isNaN(accountId)) {
        return res.status(400).json({
          message: 'El ID de la cuenta no es válido.'
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
  
      await prisma.account.delete({
        where: {
          idAccount: accountId
        }
      });
  
      res.json({
        message: 'La cuenta ha sido eliminada exitosamente.'
      });
    } catch (error) {
      console.error('Error en el servidor (Eliminar cuenta):', error);
      res.status(500).json({
        message: 'Error interno del servidor.'
      });
    }
  }