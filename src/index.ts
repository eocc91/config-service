import "reflect-metadata";
import express from "express";
import cors from "cors";
import { registerModules } from "./modules/shared/registers/module.register";
import {  initializeDataSource, MysqlDataSource } from "@infrastructure/database/datasource/mysql.datasource";
import { ContainerModule } from "@infrastructure/containers/container.module";

(async () => {
  try {

    await initializeDataSource();

    const app = express();
    const PORT = 3000;

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Registra los módulos después de inicializar el AppDataSource
    registerModules(app, [ContainerModule]);

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al inicializar AppDataSource:", error);
    process.exit(1); // Salir del proceso en caso de error crítico
  }
})();
