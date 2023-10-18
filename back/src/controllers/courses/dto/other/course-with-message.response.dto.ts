import { ApiProperty } from '@nestjs/swagger';
import { IReturnCourseWithMessage } from '../../../../services/courses/interfaces/other/return-course-with-message.interface';
import { CourseDto } from '../crud/course.response.dto';

export class CourseWithMessageDto implements IReturnCourseWithMessage {
  @ApiProperty({ description: 'Course entity', nullable: false })
  course: CourseDto;

  @ApiProperty({ description: 'Course update status message', nullable: false })
  message: string;
}
