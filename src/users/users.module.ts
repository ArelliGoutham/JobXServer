import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserProvider } from './services/create-user.provider';
import { FindUserProvider } from './services/find-user.provider';

@Module({
  controllers: [UsersController],
  providers: [UserService, CreateUserProvider, FindUserProvider],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  exports: [UserService],
})
export class UsersModule {}
