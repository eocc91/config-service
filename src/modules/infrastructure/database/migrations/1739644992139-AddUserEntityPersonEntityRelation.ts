import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserEntityPersonEntityRelation1739644992139 implements MigrationInterface {
    name = 'AddUserEntityPersonEntityRelation1739644992139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`configuration_users\` ADD \`id_person\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`configuration_users\` ADD UNIQUE INDEX \`IDX_7d8888ca912f012b061b02f3a8\` (\`id_person\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_7d8888ca912f012b061b02f3a8\` ON \`configuration_users\` (\`id_person\`)`);
        await queryRunner.query(`ALTER TABLE \`configuration_users\` ADD CONSTRAINT \`FK_7d8888ca912f012b061b02f3a8a\` FOREIGN KEY (\`id_person\`) REFERENCES \`configuration_persons\`(\`id_person\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`configuration_users\` DROP FOREIGN KEY \`FK_7d8888ca912f012b061b02f3a8a\``);
        await queryRunner.query(`DROP INDEX \`REL_7d8888ca912f012b061b02f3a8\` ON \`configuration_users\``);
        await queryRunner.query(`ALTER TABLE \`configuration_users\` DROP INDEX \`IDX_7d8888ca912f012b061b02f3a8\``);
        await queryRunner.query(`ALTER TABLE \`configuration_users\` DROP COLUMN \`id_person\``);
    }

}
