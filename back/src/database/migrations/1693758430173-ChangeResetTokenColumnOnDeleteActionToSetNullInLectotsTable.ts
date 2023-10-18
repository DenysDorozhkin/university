import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeResetTokenColumnOnDeleteActionToSetNullInLectotsTable1693758430173
  implements MigrationInterface
{
  name =
    'ChangeResetTokenColumnOnDeleteActionToSetNullInLectotsTable1693758430173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lectors" DROP CONSTRAINT "FK_c55e5a8eec68f6df71f3115f0d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lectors" ADD CONSTRAINT "FK_c55e5a8eec68f6df71f3115f0d8" FOREIGN KEY ("reset_token") REFERENCES "reset_tokens"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lectors" DROP CONSTRAINT "FK_c55e5a8eec68f6df71f3115f0d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lectors" ADD CONSTRAINT "FK_c55e5a8eec68f6df71f3115f0d8" FOREIGN KEY ("reset_token") REFERENCES "reset_tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
