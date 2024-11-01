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