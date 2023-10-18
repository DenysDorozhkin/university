import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { CoreEntity } from '../../../application/entities/core.entity';
import { Student } from '../../students/entities/student.entity';
import { Lector } from '../../lectors/entities/lector.entity';
import { Mark } from '../../marks/entities/mark.entity';

@Entity({ name: 'courses' })
export class Course extends CoreEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  hours: number;

  @ManyToMany(() => Student, (student) => student.courses, {
    onDelete: 'SET NULL',
    onUpdate: 'NO ACTION',
  })
  students?: Student[];

  @ManyToMany(() => Lector, (lector) => lector.courses, {
    onDelete: 'SET NULL',
    onUpdate: 'NO ACTION',
  })
  lectors?: Lector[];

  @OneToMany(() => Mark, (mark) => mark.course, { cascade: ['remove'] })
  marks: Mark[];
}
