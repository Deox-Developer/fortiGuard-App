// Importa las dependencias necesarias

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Enviar todas las relaciones entre roles y permisos

export async function getRoleHashPermissions(req, res) {
    try {
        const roleHashPermissions = await prisma.roleHashPermission.findMany();
        res.json(roleHashPermissions);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Crear una relación entre rol y permiso

export async function createRoleHashPermission(req, res) {
    try {
        // Extrae los datos del cuerpo de la solicitud (req.body)
        const {
            roleId, // ID del rol
            permissionId, // ID del permiso
            // Otros campos necesarios para la creación de la relación
        } = req.body;

        // Verifica si los campos obligatorios están presentes
        if (!roleId || !permissionId) {
            return res.status(400).json({
                message: 'El ID del rol y el ID del permiso son obligatorios.'
            });
        }

        // Comprueba si el rol con el ID proporcionado existe
        const existingRole = await prisma.role.findUnique({
            where: {
                idRole: roleId
            }
        });

        if (!existingRole) {
            return res.status(404).json({
                message: 'El rol especificado no existe.'
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

        // Crea la relación entre el rol y el permiso
        const newRoleHashPermission = await prisma.roleHashPermission.create({
            data: {
                idRole: roleId,
                idPermission: permissionId,
                // Otros campos necesarios para la creación de la relación
            }
        });

        res.json(newRoleHashPermission);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Actualizar una relación entre rol y permiso

export async function updateRoleHashPermission(req, res) {
    try {
        // Extrae los datos del cuerpo de la solicitud (req.body)
        const {
            roleHashPermissionId, // Asumiendo que recibes el ID de la relación a actualizar
            roleId, // ID del rol
            permissionId, // ID del permiso
            // Otros campos necesarios para la actualización de la relación
        } = req.body;

        // Verifica si el campo roleHashPermissionId está presente
        if (!roleHashPermissionId) {
            return res.status(400).json({
                message: 'Se requiere el ID de la relación entre rol y permiso para la actualización.'
            });
        }

        // Comprueba si la relación con el ID proporcionado existe
        const existingRoleHashPermission = await prisma.roleHashPermission.findUnique({
            where: {
                idRoleHashPermission: roleHashPermissionId
            }
        });

        if (!existingRoleHashPermission) {
            return res.status(404).json({
                message: 'La relación entre rol y permiso especificada no existe.'
            });
        }

        // Comprueba si el rol con el ID proporcionado existe
        const existingRole = await prisma.role.findUnique({
            where: {
                idRole: roleId
            }
        });

        if (!existingRole) {
            return res.status(404).json({
                message: 'El rol especificado no existe.'
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

        // Realiza la actualización de la relación entre rol y permiso
        const updatedRoleHashPermission = await prisma.roleHashPermission.update({
            where: {
                idRoleHashPermission: roleHashPermissionId
            },
            data: {
                idRole: roleId,
                idPermission: permissionId,
                // Otros campos necesarios para la actualización de la relación
            }
        });

        res.json(updatedRoleHashPermission);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Eliminar una relación entre rol y permiso

export async function deleteRoleHashPermission(req, res) {
    try {
        const roleHashPermissionId = req.params.id; // Supongamos que obtienes el ID de la relación desde los parámetros de la solicitud

        // Comprueba si la relación con el ID proporcionado existe
        const roleHashPermission = await prisma.roleHashPermission.findUnique({
            where: {
                idRoleHashPermission: roleHashPermissionId
            }
        });

        if (!roleHashPermission) {
            return res.status(404).json({
                message: 'La relación entre rol y permiso especificada no existe.'
            });
        }

        // Elimina la relación entre rol y permiso
        await prisma.roleHashPermission.delete({
            where: {
                idRoleHashPermission: roleHashPermissionId
            }
        });

        res.json({
            message: 'La relación entre rol y permiso ha sido eliminada exitosamente.'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}