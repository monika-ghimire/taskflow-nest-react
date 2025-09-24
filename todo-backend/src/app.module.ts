import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

//find all user
// add user
//delete user

// todos  based  on user id
// add todo
//find all todos 
//fina not pending 
// find competed 
//delete based on todo id 
//mark todo  based on todo id 



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.local.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: Number(configService.get<string>('DATABASE_PORT')), // cast to number
        username: configService.get<string>('DATABASE_USER'),
        password: String(configService.get<string>('DATABASE_PASSWORD')), // ensure string
        database: configService.get<string>('DATABASE_NAME'),
       
         synchronize: process.env.DATABASE_SYNC === 'true',
  
        logging: process.env.DATABASE_LOGGING === 'true',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    UserModule,
    TodoModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
