import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOneToOneRelationStudentToStudentAvatar1694381962887
  implements MigrationInterface
{
  name = 'AddOneToOneRelationStudentToStudentAvatar1694381962887';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "students" ADD "student_avatar" uuid`);
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "UQ_736f4c08b5024aa456fca913e80" UNIQUE ("student_avatar")`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_736f4c08b5024aa456fca913e80" FOREIGN KEY ("student_avatar") REFERENCES "students_avatars"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_736f4c08b5024aa456fca913e80"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "UQ_736f4c08b5024aa456fca913e80"`,
    );
    await queryRunner.query(
      `ALTER TABLE "students" DROP COLUMN "student_avatar"`,
    );
  }
}
