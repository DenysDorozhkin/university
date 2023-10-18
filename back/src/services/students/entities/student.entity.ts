import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CoreEntity } from '../../../application/entities/core.entity';
import { Group } from '../../groups/entities/group.entity';
import { Course } from '../../courses/entities/course.entity';
import { Mark } from '../../marks/entities/mark.entity';
import { StudentAvatar } from './student-avatar.entity';

@Entity({ name: 'students' })
export class Student extends CoreEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Index()
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  surname: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'numeric',
    nullable: false,
  })
  age: number;

  @Column({
    type: 'varchar',
    nullable: true,
    name: 'image_path',
  })
  imagePath: string;

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'group_id',
  })
  groupId: string;

  @ManyToOne(() => Group, (group) => group.students, {
    nullable: true,
    eager: false,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @ManyToMany(() => Course, (course) => course.students, {
    onDelete: 'SET NULL',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'student_course',
    joinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'course_id',
      referencedColumnName: 'id',
    },
  })
  courses?: Course[];

  @OneToMany(() => Mark, (mark) => mark.student, { cascade: ['remove'] })
  marks: Mark[];

  @OneToOne(() => StudentAvatar, {
    onDelete: 'SET NULL',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'student_avatar' })
  studentAvatar: StudentAvatar;
}
