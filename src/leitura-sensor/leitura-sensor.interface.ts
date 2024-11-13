import { SensorDataSchema } from "../sensor/sensor.schema";

export interface LeituraSensor {
    id: number;
    sensor_id: number;
    presence: boolean;
    timestamp: number;
    hash: string;
}

export interface LeituraSensorRepository {
    create(data: SensorDataSchema): Promise<LeituraSensor>;
    getLeiturasBySensorId(sensor_id: number): Promise<LeituraSensor[]>;
}