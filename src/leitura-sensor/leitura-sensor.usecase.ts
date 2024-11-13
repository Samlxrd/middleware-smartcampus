import { SensorRepository } from "sensor/sensor.interface";
import { SensorDataSchema } from "../sensor/sensor.schema";
import { LeituraSensor, LeituraSensorRepository } from "./leitura-sensor.interface";
import { LeituraSensorRepositoryPrisma } from "./leitura-sensor.repository";
import { StatusSalaRepository } from "status-sala/status-sala.interface";
import { StatusSalaRepositoryPrisma } from "status-sala/status-sala.repository";
import { SensorRepositoryPrisma } from "sensor/sensor.repository";
import { ApiError } from "errors";

export class LeituraSensorUsecase {
    private leituraSensorRepository: LeituraSensorRepository;
    private statusSalaRepository: StatusSalaRepository;
    private sensorRepository: SensorRepository;

    constructor() {
        this.leituraSensorRepository = new LeituraSensorRepositoryPrisma();
        this.statusSalaRepository = new StatusSalaRepositoryPrisma();
        this.sensorRepository = new SensorRepositoryPrisma();
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

        // Busca o id da sala associado ao id do sensor
        const roomData = await this.sensorRepository.findUnique(sensor_id);
        if (!roomData) { throw new ApiError(404, 'Sensor não encontrado'); }

        // Envia a leitura do sensor para o backend da aplicação
        await this.sendRequest(roomData.id_sala, presence, temperature);

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

        // Atualiza o registro de status da sala
        await this.statusSalaRepository.update({
            sensor_id,
            presence,
            temperature,
            lastPresenceTimestamp: presence ? new Date(timestamp).getTime() : currentStatus.lastPresenceTimestamp
        });

        if (!currentStatus.automaticMode) {
            console.log('Modo manual ativado. Não será feita nenhuma ação.');
            return;
        }

        // Se não houver presença e a temperatura for menor que 20 graus por pelo menos
        // 5 minutos, enviar comando para desligar o ar-condicionado 
        if (!presence && temperature < 22) {
            const lastPresenceDiff = Date.now() - (new Date(currentStatus.lastPresenceTimestamp!).getTime() || 0);
            const halfMinute = 30 * 1000;
            if (lastPresenceDiff > halfMinute) {
                this.turnOff(sensor_id);
            }
        }
        
    }

    async create(data: SensorDataSchema): Promise<LeituraSensor> {

        data.presence = data.presence === true ? true : false;
        this.handlePresenceDetection(data);

        const result = await this.leituraSensorRepository.create(data);
        return result;
    }

    async getLeiturasBySensorId(sensor_id: number): Promise<LeituraSensor[]> {
        const result = await this.leituraSensorRepository.getLeiturasBySensorId(sensor_id);
        return result;
    }
}