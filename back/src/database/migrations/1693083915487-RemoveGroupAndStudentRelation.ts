import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveGroupAndStudentRelation1693083915487
  implements MigrationInterface
{
  name = 'RemoveGroupAndStudentRelation1693083915487';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_b9f6fcd8a397ee5b503191dd7c3"`,
    );
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "group_id"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "students" ADD "group_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_b9f6fcd8a397ee5b503191dd7c3" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
