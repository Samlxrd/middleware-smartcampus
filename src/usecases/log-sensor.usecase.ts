import { LogSensor, LogSensorRepository } from "../interfaces/log-sensor.interface";
import { LogSensorRepositoryPrisma } from "../repositories/log-sensor.repository";
import { CreateLogSensorSchema } from "../schemas/log-sensor.schema";

export class LogSensorUsecase {
    private logSensorRepository: LogSensorRepository;
    constructor() {
        this.logSensorRepository = new LogSensorRepositoryPrisma();
    }

    private async sendRequest(sensor_id: number, presence: boolean ): Promise<any> {
        const response = await fetch(`http://localhost:3333/salas/status/${sensor_id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({presence: presence}),
          });
        console.log(`Enviando comando: Sensor_id: ${sensor_id}, Presença: ${presence}`)
        return response.json();
    }

    private async handlePresenceDetection(data: CreateLogSensorSchema): Promise<any> {
        const res = await this.sendRequest(data.sensor_id, data.presence);
        if (data.presence) return;

        // POST para controladora do sensor de presença
        // Comando de desligamento
        
    }

    async create(data: CreateLogSensorSchema): Promise<LogSensor> {

        data.presence = data.presence === true ? true : false;
        this.handlePresenceDetection(data);

        const result = await this.logSensorRepository.create(data);
        return result;
    }

    async getLogsBySensorId(sensor_id: number): Promise<LogSensor[]> {
        const result = await this.logSensorRepository.getLogsBySensorId(sensor_id);
        return result;
    }
}