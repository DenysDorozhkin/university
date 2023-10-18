import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../../application/entities/core.entity';

@Entity({ name: 'students_avatars' })
export class StudentAvatar extends CoreEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  filename: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  path: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  mimetype: string;
}
