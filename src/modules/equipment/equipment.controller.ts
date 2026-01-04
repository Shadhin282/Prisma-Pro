import { Request, Response } from "express"
import { prisma } from "../../lib/prisma"

const createEquipment = async (req:Request, res: Response) => {
    const payload = req.body;
    const equipment = await prisma.equipment.create({
        data : payload,
    })

    res.status(201).json({
        success: true,
        message : "Created"
    })
}

const getEquipment = async (req: Request, res: Response) => {
    const result = await prisma.equipment.findMany();
    res.status(200).json({
        success: true,
        data : result
    })
}
export const equipmentController = {
    createEquipment,
    getEquipment
}