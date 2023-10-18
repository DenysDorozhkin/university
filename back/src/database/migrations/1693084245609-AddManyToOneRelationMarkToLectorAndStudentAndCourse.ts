import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddManyToOneRelationMarkToLectorAndStudentAndCourse1693084245609
  implements MigrationInterface
{
  name = 'AddManyToOneRelationMarkToLectorAndStudentAndCourse1693084245609';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "marks" ADD "lector_id" uuid`);
    await queryRunner.query(`ALTER TABLE "marks" ADD "student_id" uuid`);
    await queryRunner.query(`ALTER TABLE "marks" ADD "course_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "marks" ADD CONSTRAINT "FK_69b5af3347a46bb74ccc3c6f65c" FOREIGN KEY ("lector_id") REFERENCES "lectors"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "marks" ADD CONSTRAINT "FK_5226e1592e6291dbe7a07640346" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "marks" ADD CONSTRAINT "FK_3e39a10631f1c639777a2b99cb8" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "marks" DROP CONSTRAINT "FK_3e39a10631f1c639777a2b99cb8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marks" DROP CONSTRAINT "FK_5226e1592e6291dbe7a07640346"`,
    );
    await queryRunner.query(
      `ALTER TABLE "marks" DROP CONSTRAINT "FK_69b5af3347a46bb74ccc3c6f65c"`,
    );
    await queryRunner.query(`ALTER TABLE "marks" DROP COLUMN "course_id"`);
    await queryRunner.query(`ALTER TABLE "marks" DROP COLUMN "student_id"`);
    await queryRunner.query(`ALTER TABLE "marks" DROP COLUMN "lector_id"`);
  }
}
