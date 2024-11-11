import { SensorDataSchema } from "../sensor/sensor.schema";
import { LogSensor, LogSensorRepository } from "./leitura-sensor.interface";
import { LogSensorRepositoryPrisma } from "./leitura-sensor.repository";
import { StatusSalaRepository } from "status-sala/status-sala.interface";
import { StatusSalaRepositoryPrisma } from "status-sala/status-sala.repository";

export class LogSensorUsecase {
    private logSensorRepository: LogSensorRepository;
    private statusSalaRepository: StatusSalaRepository;
    constructor() {
        this.logSensorRepository = new LogSensorRepositoryPrisma();
        this.statusSalaRepository = new StatusSalaRepositoryPrisma();
    }

    private async turnOff(sensor_id: number): Promise<void> {
        console.log('Simulando o desligamento do ar-condicionado de id ', sensor_id);
    }

    // Envia request para o backend da aplicação, contendo presença e temperatura da sala cujo sensor_id é passado como parâmetro
    private async sendRequest(sensor_id: number, presence: boolean, temperature: number ): Promise<any> {
        const response = await fetch(`http://localhost:3333/salas/status/${sensor_id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({presence: presence, temperature: temperature}),
          });
        console.log(`Enviando comando: Sensor_id: ${sensor_id}, Presença: ${presence}`)
        return response.json();
    }

    private async handlePresenceDetection(data: SensorDataSchema): Promise<any> {
        const { sensor_id, presence, temperature, timestamp } = data;

        // Envia a leitura do sensor para o backend da aplicação
        await this.sendRequest(sensor_id, presence, temperature);

        const currentStatus = await this.statusSalaRepository.getBySensorId(sensor_id);

        // Se não houver registro de status da sala, criar um novo
        if (!currentStatus) {
            await this.statusSalaRepository.create({
                sensor_id,
                presence,
                temperature,
                lastPresenceTimestamp: presence ? new Date(timestamp).getTime() : null
            });

            return;
        }

        await this.statusSalaRepository.update({
            sensor_id,
            presence,
            temperature,
            lastPresenceTimestamp: presence ? new Date(timestamp).getTime() : currentStatus.lastPresenceTimestamp
        });

        // Se não houver presença e a temperatura for menor que 20 graus por pelo menos
        // 5 minutos, enviar comando para desligar o ar-condicionado 
        if (!presence && temperature < 22) {
            const lastPresenceDiff = Date.now() - (new Date(currentStatus.lastPresenceTimestamp!).getTime() || 0);
            const fiveMinutes = 5 * 60 * 1000;
            if (lastPresenceDiff > fiveMinutes) {
                this.turnOff(sensor_id);
            }
        }
        
    }

    async create(data: SensorDataSchema): Promise<LogSensor> {

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