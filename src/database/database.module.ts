import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log({
          ENV: configService.get<string>('env'),
        });
        return {
          type: 'postgres' as const,
          host: configService.get<string>('database.host', 'localhost'),
          port: configService.get<number>('database.port', 5432),
          username: configService.get('database.username', 'postgres'),
          password: configService.get('database.password', 'postgres'),
          database: configService.get('database.database', 'db'),
          synchronize: true, // !!nedd to be changed
          autoLoadEntities: true,
          ...(configService.get<string>('env') !== 'development' && {
            ssl: { rejectUnauthorized: false },
          }),
        } as TypeOrmModuleOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
