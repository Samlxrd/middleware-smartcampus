import { SensorDataSchema } from "../sensor/sensor.schema";
import { prisma } from "../database/prisma-client";
import { LogSensor, LogSensorRepository } from "./leitura-sensor.interface";

export class LogSensorRepositoryPrisma implements LogSensorRepository {
    async create(data: SensorDataSchema): Promise<LogSensor> {
        const result = await prisma.logsensor.create({
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
    async getLogsBySensorId(sensor_id: number): Promise<LogSensor[]> {
        const result = await prisma.logsensor.findMany({
            where: {
                sensor_id: sensor_id
            },
            orderBy: {
                timestamp: 'desc'
            }
        })
        return result.map(log => {
            return {
                ...log,
                timestamp: log.timestamp.getTime()
            }
        });
    }
}