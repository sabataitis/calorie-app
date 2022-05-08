import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from "@nestjs/mongoose";
import { ProductModule } from "./product/product.module";
import { EnteredProductModule } from "./entered-product/entered-product.module";

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/calorie-app'),
    AuthModule,
    UserModule,
    ProductModule,
    EnteredProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
