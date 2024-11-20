-- CreateTable
CREATE TABLE "leituraSensor" (
    "id" SERIAL NOT NULL,
    "sensor_id" INTEGER NOT NULL,
    "presence" BOOLEAN NOT NULL DEFAULT false,
    "temperature" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(6) NOT NULL,
    "hash" VARCHAR(255) NOT NULL,

    CONSTRAINT "logsensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sensor" (
    "id" SERIAL NOT NULL,
    "id_sensor" INTEGER NOT NULL,
    "id_sala" INTEGER NOT NULL,

    CONSTRAINT "sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statusSala" (
    "id" SERIAL NOT NULL,
    "sensor_id" INTEGER NOT NULL,
    "presence" BOOLEAN NOT NULL DEFAULT false,
    "temperature" DOUBLE PRECISION NOT NULL,
    "lastPresenceTimestamp" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "automaticMode" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "statusSala_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sensor_id_sensor_key" ON "sensor"("id_sensor");

-- CreateIndex
CREATE UNIQUE INDEX "statusSala_sensor_id_key" ON "statusSala"("sensor_id");

-- AddForeignKey
ALTER TABLE "leituraSensor" ADD CONSTRAINT "logsensor_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "statusSala" ADD CONSTRAINT "statusSala_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
