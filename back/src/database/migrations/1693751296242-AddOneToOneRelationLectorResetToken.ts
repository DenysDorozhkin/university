import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOneToOneRelationLectorResetToken1693751296242
  implements MigrationInterface
{
  name = 'AddOneToOneRelationLectorResetToken1693751296242';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lectors" ADD "resetTokenId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "lectors" ADD CONSTRAINT "UQ_d7ddb6a8416ce734535917cf24e" UNIQUE ("resetTokenId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "lectors" ADD CONSTRAINT "FK_d7ddb6a8416ce734535917cf24e" FOREIGN KEY ("resetTokenId") REFERENCES "reset_tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lectors" DROP CONSTRAINT "FK_d7ddb6a8416ce734535917cf24e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lectors" DROP CONSTRAINT "UQ_d7ddb6a8416ce734535917cf24e"`,
    );
    await queryRunner.query(`ALTER TABLE "lectors" DROP COLUMN "resetTokenId"`);
  }
}
