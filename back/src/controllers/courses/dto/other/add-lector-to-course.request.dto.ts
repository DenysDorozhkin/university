import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IAddLectorToCourse } from 'src/services/courses/interfaces/other/add-lector-to-course.interface';

export class AddLectorToCourseDto implements IAddLectorToCourse {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'Lector id', nullable: false })
  lectorId: string;
}
