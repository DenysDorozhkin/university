import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../../application/entities/core.entity';
import { Lector } from '../../lectors/entities/lector.entity';
import { Student } from '../../students/entities/student.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity({ name: 'marks' })
export class Mark extends CoreEntity {
  @Column({
    type: 'numeric',
    nullable: false,
  })
  mark: number;

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'lector_id',
  })
  lectorId: string;

  @ManyToOne(() => Lector, (lector) => lector.marks, {
    nullable: true,
    eager: false,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'lector_id' })
  lector: Lector;

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'student_id',
  })
  studentId: string;

  @ManyToOne(() => Student, (student) => student.marks, {
    nullable: true,
    eager: false,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Column({
    type: 'uuid',
    nullable: true,
    name: 'course_id',
  })
  courseId: string;

  @ManyToOne(() => Course, (course) => course.marks, {
    nullable: true,
    eager: false,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
