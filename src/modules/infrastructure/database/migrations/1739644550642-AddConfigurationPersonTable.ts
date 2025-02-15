import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConfigurationPersonTable1739644550642 implements MigrationInterface {
    name = 'AddConfigurationPersonTable1739644550642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`configuration_persons\` (\`id_person\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(100) NOT NULL, \`middle_name\` varchar(100) NOT NULL, \`last_name\` varchar(100) NOT NULL, \`second_last_name\` varchar(100) NOT NULL, PRIMARY KEY (\`id_person\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`configuration_persons\``);
    }

}
