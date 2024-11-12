import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',           // 데이터베이스 유형
      host: 'localhost',          // 데이터베이스 호스트
      port: 5432,                 // 데이터베이스 포트
      username: 'postgres',         // PostgreSQL 사용자 이름
      password: '',     // 사용자 비밀번호
      database: 'postgres',     // 데이터베이스 이름
      autoLoadEntities: true,     // 엔티티를 자동으로 로드
      synchronize: true,          // 엔티티 변경 시 자동으로 DB를 업데이트 (개발 중에만 사용)
    }),
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
