import { FastifyInstance } from "fastify";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { LogSensorController } from "../controllers/log-sensor.controller";
import { ApiError } from "errors";

interface IdParams {
    id: number;
}

export async function logSensorRoutes(app: FastifyInstance) {
    const logSensorController = new LogSensorController();

    app.post('/', {
        preHandler: validateMiddleware,
        handler: async (req, reply) => logSensorController.create(req, reply),
    });
    app.get<{ Params: IdParams }>('/:id', async (req, reply) => {
        if (!req.params.id) { throw new ApiError(400, 'Informe o Id do sensor.')}
        const id = Number(req.params.id);
        return logSensorController.getLogsBySensorId(id, req, reply);
    });
}