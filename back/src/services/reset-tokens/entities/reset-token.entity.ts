import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../../../application/entities/core.entity';

@Entity({ name: 'reset_tokens' })
export class ResetToken extends CoreEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  token: string;
}
