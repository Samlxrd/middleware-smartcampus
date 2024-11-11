import { StatusSalaSchema } from "schemas/status-sala.schema";

export interface StatusSala {
    id: number;
    sensor_id: number; 
    presence: boolean   
    temperature: number;
    lastPresenceTimestamp: number;     
}

export interface StatusSalaRepository {
    create(data: StatusSalaSchema): Promise<StatusSala>;
    getBySensorId(sensor_id: number): Promise<StatusSala | null>;
    update(data: StatusSalaSchema): Promise<StatusSala>;
}