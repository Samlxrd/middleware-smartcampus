import { z } from "zod";

export const statusSalaSchema = z.object({
    sensor_id: z.number({ message: 'Você deve informar o identificador único do sensor.' })
    .int({ message: 'O identificador do sensor deve ser um número inteiro.' })
    .nonnegative({ message: 'O identificador do sensor deve ser um número positivo.' }),
    presence: z.boolean({ message: 'Deve ser informado se o sensor detectou presença.' }),
    temperature: z.number({ message: 'A temperatura deve ser informada.' }),
    lastPresenceTimestamp: z.number().int().refine(ts => ts > 0, { message: 'Timestamp inválido.' }).nullable()
})

export type StatusSalaSchema = z.infer<typeof statusSalaSchema>;