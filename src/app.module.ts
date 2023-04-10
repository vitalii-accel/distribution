import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config';
import { DistributionModule } from './distribution/distribution.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: '44.211.175.32',
          port: 3306,
          username: 'root',
          password: 'u9P@zL4&yS6xRt',
          database: 'distribution',
          entities: [],
          autoLoadEntities: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    AccountsModule,
    AuthModule,
    DistributionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
