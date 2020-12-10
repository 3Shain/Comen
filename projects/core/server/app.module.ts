import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { AppServerModule } from '../src/main.server';
import { AcfunController } from './acfun.controller';
import { BilibiliController } from './bilibili.controller';
import { BilibiliService } from './bilibili.service';

@Module({
  controllers:[
    AcfunController,BilibiliController
  ],
  imports: [
    /**
     * Angular SSR
     * 调试有点难顶！
     */
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/core/browser')
    }),
    CacheModule.register((()=>{
      if(process.env.REDIS_CACHE){

      } else {
        
      }
      return {

      };
    })()),
    ScheduleModule.forRoot(),
    //nestjs的httpmodule跟个废物玩意儿似的。明明是服务端用个锤子axios，想取个cookie还得各种骚操作
  ],
  providers:[BilibiliService]
})
export class AppModule {}