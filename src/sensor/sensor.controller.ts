import { FastifyReply, FastifyRequest } from "fastify";
import { createSensorSchema } from "./sensor.schema";
import { SensorUsecase } from "./sensor.usecase";

export class SensorController {
    private sensorUsecase: SensorUsecase;
    constructor() {
        this.sensorUsecase = new SensorUsecase();
    }

    async create(req: FastifyRequest, reply: FastifyReply) {
        const sensorData = createSensorSchema.parse(req.body);
        const result = await this.sensorUsecase.create(sensorData);
        return reply.code(201).send(result);
    }
}
