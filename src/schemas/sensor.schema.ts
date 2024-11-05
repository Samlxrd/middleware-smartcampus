import { z } from "zod";

export const createSensorSchema = z.object({
    id_sensor: z.number({ message: 'Você deve informar o identificador único do sensor.' })
    .int({ message: 'O identificador do sensor deve ser um número inteiro.' })
    .nonnegative({ message: 'O identificador do sensor deve ser um número positivo.' }),
    id_sala: z.number({ message: 'Você deve informar o identificador único da sala.' })
    .int({ message: 'O identificador da sala deve ser um número inteiro.' })
    .nonnegative({ message: 'O identificador da sala deve ser um número positivo.' })
})

export type CreateSensorSchema = z.infer<typeof createSensorSchema>;

export const sensorDataSchema = z.object({
    sensor_id: z.number({ message: 'Você deve informar o id do sensor.'}).int(),
    presence: z.boolean(),
    timestamp: z.number().int().refine(ts => ts > 0, { message: 'Timestamp inválido.' }),
    hash: z.string({ message: 'Você deve informar o hash para validar a requisição.' })
})

export type SensorDataSchema = z.infer<typeof sensorDataSchema>;