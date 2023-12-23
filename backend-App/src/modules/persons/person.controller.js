import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener todas las personas
export async function getPersons(req, res) {
    try {
        const persons = await prisma.person.findMany();
        res.json(persons);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Obtener los detalles de una persona por su ID
export async function getPersonDetails(req, res) {
    try {
        const personId = req.params.id;

        const existingPerson = await prisma.person.findUnique({
            where: {
                idPerson: personId,
            },
            include: {
                account: true,
                typeIdentification: true,
            },
        });

        if (!existingPerson) {
            return res.status(404).json({
                message: 'La persona especificada no existe.',
            });
        }
        res.json(existingPerson);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

// Crear una persona
export async function createPerson(req, res) {
    try {
        const {
            names,
            lastNames,
            idIdentification,
            numIdentification, 
            phone
        } = req.body;

        console.log(names ,lastNames ,idIdentification, numIdentification ,phone)

        if (!names || !lastNames || !idIdentification || !numIdentification || !phone) {
            return res.status(400).json({
                message: 'Todos los campos obligatorios son requeridos. Asegúrese de proporcionar names, lastNames, idIdentification, numIdentification y phone.',
            });
        }

        const newPerson = await prisma.person.create({
            data: {
                names,
                lastNames,
                idIdentification,
                numIdentification,
                phone,
                createDate: new Date(),  // Agregar la fecha de creación
                updateDate: new Date(),  // Agregar la fecha de actualización
            }
        });

        res.status(201).json(newPerson);  // Código de estado 201 (Created)
    } catch (error) {
        console.error('Error al crear la persona:', error);
        // Manejo de errores específicos de Prisma
        if (error.code === 'P2002' && error.meta?.target?.includes('numIdentification')) {
            return res.status(400).json({
                message: 'El número de identificación ya existe. Proporcione un número único.',
            });
        }

        res.status(500).json({
            message: 'Error interno del servidor al crear la persona.',
            error: error.message,
        });
    }
}

// Actualizar una persona
export async function updatePerson(req, res) {
    try {
        const personId = req.params.id;

        const {
            names,
            lastNames,
            idIdentification,
            numIdentification,
            phone
        } = req.body;

        if (!names || !lastNames || !idIdentification || !numIdentification || !phone) {
            return res.status(400).json({
                message: 'Los campos obligatorios son requeridos.'
            });
        }

        const existingPerson = await prisma.person.findUnique({
            where: {
                idPerson: personId
            }
        });

        if (!existingPerson) {
            return res.status(404).json({
                message: 'La persona especificada no existe.'
            });
        }

        const updatedPerson = await prisma.person.update({
            where: {
                idPerson: personId
            },
            data: {
                names,
                lastNames,
                idIdentification,
                numIdentification,
                phone,
                updateDate: new Date(),  // Agregar la fecha de actualización
            }
        });

        res.json(updatedPerson);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// Desactivar una persona (borrado lógico)
export async function softDeletePerson(req, res) {
    try {
        const personId = req.params.id;

        const existingPerson = await prisma.person.findUnique({
            where: {
                idPerson: personId
            }
        });

        if (!existingPerson) {
            return res.status(404).json({
                message: 'La persona especificada no existe.'
            });
        }

        await prisma.person.update({
            where: {
                idPerson: personId
            },
            data: {
                updateDate: new Date(),  // Agregar la fecha de actualización
            }
        });

        res.json({ message: 'La persona ha sido desactivada con éxito.' });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export async function deletePerson(req, res) {
    try {
        // Obtener el id de la persona de los parámetros de la URL
        const personId = parseInt(req.params.id, 10);  // Convertir a número base 10

        // Verificar si la conversión fue exitosa
        if (isNaN(personId)) {
            return res.status(400).json({
                message: 'El ID de la persona no es válido.'
            });
        }

        // Resto del código para eliminar la persona...
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}