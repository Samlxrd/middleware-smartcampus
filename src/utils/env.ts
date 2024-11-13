import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    REQUEST_SECRET_KEY: z.string()
})

export function validateEnv() {
    const parsedEnv = envSchema.safeParse(process.env);
    if (!parsedEnv.success) {
        console.error('Erro ao validar variáveis de ambiente', parsedEnv.error.format());
        process.exit(1);
    }
    return parsedEnv.data;
}

export const env = validateEnv();