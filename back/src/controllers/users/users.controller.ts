import {
  Controller,
  Get,
  HttpStatus,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersControllerService } from './users.controller.service';
import { CurrentUser } from '../../services/auth/decorators/current-user.decorator';
import { AuthGuard } from '../../services/auth/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LectorDto } from '../lectors/dto/crud/lector.response.dto';
import { ICurrentUser } from 'src/services/auth/interfaces/current-user.interface';

@ApiTags('Users')
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersControllerService: UsersControllerService,
  ) {}

  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Current user',
    type: LectorDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized exception',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong...',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @Get('me')
  public async getCurrentUser(
    @CurrentUser() user: ICurrentUser,
  ): Promise<LectorDto> {
    if (!user || !user.userEmail) {
      throw new UnauthorizedException(Object.keys(user));
    }
    return await this.usersControllerService.getCurrentUser(user.userEmail);
  }
}
