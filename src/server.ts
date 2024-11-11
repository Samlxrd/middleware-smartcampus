import fastify, { FastifyInstance } from "fastify";
import { ApiError } from "./errors";
import { z } from "zod";
import { sensorRoutes } from "./sensor/sensor.routes";
import { logSensorRoutes } from "./leitura-sensor/leitura-sensor.routes";

const app: FastifyInstance = fastify();

app.register(sensorRoutes, { prefix: '/sensor' });
app.register(logSensorRoutes, { prefix: '/leitura' });

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ApiError) {
        reply
        .status(error.statusCode)
        .send({ message: error.message })
    } 
    else if (error instanceof z.ZodError) {
        reply
        .status(400)
        .send({ message: error.errors[0].message })
    }
    else {
        reply
        .status(500)
        .send({ message: 'Erro interno no servidor.' })
    }
})

app.listen({ port: 5050}, () => {
    console.log('[🚀] http://localhost:5050/')
})