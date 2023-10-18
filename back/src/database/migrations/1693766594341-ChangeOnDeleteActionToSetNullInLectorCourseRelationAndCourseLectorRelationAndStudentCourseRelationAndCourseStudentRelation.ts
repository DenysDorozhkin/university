import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeOnDeleteActionToSetNullInLectorCourseRelationAndCourseLectorRelationAndStudentCourseRelationAndCourseStudentRelation1693766594341
  implements MigrationInterface
{
  name =
    'ChangeOnDeleteActionToSetNullInLectorCourseRelationAndCourseLectorRelationAndStudentCourseRelationAndCourseStudentRelation1693766594341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP CONSTRAINT "FK_decddeaaed256b357c8d2964260"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP CONSTRAINT "FK_0ee43ae3da1f7093cb1d4645b18"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lector_course" DROP CONSTRAINT "FK_fa21194644d188132582b0d1a3f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lector_course" DROP CONSTRAINT "FK_67ca379415454fe438719515529"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD CONSTRAINT "FK_decddeaaed256b357c8d2964260" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD CONSTRAINT "FK_0ee43ae3da1f7093cb1d4645b18" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lector_course" ADD CONSTRAINT "FK_fa21194644d188132582b0d1a3f" FOREIGN KEY ("lector_id") REFERENCES "lectors"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lector_course" ADD CONSTRAINT "FK_67ca379415454fe438719515529" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lector_course" DROP CONSTRAINT "FK_67ca379415454fe438719515529"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lector_course" DROP CONSTRAINT "FK_fa21194644d188132582b0d1a3f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP CONSTRAINT "FK_0ee43ae3da1f7093cb1d4645b18"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP CONSTRAINT "FK_decddeaaed256b357c8d2964260"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lector_course" ADD CONSTRAINT "FK_67ca379415454fe438719515529" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lector_course" ADD CONSTRAINT "FK_fa21194644d188132582b0d1a3f" FOREIGN KEY ("lector_id") REFERENCES "lectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD CONSTRAINT "FK_0ee43ae3da1f7093cb1d4645b18" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD CONSTRAINT "FK_decddeaaed256b357c8d2964260" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
