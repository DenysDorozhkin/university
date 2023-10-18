import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGroupsAndStudentsAndCoursesTables1692124995156
  implements MigrationInterface
{
  name = 'CreateGroupsAndStudentsAndCoursesTables1692124995156';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "groups" (
            "id" SERIAL NOT NULL, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "name" character varying NOT NULL, 
            CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
    await queryRunner.query(`
            CREATE TABLE "courses" (
            "id" SERIAL NOT NULL, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
             "name" character varying NOT NULL, "description" character varying NOT NULL, 
             "hours" numeric NOT NULL,
              CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
    await queryRunner.query(`
            CREATE TABLE "students" (
            "id" SERIAL NOT NULL, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "name" character varying NOT NULL, "surname" character varying NOT NULL, 
            "email" character varying NOT NULL, "age" numeric NOT NULL, 
            "image_path" character varying, 
            "group_id" integer, 
            CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE ("email"), 
            CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))
        `);
    await queryRunner.query(`
            CREATE TABLE "student_course" (
            "student_id" integer NOT NULL, 
            "course_id" integer NOT NULL, 
            CONSTRAINT "PK_ab3f4979286e908ef30bd8cb5ee" 
            PRIMARY KEY ("student_id", "course_id"))
        `);
    await queryRunner.query(
      `CREATE INDEX "IDX_decddeaaed256b357c8d296426" ON "student_course" ("student_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0ee43ae3da1f7093cb1d4645b1" ON "student_course" ("course_id") `,
    );
    await queryRunner.query(`
           ALTER TABLE "students" 
           ADD CONSTRAINT "FK_b9f6fcd8a397ee5b503191dd7c3" 
           FOREIGN KEY ("group_id") REFERENCES "groups"("id") 
           ON DELETE SET NULL ON UPDATE NO ACTION
           `);
    await queryRunner.query(`
            ALTER TABLE "student_course" 
            ADD CONSTRAINT "FK_decddeaaed256b357c8d2964260" 
            FOREIGN KEY ("student_id") REFERENCES "students"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "student_course" 
            ADD CONSTRAINT "FK_0ee43ae3da1f7093cb1d4645b18" 
            FOREIGN KEY ("course_id") 
            REFERENCES "courses"("id") 
            ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP CONSTRAINT "FK_0ee43ae3da1f7093cb1d4645b18"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP CONSTRAINT "FK_decddeaaed256b357c8d2964260"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_b9f6fcd8a397ee5b503191dd7c3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0ee43ae3da1f7093cb1d4645b1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_decddeaaed256b357c8d296426"`,
    );
    await queryRunner.query(`DROP TABLE "student_course"`);
    await queryRunner.query(`DROP TABLE "students"`);
    await queryRunner.query(`DROP TABLE "courses"`);
    await queryRunner.query(`DROP TABLE "groups"`);
  }
}
