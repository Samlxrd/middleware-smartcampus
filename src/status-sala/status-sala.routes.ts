import { FastifyInstance } from "fastify";
import { StatusSalaController } from "./status-sala.controller";
import { ApiError } from "errors";

interface IdParams {
    room_id: number;
}

export async function statusSalaRoutes(app: FastifyInstance) {
    const statusSalaController = new StatusSalaController();

    app.patch<{ Params: IdParams}>('/:room_id/mode', async (req, reply) => {
        if (!req.params.room_id) { throw new ApiError(400, 'Informe o Id da sala.')}
        const room_id = Number(req.params.room_id);
        return statusSalaController.updateAutomaticMode(room_id, req, reply);
    });
}