import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todas las asignaciones de permisos a roles
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

// Obtener los detalles de una asignación de permiso a rol por su ID
export async function getRoleHashPermissionDetails(req, res) {
    try {
        const roleHashPermissionId = req.params.id;

        const existingRoleHashPermission = await prisma.roleHashPermission.findUnique({
            where: {
                idRoleHashPermission: roleHashPermissionId,
            },
            include: {
                permission: true,
                role: true,
            },
        });

        if (!existingRoleHashPermission) {
            return res.status(404).json({
                message: 'La asignación de permiso a rol especificada no existe.',
            });
        }
        res.json(existingRoleHashPermission);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

// Crear una asignación de permiso a rol
export async function createRoleHashPermission(req, res) {
    try {
        const { idRole, idPermission } = req.body;

        if (!idRole || !idPermission) {
            return res.status(400).json({
                message: 'Los campos idRole e idPermission son obligatorios.'
            });
        }

        const newRoleHashPermission = await prisma.roleHashPermission.create({
            data: {
                idRole,
                idPermission,
                updateData: new Date(),  // Agregar la fecha de actualización
            }
        });

        res.json(newRoleHashPermission);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Actualizar una asignación de permiso a rol
export async function updateRoleHashPermission(req, res) {
    try {
        const roleHashPermissionId = req.params.id;

        const { idRole, idPermission } = req.body;

        if (!idRole || !idPermission) {
            return res.status(400).json({
                message: 'Los campos idRole e idPermission son obligatorios.'
            });
        }

        const existingRoleHashPermission = await prisma.roleHashPermission.findUnique({
            where: {
                idRoleHashPermission: roleHashPermissionId
            }
        });

        if (!existingRoleHashPermission) {
            return res.status(404).json({
                message: 'La asignación de permiso a rol especificada no existe.'
            });
        }

        const updatedRoleHashPermission = await prisma.roleHashPermission.update({
            where: {
                idRoleHashPermission: roleHashPermissionId
            },
            data: {
                idRole,
                idPermission,
                updateData: new Date(),  // Agregar la fecha de actualización
            }
        });

        res.json(updatedRoleHashPermission);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Desactivar una asignación de permiso a rol (borrado lógico)
export async function softDeleteRoleHashPermission(req, res) {
    try {
        const roleHashPermissionId = req.params.id;

        const existingRoleHashPermission = await prisma.roleHashPermission.findUnique({
            where: {
                idRoleHashPermission: roleHashPermissionId
            }
        });

        if (!existingRoleHashPermission) {
            return res.status(404).json({
                message: 'La asignación de permiso a rol especificada no existe.'
            });
        }

        await prisma.roleHashPermission.update({
            where: {
                idRoleHashPermission: roleHashPermissionId
            },
            data: {
                statusRoleHashPermission: false,
                updateData: new Date(),  // Agregar la fecha de actualización
            }
        });

        res.json({ message: 'La asignación de permiso a rol ha sido desactivada con éxito.' });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Eliminar una asignación de permiso a rol
export async function deleteRoleHashPermission(req, res) {
    try {
        const roleHashPermissionId = req.params.id;

        const existingRoleHashPermission = await prisma.roleHashPermission.findUnique({
            where: {
                idRoleHashPermission: roleHashPermissionId
            }
        });

        if (!existingRoleHashPermission) {
            return res.status(404).json({
                message: 'La asignación de permiso a rol especificada no existe.'
            });
        }

        await prisma.roleHashPermission.delete({
            where: {
                idRoleHashPermission: roleHashPermissionId
            }
        });

        res.json({
            message: 'La asignación de permiso a rol ha sido eliminada exitosamente.'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
