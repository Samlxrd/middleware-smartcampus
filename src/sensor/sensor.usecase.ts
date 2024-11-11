import { ApiError } from "../errors";
import { Sensor, SensorRepository } from "./sensor.interface";
import { SensorRepositoryPrisma } from "./sensor.repository";
import { CreateSensorSchema } from "./sensor.schema";

export class SensorUsecase {
    private sensorRepository: SensorRepository;

    constructor() {
        this.sensorRepository = new SensorRepositoryPrisma();
    }

    async create(data: CreateSensorSchema): Promise<Sensor> {
        const sensorExists = await this.sensorRepository.findUnique(data.id_sensor);
        if (sensorExists) { throw new ApiError(409, 'Esse sensor já foi cadastrado.')}
        return this.sensorRepository.create(data);
    }
}