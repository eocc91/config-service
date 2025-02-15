const { execSync } = require("child_process");

const migrationName = process.argv[2]; // Toma el primer argumento después del comando
if (!migrationName) {
  console.error("❌ Error: Debes proporcionar un nombre para la migración.");
  console.error("Ejemplo: node generate-migration.js AddConfigurationUserTable");
  process.exit(1);
}

const command = `ts-node -r tsconfig-paths/register node_modules/typeorm/cli.js migration:generate -d src/modules/infrastructure/database/datasource/mysql.datasource.ts src/modules/infrastructure/database/migrations/${migrationName}`;

try {
  console.log(`⚙️  Generando migración: ${migrationName}`);
  execSync(command, { stdio: "inherit" }); // Ejecuta el comando y hereda la salida en la terminal
  console.log("✅ Migración generada exitosamente.");
} catch (error) {
  console.error("❌ Error al generar la migración:", error.message);
  process.exit(1);
}
