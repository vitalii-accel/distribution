import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config';

console.log();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    // useFactory: (configService: ConfigService) => {
    //   return {
    //     type: 'mysql',
    //     host: configService.get('mysqlHost'),
    //     port: configService.get('mysqlPort'),
    //     username: configService.get('mysqlUsername'),
    //     password: configService.get('mysqlPassword'),
    //     database: configService.get('mysqlDatabase'),
    //     entities: [],
    //     autoLoadEntities: true,
    //     synchronize: true,
    //   };
    // },
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    console.log(configService.get('mysqlHost'));
    console.log(configService.get('mysqlPort'));
    console.log(configService.get('mysqlUsername'));
    console.log(configService.get('mysqlPassword'));
    console.log(configService.get('mysqlDatabase'));
  }
}
