import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { GroupsModule } from '../services/groups/groups.module';
import { CoursesModule } from '../services/courses/courses.module';
import { StudentsModule } from '../services/students/students.module';
import { CoursesControllerModule } from '../controllers/courses/courses.controller.module';
import { GroupsControllerModule } from '../controllers/groups/groups.controller.module';
import { StudentsControllerModule } from '../controllers/students/students.controller.module';
import { typeOrmAsyncConfig } from '../configs/database/typeorm-config';
import { ConfigModule } from '../configs/config.module';
import { AuthControllerModule } from '../controllers/auth/auth.controller.module';
import { AuthModule } from '../services/auth/auth.module';
import { ResetTokenModule } from '../services/reset-tokens/reset-token.module';
import { LectorsModule } from 'src/services/lectors/lectors.module';
import { LectorsControllerModule } from 'src/controllers/lectors/lectors.controller.module';
import { LectorsManagerModule } from 'src/services/lectors-manager/lectors-manager.module';
import { MarksModule } from 'src/services/marks/marks.module';
import { UsersControllerModule } from 'src/controllers/users/users.controller.module';
import { MarksControllerModule } from 'src/controllers/marks/marks.controller.module';
import { PostsModule } from 'src/services/posts/posts.module';
import { PostsControllerModule } from 'src/controllers/posts/posts.controller.module';
import { MailerModule } from 'src/services/mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule,
    AuthModule,
    AuthControllerModule,
    ResetTokenModule,
    UsersControllerModule,
    GroupsModule,
    GroupsControllerModule,
    CoursesModule,
    CoursesControllerModule,
    StudentsModule,
    StudentsControllerModule,
    LectorsModule,
    LectorsControllerModule,
    LectorsManagerModule,
    MarksModule,
    MarksControllerModule,
    PostsModule,
    PostsControllerModule,
    MailerModule,
  ],
  providers: [AppService],
})
export class AppModule {}
