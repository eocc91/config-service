import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const MysqlDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false, // Solo para desarrollo. ¡Cuidado en producción!
    logging: true,     // Registra las consultas (opcional)
    entities: ["src/modules/**/*.entity.ts"], // Ruta de las entidades
    migrations: ['src/modules/infrastructure/database/migrations/*.ts'],    // Ruta de las migraciones
    subscribers: ["/subscribers/*.{ts,js}"],  // Ruta de los suscriptores (opcional)
});