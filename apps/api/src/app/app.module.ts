import { Module, CacheModule, Post } from '@nestjs/common';

import { BilibiliController } from './bilibili.controller';
import * as redisStore from 'cache-manager-redis-store';
import { environment } from '../environments/environment.prod';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: () => {
        if (process.env.COMEN_REDIS_HOST) {
          return {
            store: redisStore,
            host: '',
            port: '',
            auth_pass: '',
            db: 0
          }
        }
        return {
          store: 'memory'
        };
      }
    }),
    environment.production ?
      ServeStaticModule.forRoot({
        rootPath: join(process.cwd(), 'dist/apps/core')
      }) : undefined
  ],
  controllers: [BilibiliController],
  providers: [],
})
export class AppModule { }
