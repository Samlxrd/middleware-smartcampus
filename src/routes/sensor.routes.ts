import { FastifyInstance } from "fastify";
import { SensorController } from "../controllers/sensor.controller";

export async function sensorRoutes(app: FastifyInstance) {
    const sensorController = new SensorController();

    app.post('/', async (req, reply) => sensorController.create(req, reply));
}