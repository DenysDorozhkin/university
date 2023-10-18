import { ApiProperty } from '@nestjs/swagger';

import { IReturnLector } from 'src/services/lectors/interfaces/crud/return-lector.interface';

export class LectorDto implements IReturnLector {
  @ApiProperty({ description: 'Lector id', nullable: false })
  id: string;

  @ApiProperty({ description: 'Lector created date', nullable: false })
  createdAt: Date;

  @ApiProperty({ description: 'Lector updated date', nullable: false })
  updatedAt: Date;

  @ApiProperty({ description: 'Lector name', nullable: true })
  name: string | null;

  @ApiProperty({ description: 'Lector email', nullable: false })
  email: string;
}
