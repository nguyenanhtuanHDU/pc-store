// import { AuthModule } from './auth/auth.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
// import { TokenMiddleware } from './token.middleware';
// import { ScheduleModule } from '@nestjs/schedule';
// import { JwtModule } from '@nestjs/jwt';
// import { ThrottlerModule } from '@nestjs/throttler';
// import { WebsocketsModule } from './websockets/websockets.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRoot(process.env.DB_URL),
    JwtModule.register({
      global: true,
      // secret: process.env.JWT_SECRET,
      secret: `${process.env.JWT_SECRET_KEY}`,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    // .apply(TokenMiddleware)
    // .exclude(
    //   { path: 'auth', method: RequestMethod.ALL },
    //   'auth/(.*)',
    // )
    // .forRoutes("*")
  }
}