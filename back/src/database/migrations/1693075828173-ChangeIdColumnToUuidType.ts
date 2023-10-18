import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeIdColumnToUuidType1693075828173
  implements MigrationInterface
{
  name = 'ChangeIdColumnToUuidType1693075828173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lectors" DROP CONSTRAINT "PK_87eda9bf8c85d84a6b18dfc4991"`,
    );
    await queryRunner.query(`ALTER TABLE "lectors" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "lectors" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "lectors" ADD CONSTRAINT "PK_87eda9bf8c85d84a6b18dfc4991" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_b9f6fcd8a397ee5b503191dd7c3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" DROP CONSTRAINT "PK_659d1483316afb28afd3a90646e"`,
    );
    await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "groups" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" ADD CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP CONSTRAINT "FK_decddeaaed256b357c8d2964260"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "PK_7d7f07271ad4ce999880713f05e"`,
    );
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "students" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "group_id"`);
    await queryRunner.query(`ALTER TABLE "students" ADD "group_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP CONSTRAINT "FK_0ee43ae3da1f7093cb1d4645b18"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9"`,
    );
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e"`,
    );
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "marks" DROP CONSTRAINT "PK_051deeb008f7449216d568872c6"`,
    );
    await queryRunner.query(`ALTER TABLE "marks" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "marks" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "marks" ADD CONSTRAINT "PK_051deeb008f7449216d568872c6" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP CONSTRAINT "PK_ab3f4979286e908ef30bd8cb5ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD CONSTRAINT "PK_0ee43ae3da1f7093cb1d4645b18" PRIMARY KEY ("course_id")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_decddeaaed256b357c8d296426"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP COLUMN "student_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD "student_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP CONSTRAINT "PK_0ee43ae3da1f7093cb1d4645b18"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD CONSTRAINT "PK_ab3f4979286e908ef30bd8cb5ee" PRIMARY KEY ("course_id", "student_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP CONSTRAINT "PK_ab3f4979286e908ef30bd8cb5ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD CONSTRAINT "PK_decddeaaed256b357c8d2964260" PRIMARY KEY ("student_id")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0ee43ae3da1f7093cb1d4645b1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP COLUMN "course_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD "course_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP CONSTRAINT "PK_decddeaaed256b357c8d2964260"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD CONSTRAINT "PK_ab3f4979286e908ef30bd8cb5ee" PRIMARY KEY ("student_id", "course_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_decddeaaed256b357c8d296426" ON "student_course" ("student_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0ee43ae3da1f7093cb1d4645b1" ON "student_course" ("course_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_b9f6fcd8a397ee5b503191dd7c3" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD CONSTRAINT "FK_decddeaaed256b357c8d2964260" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD CONSTRAINT "FK_0ee43ae3da1f7093cb1d4645b18" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
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
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP CONSTRAINT "PK_ab3f4979286e908ef30bd8cb5ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD CONSTRAINT "PK_decddeaaed256b357c8d2964260" PRIMARY KEY ("student_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP COLUMN "course_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD "course_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0ee43ae3da1f7093cb1d4645b1" ON "student_course" ("course_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP CONSTRAINT "PK_decddeaaed256b357c8d2964260"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD CONSTRAINT "PK_ab3f4979286e908ef30bd8cb5ee" PRIMARY KEY ("course_id", "student_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP CONSTRAINT "PK_ab3f4979286e908ef30bd8cb5ee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD CONSTRAINT "PK_0ee43ae3da1f7093cb1d4645b18" PRIMARY KEY ("course_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP COLUMN "student_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD "student_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_decddeaaed256b357c8d296426" ON "student_course" ("student_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" DROP CONSTRAINT "PK_0ee43ae3da1f7093cb1d4645b18"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD CONSTRAINT "PK_ab3f4979286e908ef30bd8cb5ee" PRIMARY KEY ("student_id", "course_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "marks" DROP CONSTRAINT "PK_051deeb008f7449216d568872c6"`,
    );
    await queryRunner.query(`ALTER TABLE "marks" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "marks" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "marks" ADD CONSTRAINT "PK_051deeb008f7449216d568872c6" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e"`,
    );
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9"`,
    );
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD CONSTRAINT "FK_0ee43ae3da1f7093cb1d4645b18" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "group_id"`);
    await queryRunner.query(`ALTER TABLE "students" ADD "group_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "PK_7d7f07271ad4ce999880713f05e"`,
    );
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "students" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_course" ADD CONSTRAINT "FK_decddeaaed256b357c8d2964260" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "groups" DROP CONSTRAINT "PK_659d1483316afb28afd3a90646e"`,
    );
    await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "groups" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "groups" ADD CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_b9f6fcd8a397ee5b503191dd7c3" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lectors" DROP CONSTRAINT "PK_87eda9bf8c85d84a6b18dfc4991"`,
    );
    await queryRunner.query(`ALTER TABLE "lectors" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "lectors" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "lectors" ADD CONSTRAINT "PK_87eda9bf8c85d84a6b18dfc4991" PRIMARY KEY ("id")`,
    );
  }
}
