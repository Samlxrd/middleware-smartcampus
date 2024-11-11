import { FastifyReply, FastifyRequest } from "fastify";
import { LogSensorUsecase } from "./leitura-sensor.usecase";
import { sensorDataSchema } from "../sensor/sensor.schema";

export class LogSensorController {
    private logSensorUsecase: LogSensorUsecase;
    constructor() {
        this.logSensorUsecase = new LogSensorUsecase();
    }

    async create(req: FastifyRequest, reply: FastifyReply) {
        const logData = sensorDataSchema.parse(req.body);
        const result = await this.logSensorUsecase.create(logData);
        return reply.code(201).send(result);
    }

    async getLogsBySensorId(id: number, req: FastifyRequest, reply: FastifyReply) {
        const result = await this.logSensorUsecase.getLogsBySensorId(id);
        return reply.send(result);
    }
}