import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteNameFromConfigurationUser1739996707553 implements MigrationInterface {
    name = 'DeleteNameFromConfigurationUser1739996707553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_7d8888ca912f012b061b02f3a8\` ON \`configuration_users\``);
        await queryRunner.query(`ALTER TABLE \`configuration_users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`configuration_users\` DROP FOREIGN KEY \`FK_7d8888ca912f012b061b02f3a8a\``);
        await queryRunner.query(`ALTER TABLE \`configuration_users\` CHANGE \`id_person\` \`id_person\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`configuration_users\` ADD CONSTRAINT \`FK_7d8888ca912f012b061b02f3a8a\` FOREIGN KEY (\`id_person\`) REFERENCES \`configuration_persons\`(\`id_person\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`configuration_users\` DROP FOREIGN KEY \`FK_7d8888ca912f012b061b02f3a8a\``);
        await queryRunner.query(`ALTER TABLE \`configuration_users\` CHANGE \`id_person\` \`id_person\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`configuration_users\` ADD CONSTRAINT \`FK_7d8888ca912f012b061b02f3a8a\` FOREIGN KEY (\`id_person\`) REFERENCES \`configuration_persons\`(\`id_person\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`configuration_users\` ADD \`name\` varchar(100) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_7d8888ca912f012b061b02f3a8\` ON \`configuration_users\` (\`id_person\`)`);
    }

}
