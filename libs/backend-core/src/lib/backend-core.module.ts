import { Module } from '@nestjs/common';
import { BilibiliController } from './controllers/bilibili.controller';

import { AcfunController } from './controllers/acfun.controller';
import { BilibiliUserService } from './services/bili-user.service';

@Module({
  controllers: [AcfunController, BilibiliController],
  providers: [
    BilibiliUserService
  ],
})
export class BackendCoreModule { }
