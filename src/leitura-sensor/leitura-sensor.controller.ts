import { FastifyReply, FastifyRequest } from "fastify";
import { LeituraSensorUsecase } from "./leitura-sensor.usecase";
import { sensorDataSchema, turnOffSchema } from "../sensor/sensor.schema";

export class LeituraSensorController {
    private leituraSensorUsecase: LeituraSensorUsecase;
    constructor() {
        this.leituraSensorUsecase = new LeituraSensorUsecase();
    }

    async create(req: FastifyRequest, reply: FastifyReply) {
        const leituraData = sensorDataSchema.parse(req.body);
        const result = await this.leituraSensorUsecase.create(leituraData);
        return reply.code(201).send(result);
    }

    async getLeiturasBySensorId(id: number, req: FastifyRequest, reply: FastifyReply) {
        const result = await this.leituraSensorUsecase.getLeiturasBySensorId(id);
        return reply.send(result);
    }
    async turnOffByAdm(id: number, req: FastifyRequest, reply: FastifyReply) {
        const turnOffData = turnOffSchema.parse(req.body);
        const result = await this.leituraSensorUsecase.turnOffByAdm(id, turnOffData);
        return reply.send(result);
    }
}