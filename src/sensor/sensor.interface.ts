import { CreateSensorSchema } from "./sensor.schema";

export interface Sensor {
    id: number;
    id_sensor: number;
    id_sala: number;
}

export interface SensorRepository {
    create(data: CreateSensorSchema): Promise<Sensor>;
    findUnique(id_sensor: number): Promise<Sensor | null>;
    findByRoomId(id_sala: number): Promise<Sensor | null>;
}