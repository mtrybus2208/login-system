import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres' as const,
        host: configService.get<string>('database.host', 'localhost'),
        port: configService.get<number>('database.port', 5432),
        username: configService.get<string>('database.username', 'postgres'),
        password: configService.get<string>('database.password', 'postgres'),
        database: configService.get<string>('database.database', 'db'),
        synchronize: false,
        entities: ['src/**/**.entity{.ts,.js}'],
        autoLoadEntities: true,
        migrations: ['src/migrations/*.ts'],
        ...(configService.get<string>('env') !== 'development' && {
          ssl: { rejectUnauthorized: false },
        }),
      }),
    }),
  ],
})
export class DatabaseModule {}
