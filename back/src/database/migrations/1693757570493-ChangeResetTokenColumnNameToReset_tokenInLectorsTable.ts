import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeResetTokenColumnNameToResetTokenInLectorsTable1693757570493
  implements MigrationInterface
{
  name = 'ChangeResetTokenColumnNameToResetTokenInLectorsTable1693757570493';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lectors" DROP CONSTRAINT "FK_d7ddb6a8416ce734535917cf24e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lectors" RENAME COLUMN "resetTokenId" TO "reset_token"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lectors" RENAME CONSTRAINT "UQ_d7ddb6a8416ce734535917cf24e" TO "UQ_c55e5a8eec68f6df71f3115f0d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lectors" ADD CONSTRAINT "FK_c55e5a8eec68f6df71f3115f0d8" FOREIGN KEY ("reset_token") REFERENCES "reset_tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lectors" DROP CONSTRAINT "FK_c55e5a8eec68f6df71f3115f0d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lectors" RENAME CONSTRAINT "UQ_c55e5a8eec68f6df71f3115f0d8" TO "UQ_d7ddb6a8416ce734535917cf24e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lectors" RENAME COLUMN "reset_token" TO "resetTokenId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lectors" ADD CONSTRAINT "FK_d7ddb6a8416ce734535917cf24e" FOREIGN KEY ("resetTokenId") REFERENCES "reset_tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
