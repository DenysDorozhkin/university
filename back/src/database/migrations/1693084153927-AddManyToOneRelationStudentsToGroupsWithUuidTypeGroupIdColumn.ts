import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddManyToOneRelationStudentsToGroupsWithUuidTypeGroupIdColumn1693084153927
  implements MigrationInterface
{
  name =
    'AddManyToOneRelationStudentsToGroupsWithUuidTypeGroupIdColumn1693084153927';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "students" ADD "group_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "students" ADD CONSTRAINT "FK_b9f6fcd8a397ee5b503191dd7c3" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "students" DROP CONSTRAINT "FK_b9f6fcd8a397ee5b503191dd7c3"`,
    );
    await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "group_id"`);
  }
}
