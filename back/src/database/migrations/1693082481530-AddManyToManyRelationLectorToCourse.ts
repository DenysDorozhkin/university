import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddManyToManyRelationLectorToCourse1693082481530
  implements MigrationInterface
{
  name = 'AddManyToManyRelationLectorToCourse1693082481530';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lector_course" ("lector_id" uuid NOT NULL, "course_id" uuid NOT NULL, CONSTRAINT "PK_79cf0f064235769277ce94c75f7" PRIMARY KEY ("lector_id", "course_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fa21194644d188132582b0d1a3" ON "lector_course" ("lector_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_67ca379415454fe43871951552" ON "lector_course" ("course_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "lector_course" ADD CONSTRAINT "FK_fa21194644d188132582b0d1a3f" FOREIGN KEY ("lector_id") REFERENCES "lectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lector_course" ADD CONSTRAINT "FK_67ca379415454fe438719515529" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `DROP INDEX "public"."IDX_67ca379415454fe43871951552"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fa21194644d188132582b0d1a3"`,
    );
    await queryRunner.query(`DROP TABLE "lector_course"`);
  }
}
