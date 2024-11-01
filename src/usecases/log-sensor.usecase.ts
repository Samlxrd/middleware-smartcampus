import { LogSensor, LogSensorRepository } from "../interfaces/log-sensor.interface";
import { LogSensorRepositoryPrisma } from "../repositories/log-sensor.repository";
import { CreateLogSensorSchema } from "../schemas/log-sensor.schema";

export class LogSensorUsecase {
    private logSensorRepository: LogSensorRepository;
    constructor() {
        this.logSensorRepository = new LogSensorRepositoryPrisma();
    }

    async create(data: CreateLogSensorSchema): Promise<LogSensor> {
        data.presence = data.presence === true ? true : false;
        const result = await this.logSensorRepository.create(data);
        return result;
    }
}