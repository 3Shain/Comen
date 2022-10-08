import { Controller, Get, ParseIntPipe, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { take } from 'rxjs/operators';

@Controller('api/addon')
export class AddonController {
  constructor() {}
}
