import { SensorRepository } from "sensor/sensor.interface";
import { StatusSala, StatusSalaRepository } from "./status-sala.interface";
import { StatusSalaRepositoryPrisma } from "./status-sala.repository";
import { UpdateAutomaticModeSchema } from "./status-sala.schema";
import { SensorRepositoryPrisma } from "sensor/sensor.repository";

export class StatusSalaUsecase {
    private statusSalaRepository: StatusSalaRepository;
    private sensorRepository : SensorRepository;

    constructor() {
        this.statusSalaRepository = new StatusSalaRepositoryPrisma();
        this.sensorRepository = new SensorRepositoryPrisma();
    }

    async updateAutomaticMode(room_id: number, data: UpdateAutomaticModeSchema): Promise<StatusSala> {
        // De acordo com o id da sala, busca o sensor associado a ela para atualizar o modo automático. (True ou False)
        const sensorFromRoom = await this.sensorRepository.findByRoomId(room_id);

        if (!sensorFromRoom) {
            throw new Error('Sala não encontrada');
        }

        const result = await this.statusSalaRepository.updateAutomaticMode(sensorFromRoom.id_sensor, data);
        return result;
    }
}