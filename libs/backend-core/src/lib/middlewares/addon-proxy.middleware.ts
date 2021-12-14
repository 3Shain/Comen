import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import got, { Method } from 'got';

@Injectable()
export class AddonProxyMiddleware implements NestMiddleware {
  constructor(@Inject('COMEN_DEVMODE') private devMode: boolean) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['x-proxy-host']) {
      if (!this.devMode) {
        // if not dev : checkwhitelist
        return;
      }
      got
        .stream(`http://${req.headers['x-proxy-host']}${req.originalUrl}`, {
          method: req.method as Method,
          headers: {
            ...req.headers,
            host: req.headers['x-proxy-host'],
            'x-proxy-host': undefined,
            referer: req.headers['x-proxy-referer'],
            origin: req.headers['x-proxy-origin'],
          },
          body: req.method != 'GET' ? req.body : undefined,
        })
        .pipe(res);
    } else {
      next();
    }
  }
}
