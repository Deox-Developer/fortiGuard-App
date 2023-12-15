// Importa las dependencias necesarias

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Envia todos los roles

export async function getRoles(req, res) {
    try {
        const roles = await prisma.role.findMany();
        res.json(roles);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Crear un rol

export async function createRole(req, res) {
    try {
        // Extrae los datos del cuerpo de la solicitud (req.body)
        const {
            nameRole,
            // Otros campos necesarios para la creación del rol
        } = req.body;

        // Verifica si los campos obligatorios están presentes
        if (!nameRole) {
            return res.status(400).json({
                message: 'El nombre del rol es obligatorio.'
            });
        }

        // Crea el rol
        const newRole = await prisma.role.create({
            data: {
                nameRole,
                // Otros campos necesarios para la creación del rol
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
        // Extrae los datos del cuerpo de la solicitud (req.body)
        const {
            roleId, // Asumiendo que recibes el ID del rol a actualizar
            nameRole,
            // Otros campos necesarios para la actualización del rol
        } = req.body;

        // Verifica si el campo roleId está presente
        if (!roleId) {
            return res.status(400).json({
                message: 'Se requiere el ID del rol para la actualización.'
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

        // Realiza la actualización del rol
        const updatedRole = await prisma.role.update({
            where: {
                idRole: roleId
            },
            data: {
                nameRole,
                // Otros campos necesarios para la actualización del rol
            }
        });

        res.json(updatedRole);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Eliminar un rol

export async function deleteRole(req, res) {
    try {
        const roleId = req.params.id; // Supongamos que obtienes el ID del rol desde los parámetros de la solicitud

        // Comprueba si el rol con el ID proporcionado existe
        const role = await prisma.role.findUnique({
            where: {
                idRole: roleId
            }
        });

        if (!role) {
            return res.status(404).json({
                message: 'El rol especificado no existe.'
            });
        }

        // Elimina el rol
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