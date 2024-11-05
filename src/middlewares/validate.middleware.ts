import { FastifyReply, FastifyRequest } from "fastify";
import crypto from 'crypto';
import { sensorDataSchema } from "schemas/sensor.schema";
import { env } from "utils/env";

export function validateMiddleware(req: FastifyRequest, reply: FastifyReply, done: Function) {
    const data = sensorDataSchema.safeParse(req.body);

    if(!data.success) {
        reply.status(400).send({ error: 'Dados inválidos', details: data.error.errors });
        return;
    }

    const { sensor_id, presence, timestamp, hash } = data.data;

    const requestTimestamp = Math.floor(timestamp / 1000);
    const currentTimestamp = Math.floor(Date.now() / 1000); 

    if (Math.abs(currentTimestamp - requestTimestamp) > 60) {
        reply.status(401).send({ message: 'Timestamp inválido ou expirado.' });
        return;
    }

    const mensagem = `${sensor_id}${presence}${timestamp}`;
    const hmac = crypto.createHmac('sha256', env.REQUEST_SECRET_KEY).update(mensagem).digest('hex');

    if (hmac !== hash) {
        reply.status(401).send({ message: 'Hash inválido.' });
        return;
    }

    console.log('Requisição validada com sucesso.');

    done();
}