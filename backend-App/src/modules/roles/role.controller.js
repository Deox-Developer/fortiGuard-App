import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los roles
export async function getRoles(req, res) {
    try {
        const roles = await prisma.role.findMany({
            include: {
                account: true,
                roleHashPermission: true,
            }
        });
        res.json(roles);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Obtener los detalles de un rol por su ID
export async function getRoleDetails(req, res) {
    try {
        const roleId = req.params.id;

        const existingRole = await prisma.role.findUnique({
            where: {
                idRole: roleId,
            },
            include: {
                account: true,
                roleHashPermission: true,
            },
        });

        if (!existingRole) {
            return res.status(404).json({
                message: 'El rol especificado no existe.',
            });
        }
        res.json(existingRole);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

// Crear un rol
export async function createRole(req, res) {
    try {
        const { nameRole } = req.body;

        if (!nameRole) {
            return res.status(400).json({
                message: 'El nombre del rol es obligatorio.'
            });
        }

        const newRole = await prisma.role.create({
            data: {
                nameRole,
                updateData: new Date(),  // Agregar la fecha de actualización
            }
        });

        res.json(newRole);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Actualizar un rol
export async function updateRole(req, res) {
    try {
        const roleId = req.params.id;

        const { nameRole } = req.body;

        if (!nameRole) {
            return res.status(400).json({
                message: 'El nombre del rol es obligatorio.'
            });
        }

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

        const updatedRole = await prisma.role.update({
            where: {
                idRole: roleId
            },
            data: {
                nameRole,
                updateData: new Date(),  // Agregar la fecha de actualización
            }
        });

        res.json(updatedRole);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Desactivar un rol (borrado lógico)
export async function softDeleteRole(req, res) {
    try {
        const roleId = req.params.id;

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

        await prisma.role.update({
            where: {
                idRole: roleId
            },
            data: {
                statusRol: false,
                updateData: new Date(),  // Agregar la fecha de actualización
            }
        });

        res.json({ message: 'El rol ha sido desactivado con éxito.' });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Eliminar un rol
export async function deleteRole(req, res) {
    try {
        const roleId = req.params.id;

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

        await prisma.role.delete({
            where: {
                idRole: roleId
            }
        });

        res.json({
            message: 'El rol ha sido eliminado exitosamente.'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
