import { prisma } from "database/prisma-client";
import { StatusSala, StatusSalaRepository } from "status-sala/status-sala.interface";
import { StatusSalaSchema, UpdateAutomaticModeSchema } from "status-sala/status-sala.schema";

export class StatusSalaRepositoryPrisma implements StatusSalaRepository {
    async create(data: StatusSalaSchema): Promise<StatusSala> {
        const result = await prisma.statusSala.create({
            data: {
                sensor_id: data.sensor_id,
                presence: data.presence,
                temperature: data.temperature,
                automaticMode: true,
                lastPresenceTimestamp: data.lastPresenceTimestamp ? new Date(data.lastPresenceTimestamp) : new Date()
            }
        })
        return {
            ...result,
            lastPresenceTimestamp: result.lastPresenceTimestamp.getTime()
        };
    }

    async getBySensorId(sensor_id: number): Promise<StatusSala | null> {
        const result = await prisma.statusSala.findFirst({
            where: {
                sensor_id: sensor_id
            }
        })

        if (result) {
            return {
                ...result,
                lastPresenceTimestamp: result.lastPresenceTimestamp.getTime()
            };
        }

        return null;
    }

    async update(data: StatusSalaSchema): Promise<StatusSala> {
        const result = await prisma.statusSala.update({
            where: {
                sensor_id: data.sensor_id
            },
            data: {
                presence: data.presence,
                temperature: data.temperature,
                lastPresenceTimestamp: data.lastPresenceTimestamp ? new Date(data.lastPresenceTimestamp) : new Date()
            }
        });

        return {
            ...result,
            lastPresenceTimestamp: result.lastPresenceTimestamp.getTime()
        };
    }

    async updateAutomaticMode(sensor_id: number, data: UpdateAutomaticModeSchema): Promise<StatusSala> {
        const result = await prisma.statusSala.update({
            where: {
                sensor_id: sensor_id
            },
            data: {
                automaticMode: data.automaticMode
            }
        });

        return {
            ...result,
            lastPresenceTimestamp: result.lastPresenceTimestamp.getTime()
        };
    }
}