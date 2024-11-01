import { FastifyInstance } from "fastify";
// import { validateMiddleware } from "../middlewares/validate.middleware";
import { LogSensorController } from "../controllers/log-sensor.controller";

export async function logSensorRoutes(app: FastifyInstance) {
    const logSensorController = new LogSensorController();

    // app.addHook('preHandler', validateMiddleware);
    app.post('/', async (req, reply) => logSensorController.create(req, reply));
}