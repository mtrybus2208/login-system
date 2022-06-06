import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DatabaseModule,
    UserModule,
    CoreModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
