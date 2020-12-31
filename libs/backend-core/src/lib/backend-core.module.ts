import { Module, CacheModule } from '@nestjs/common';
import { BilibiliController } from './controllers/bilibili.controller';
import * as redisStore from 'cache-manager-redis';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { environment } from './environment';
import { AcfunController } from './controllers/acfun.controller';
import { BilibiliUserService } from './services/bili-user.service';

function configure() {
  return [
    CacheModule.registerAsync({
      useFactory: () => {
        // if (process.env.COMEN_REDIS_HOST) {
        //   return {
        //     store: redisStore,
        //     host: '',
        //     port: '',
        //     auth_pass: '',
        //     db: 0
        //   }
        // }
        // return {
        //   store: 'memory'
        // };
        return {
          store: redisStore,
          host: '127.0.0.1',
          port: 6379,
          db: 0
        }
      }
    }),
    environment.flags.static_file ?
      ServeStaticModule.forRoot({
        rootPath: join(process.cwd(), 'dist/apps/core')
      }) : undefined
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
