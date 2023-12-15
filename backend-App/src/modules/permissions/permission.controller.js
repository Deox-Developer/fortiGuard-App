// Importa las dependencias necesarias

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Envia todos los permisos

export async function getPermissions(req, res) {
    try {
        const permissions = await prisma.permission.findMany();
        res.json(permissions);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Crear un permiso

export async function createPermission(req, res) {
    try {
        // Extrae los datos del cuerpo de la solicitud (req.body)
        const {
            namePermission,
            endPoint,
            // Otros campos necesarios para la creación del permiso
        } = req.body;

        // Verifica si los campos obligatorios están presentes
        if (!namePermission || !endPoint) {
            return res.status(400).json({
                message: 'El nombre del permiso y el endpoint son obligatorios.'
            });
        }

        // Crea el permiso
        const newPermission = await prisma.permission.create({
            data: {
                namePermission,
                endPoint,
                // Otros campos necesarios para la creación del permiso
            }
        });

        res.json(newPermission);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Actualizar un permiso

export async function updatePermission(req, res) {
    try {
        // Extrae los datos del cuerpo de la solicitud (req.body)
        const {
            permissionId, // Asumiendo que recibes el ID del permiso a actualizar
            namePermission,
            endPoint,
            // Otros campos necesarios para la actualización del permiso
        } = req.body;

        // Verifica si el campo permissionId está presente
        if (!permissionId) {
            return res.status(400).json({
                message: 'Se requiere el ID del permiso para la actualización.'
            });
        }

        // Comprueba si el permiso con el ID proporcionado existe
        const existingPermission = await prisma.permission.findUnique({
            where: {
                idPermission: permissionId
            }
        });

        if (!existingPermission) {
            return res.status(404).json({
                message: 'El permiso especificado no existe.'
            });
        }

        // Realiza la actualización del permiso
        const updatedPermission = await prisma.permission.update({
            where: {
                idPermission: permissionId
            },
            data: {
                namePermission,
                endPoint,
                // Otros campos necesarios para la actualización del permiso
            }
        });

        res.json(updatedPermission);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Eliminar un permiso

export async function deletePermission(req, res) {
    try {
        const permissionId = req.params.id; // Supongamos que obtienes el ID del permiso desde los parámetros de la solicitud

        // Comprueba si el permiso con el ID proporcionado existe
        const permission = await prisma.permission.findUnique({
            where: {
                idPermission: permissionId
            }
        });

        if (!permission) {
            return res.status(404).json({
                message: 'El permiso especificado no existe.'
            });
        }

        // Elimina el permiso
        await prisma.permission.delete({
            where: {
                idPermission: permissionId
            }
        });

        res.json({
            message: 'El permiso ha sido eliminado exitosamente.'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}