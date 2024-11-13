import { FastifyReply, FastifyRequest } from "fastify";
import { StatusSalaUsecase } from "./status-sala.usecase";
import { updateAutomaticModeSchema } from "./status-sala.schema";

export class StatusSalaController {
    private statusSalaUsecase: StatusSalaUsecase;

    constructor() {
        this.statusSalaUsecase = new StatusSalaUsecase();
    }

    async updateAutomaticMode(room_id: number, req: FastifyRequest, reply: FastifyReply) {
        const updateData = updateAutomaticModeSchema.parse(req.body);
        const result = await this.statusSalaUsecase.updateAutomaticMode(room_id, updateData);
        return reply.send(result);
    }
}