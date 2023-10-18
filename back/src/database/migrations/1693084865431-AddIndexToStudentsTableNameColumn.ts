import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexToStudentsTableNameColumn1693084865431
  implements MigrationInterface
{
  name = 'AddIndexToStudentsTableNameColumn1693084865431';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_b5e856b621a7b64cdf48059067" ON "students" ("name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b5e856b621a7b64cdf48059067"`,
    );
  }
}
