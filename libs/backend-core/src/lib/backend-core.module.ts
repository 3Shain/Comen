import { Module, CacheModule } from '@nestjs/common';
import { BilibiliController } from './controllers/bilibili.controller';
import * as redisStore from 'cache-manager-redis';
import * as fsStore from 'cache-manager-fs';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AcfunController } from './controllers/acfun.controller';
import { BilibiliUserService } from './services/bili-user.service';

function configure() {
  return [
    CacheModule.registerAsync({
      useFactory: () => {
        if (process.env.REDIS_HOST) {
          return {
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT ?? "6379"),
            auth_pass: process.env.REDIS_AUTH,
            db: parseInt(process.env.REDIS_DB ?? "0")
          }
        }
        return {
          store: fsStore,
          maxsize: 1000 * 1000 * 1000, // 1Gib,
          path: "tmp",
          preventfill: true
        };
      }
    }),
    process.env.DISABLE_FRONTEND ?
      undefined : ServeStaticModule.forRoot({
        rootPath: join(process.cwd(), 'dist/apps/core')
      }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'dist/apps/core/assets/css4obs'),
      serveRoot: '/css4obs'
    })
  ].filter(Boolean);
}

@Module({
  imports: configure(),
  controllers: [AcfunController, BilibiliController],
  providers: [
    BilibiliUserService
  ],
})
export class BackendCoreModule { }
