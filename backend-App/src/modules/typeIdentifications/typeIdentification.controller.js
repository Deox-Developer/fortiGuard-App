import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todos los tipos de identificación
export async function getTypeIdentifications(req, res) {
    try {
        const typeIdentifications = await prisma.typeIdentification.findMany();
        res.json(typeIdentifications);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Obtener los detalles de un tipo de identificación por su ID
export async function getTypeIdentificationDetails(req, res) {
    try {
        const typeIdentificationId = req.params.id;

        const existingTypeIdentification = await prisma.typeIdentification.findUnique({
            where: {
                idTypeIdentification: typeIdentificationId,
            },
            include: {
                person: true,
            },
        });

        if (!existingTypeIdentification) {
            return res.status(404).json({
                message: 'El tipo de identificación especificado no existe.',
            });
        }
        res.json(existingTypeIdentification);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

// Crear un tipo de identificación
export async function createTypeIdentification(req, res) {
    try {
        const { nameIdentification } = req.body;

        if (!nameIdentification) {
            return res.status(400).json({
                message: 'El nombre del tipo de identificación es obligatorio.'
            });
        }

        const newTypeIdentification = await prisma.typeIdentification.create({
            data: {
                nameIdentification,
            }
        });

        res.json(newTypeIdentification);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Actualizar un tipo de identificación
export async function updateTypeIdentification(req, res) {
    try {
        const typeIdentificationId = req.params.id;

        const { nameIdentification } = req.body;

        if (!nameIdentification) {
            return res.status(400).json({
                message: 'El nombre del tipo de identificación es obligatorio.'
            });
        }

        const existingTypeIdentification = await prisma.typeIdentification.findUnique({
            where: {
                idTypeIdentification: typeIdentificationId
            }
        });

        if (!existingTypeIdentification) {
            return res.status(404).json({
                message: 'El tipo de identificación especificado no existe.'
            });
        }

        const updatedTypeIdentification = await prisma.typeIdentification.update({
            where: {
                idTypeIdentification: typeIdentificationId
            },
            data: {
                nameIdentification,
            }
        });

        res.json(updatedTypeIdentification);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Desactivar un tipo de identificación (borrado lógico)
export async function softDeleteTypeIdentification(req, res) {
    try {
        const typeIdentificationId = req.params.id;

        const existingTypeIdentification = await prisma.typeIdentification.findUnique({
            where: {
                idTypeIdentification: typeIdentificationId
            }
        });

        if (!existingTypeIdentification) {
            return res.status(404).json({
                message: 'El tipo de identificación especificado no existe.'
            });
        }

        await prisma.typeIdentification.update({
            where: {
                idTypeIdentification: typeIdentificationId
            },
            data: {
                statusTypeIdentification: false,
            }
        });

        res.json({ message: 'El tipo de identificación ha sido desactivado con éxito.' });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Eliminar un tipo de identificación
export async function deleteTypeIdentification(req, res) {
    try {
        const typeIdentificationId = req.params.id;

        const existingTypeIdentification = await prisma.typeIdentification.findUnique({
            where: {
                idTypeIdentification: typeIdentificationId
            }
        });

        if (!existingTypeIdentification) {
            return res.status(404).json({
                message: 'El tipo de identificación especificado no existe.'
            });
        }

        await prisma.typeIdentification.delete({
            where: {
                idTypeIdentification: typeIdentificationId
            }
        });

        res.json({
            message: 'El tipo de identificación ha sido eliminado exitosamente.'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}
