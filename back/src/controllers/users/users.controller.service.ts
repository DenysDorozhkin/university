import { Injectable } from '@nestjs/common';
import { LectorsService } from 'src/services/lectors/lectors.service';
import { LectorDto } from '../lectors/dto/crud/lector.response.dto';

@Injectable()
export class UsersControllerService {
  constructor(private readonly lectorsService: LectorsService) {}

  public async getCurrentUser(email: string): Promise<LectorDto> {
    return await this.lectorsService.getLectorByEmailWithoutPassword(email);
  }
}
