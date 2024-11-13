import { SensorDataSchema } from "../sensor/sensor.schema";
import { prisma } from "../database/prisma-client";
import { LeituraSensor, LeituraSensorRepository } from "./leitura-sensor.interface";

export class LeituraSensorRepositoryPrisma implements LeituraSensorRepository {
    async create(data: SensorDataSchema): Promise<LeituraSensor> {
        const result = await prisma.leituraSensor.create({
            data: {
                sensor_id: data.sensor_id,
                presence: data.presence,
                temperature: data.temperature,
                timestamp: new Date(data.timestamp),
                hash: data.hash
            }
        })
        return {
            ...result,
            timestamp: result.timestamp.getTime()
        };
    }
    async getLeiturasBySensorId(sensor_id: number): Promise<LeituraSensor[]> {
        const result = await prisma.leituraSensor.findMany({
            where: {
                sensor_id: sensor_id
            },
            orderBy: {
                timestamp: 'desc'
            }
        })
        return result.map(leitura => {
            return {
                ...leitura,
                timestamp: leitura.timestamp.getTime()
            }
        });
    }
}