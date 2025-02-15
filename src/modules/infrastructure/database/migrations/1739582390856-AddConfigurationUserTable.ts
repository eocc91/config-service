import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConfigurationUserTable1739582390856 implements MigrationInterface {
    name = 'AddConfigurationUserTable1739582390856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`configuration_users\` (\`id_user\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`username\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(50) NOT NULL, \`status\` tinyint NOT NULL, \`creation_date\` datetime NOT NULL, \`last_access\` datetime NOT NULL, \`token\` varchar(50) NOT NULL, \`validation_pin\` varchar(6) NOT NULL, PRIMARY KEY (\`id_user\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`configuration_users\``);
    }

}
