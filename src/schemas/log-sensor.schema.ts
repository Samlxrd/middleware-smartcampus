import { z } from "zod";

export const createLogSensorSchema = z.object({
    sensor_id: z.number({ message: 'Você deve informar o identificador único do sensor.' })
    .int({ message: 'O identificador do sensor deve ser um número inteiro.' })
    .nonnegative({ message: 'O identificador do sensor deve ser um número positivo.' }),
    presence: z.boolean({ message: 'Deve ser informado se o sensor detectou presença.' }),
    hash: z.string({ message: 'O hash deve ser informado para validar a requisição do sensor.' }),
    timestamp: z.number().int().refine(ts => ts > 0, { message: 'Timestamp inválido.' })
})

export type CreateLogSensorSchema = z.infer<typeof createLogSensorSchema>;