import { FastifyInstance } from "fastify";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { LeituraSensorController } from "./leitura-sensor.controller";
import { ApiError } from "errors";

interface IdParams {
    id: number;
}

export async function LeituraSensorRoutes(app: FastifyInstance) {
    const leituraSensorController = new LeituraSensorController();

    app.post('/', {
        preHandler: validateMiddleware,
        handler: async (req, reply) => leituraSensorController.create(req, reply),
    });
    app.get<{ Params: IdParams }>('/:id', async (req, reply) => {
        if (!req.params.id) { throw new ApiError(400, 'Informe o Id do sensor.')}
        const id = Number(req.params.id);
        return leituraSensorController.getLeiturasBySensorId(id, req, reply);
    });
}