import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeNameColumnInLectorsTableFromNullableFalseTOTrue1693402766535
  implements MigrationInterface
{
  name = 'ChangeNameColumnInLectorsTableFromNullableFalseTOTrue1693402766535';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lectors" ALTER COLUMN "name" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lectors" ALTER COLUMN "name" SET NOT NULL`,
    );
  }
}
