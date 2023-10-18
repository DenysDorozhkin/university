import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMarksTable1693074654813 implements MigrationInterface {
  name = 'CreateMarksTable1693074654813';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "marks" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "mark" numeric NOT NULL, CONSTRAINT "PK_051deeb008f7449216d568872c6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "marks"`);
  }
}
