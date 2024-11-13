import fastify, { FastifyInstance } from "fastify";
import { ApiError } from "./errors";
import { z } from "zod";
import { sensorRoutes } from "./sensor/sensor.routes";
import { LeituraSensorRoutes } from "./leitura-sensor/leitura-sensor.routes";
import { statusSalaRoutes } from "status-sala/status-sala.routes";

const app: FastifyInstance = fastify();

app.register(sensorRoutes, { prefix: '/sensor' });
app.register(LeituraSensorRoutes, { prefix: '/leitura' });
app.register(statusSalaRoutes, { prefix: '/status' });

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