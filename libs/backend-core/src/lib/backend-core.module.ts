import { Module, CacheModule } from '@nestjs/common';
import { BilibiliController } from './controllers/bilibili.controller';
import * as redisStore from 'cache-manager-redis-store';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { environment } from './environment';
import { AcfunController } from './controllers/acfun.controller';

function configure() {
  return [
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
    environment.flags.static_file ?
      ServeStaticModule.forRoot({
        rootPath: join(process.cwd(), 'dist/apps/core')
      }) : undefined
  ].filter(Boolean);
}

@Module({
  imports: configure(),
  controllers: [AcfunController, BilibiliController],
  providers: [],
})
export class BackendCoreModule { }
