import { prisma } from "../database/prisma-client";
import { Sensor, SensorRepository } from "./sensor.interface";
import { CreateSensorSchema } from "./sensor.schema";

export class SensorRepositoryPrisma implements SensorRepository {
    async create(data: CreateSensorSchema): Promise<Sensor> {
        const result = await prisma.sensor.create({
            data: {
                id_sensor: data.id_sensor,
                id_sala: data.id_sala,
            }
        })
        return result;
    }

    async findUnique(id_sensor: number): Promise<Sensor | null> {
        const result = await prisma.sensor.findUnique({
            where: {
                id_sensor: id_sensor
            }
        })
        return result;
    }

}