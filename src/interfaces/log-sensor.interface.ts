import { CreateLogSensorSchema } from "../schemas/log-sensor.schema";

export interface LogSensor {
    id: number;
    sensor_id: number;
    presence: boolean;
    timestamp: number;
    hash: string;
}

export interface LogSensorRepository {
    create(data: CreateLogSensorSchema): Promise<LogSensor>;
    getLogsBySensorId(sensor_id: number): Promise<LogSensor[]>;
}