import { prisma } from "../database/prisma-client";
import { LogSensor, LogSensorRepository } from "../interfaces/log-sensor.interface";
import { CreateLogSensorSchema } from "../schemas/log-sensor.schema";

export class LogSensorRepositoryPrisma implements LogSensorRepository {
    async create(data: CreateLogSensorSchema): Promise<LogSensor> {
        const result = await prisma.logsensor.create({
            data: {
                sensor_id: data.sensor_id,
                presence: data.presence,
                timestamp: new Date(data.timestamp),
                hash: data.hash
            }
        })
        return {
            ...result,
            timestamp: result.timestamp.getTime()
        };
    }
}