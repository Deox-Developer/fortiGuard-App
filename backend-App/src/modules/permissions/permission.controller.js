import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todas las permisos
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

// Obtener los detalles de un permiso por su ID
export async function getPermissionDetails(req, res) {
    try {
        const permissionId = req.params.id;

        const existingPermission = await prisma.permission.findUnique({
            where: {
                idPermission: permissionId,
            },
        });

        if (!existingPermission) {
            return res.status(404).json({
                message: 'El permiso especificado no existe.',
            });
        }
        res.json(existingPermission);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

// Crear un permiso
export async function createPermission(req, res) {
    try {
        const {
            namePermission,
            endPoint
        } = req.body;

        if (!namePermission || !endPoint) {
            return res.status(400).json({
                message: 'Todos los campos obligatorios son requeridos. Asegúrese de proporcionar namePermission y endPoint.',
            });
        }

        const newPermission = await prisma.permission.create({
            data: {
                namePermission,
                endPoint,
                updateData: new Date(),  // Agregar la fecha de actualización
            }
        });

        res.json(newPermission);
    } catch (error) {
        console.error('Error al crear el permiso:', error);
        res.status(500).json({
            message: 'Error interno del servidor al crear el permiso.',
            error: error.message,
        });
    }
}

// Actualizar un permiso
export async function updatePermission(req, res) {
    try {
        const permissionId = req.params.id;

        const {
            namePermission,
            endPoint
        } = req.body;

        if (!namePermission || !endPoint) {
            return res.status(400).json({
                message: 'Los campos obligatorios son requeridos.'
            });
        }

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

        const updatedPermission = await prisma.permission.update({
            where: {
                idPermission: permissionId
            },
            data: {
                namePermission,
                endPoint,
                updateData: new Date(),  // Agregar la fecha de actualización
            }
        });

        res.json(updatedPermission);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Desactivar un permiso (borrado lógico)
export async function softDeletePermission(req, res) {
    try {
        const permissionId = req.params.id;

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

        await prisma.permission.update({
            where: {
                idPermission: permissionId
            },
            data: {
                statusPermission: false,
                updateData: new Date(),  // Agregar la fecha de actualización
            }
        });

        res.json({ message: 'El permiso ha sido desactivado con éxito.' });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Eliminar un permiso
export async function deletePermission(req, res) {
    try {
        const permissionId = req.params.id;

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