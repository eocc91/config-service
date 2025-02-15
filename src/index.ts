import express from 'express';
import { ContainerModule } from './modules/infrastructure/container.module';
import { registerModules } from './modules/shared/registers/module.register';
import { MysqlDataSource } from './modules/infrastructure/database/datasource/mysql.datasource';

(async () => {
    try {
        MysqlDataSource.initialize();

        const app = express();
        const PORT = 3000;
            
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        
        registerModules(app, [ContainerModule]);
        // Middleware para parsear JSON
        
        app.listen(PORT, () => {
                console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {

    } 
})();