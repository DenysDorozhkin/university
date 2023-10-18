import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStudentsAvatarsTable1694381648811
  implements MigrationInterface
{
  name = 'CreateStudentsAvatarsTable1694381648811';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "students_avatars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "filename" character varying NOT NULL, "path" character varying NOT NULL, "mimetype" character varying NOT NULL, CONSTRAINT "UQ_ac4e45b55201edb979c7d491bfc" UNIQUE ("path"), CONSTRAINT "PK_ad7de290d10c73dad1165b1007c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "students_avatars"`);
  }
}
