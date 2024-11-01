import { FastifyReply, FastifyRequest } from "fastify";
import { LogSensorUsecase } from "../usecases/log-sensor.usecase";
import { createLogSensorSchema } from "../schemas/log-sensor.schema";

export class LogSensorController {
    private logSensorUsecase: LogSensorUsecase;
    constructor() {
        this.logSensorUsecase = new LogSensorUsecase();
    }

    async create(req: FastifyRequest, reply: FastifyReply) {
        const logData = createLogSensorSchema.parse(req.body);
        const result = await this.logSensorUsecase.create(logData);
        return reply.code(201).send(result);
    }
}