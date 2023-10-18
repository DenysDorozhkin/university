import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import crypto from 'crypto';
import { IResetToken } from './interfaces/reset-token.interface';
import { ResetToken } from './entities/reset-token.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Lector } from '../lectors/entities/lector.entity';
import { LectorsService } from '../lectors/lectors.service';

@Injectable()
export class ResetTokenService {
  private logger: Logger;
  constructor(
    @InjectRepository(ResetToken)
    private readonly resetTokensRepository: Repository<ResetToken>,
    private readonly lectorsService: LectorsService,
  ) {
    this.logger = new Logger(ResetTokenService.name);
  }

  public async generateResetToken(user: Lector): Promise<IResetToken> {
    if (user.resetToken)
      throw new BadRequestException('This user already has reset token');

    const token = crypto.randomBytes(32).toString('hex');

    const newToken = this.resetTokensRepository.create({
      token,
    });

    await this.resetTokensRepository.save(newToken);

    await this.lectorsService.updateLectorResetToken(user.id, newToken);

    return { token };
  }

  public async getResetTokenById(id: string): Promise<IResetToken> {
    const token = await this.resetTokensRepository.findOne({
      where: { id },
    });
    if (!token) throw new NotFoundException('Token with this id not found');

    return token;
  }

  public async removeResetToken(id: string): Promise<IResetToken> {
    const token = await this.getResetTokenById(id);

    await this.resetTokensRepository.delete(id);

    return token;
  }
}
