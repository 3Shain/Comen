import { CacheModule, DynamicModule, Logger, Provider } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { BackendCoreModule } from './backend-core.module';
import 'reflect-metadata';
import * as redisStore from 'cache-manager-redis-store';
import * as fsStore from 'cache-manager-fs';
import { ServeStaticModule } from '@nestjs/serve-static';
import { tmpdir } from 'os';
import { join } from 'path';
import { getPortPromise } from 'portfinder';

export interface ComenBackendOptions {
  dev: boolean;
  frontendPath: string;
  port?: number;
}

export async function bootstrapBackendCore(options: ComenBackendOptions) {
  initModuleDependencies(options);
  const app = await NestFactory.create(BackendCoreModule);
  const port = Number(options.port ?? process.env.PORT ?? 4000);
  const freePort = await getPortPromise({ port });
  await app.listen(freePort, () => {
    Logger.log(`Listening at http://localhost:${freePort}`);
  });
  return {
    port: freePort,
  };
}

function initModuleDependencies(options: ComenBackendOptions) {
  const modules = [
    CacheModule.registerAsync({
      useFactory: () => {
        if (process.env.REDIS_HOST) {
          return {
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT ?? '6379'),
            auth_pass: process.env.REDIS_AUTH,
            db: parseInt(process.env.REDIS_DB ?? '0'),
          };
        }
        return {
          store: fsStore,
          maxsize: 1000 * 1000 * 1000, // 1Gib,
          path: tmpdir() + '/comen',
          preventfill: true,
        };
      },
    }),
    InjectionModule.inject({
        COMEN_DEVMODE: options.dev
    })
  ];
  if (!options.dev) {
    modules.push(
      ServeStaticModule.forRoot({
        rootPath: options.frontendPath,
      }),
      ServeStaticModule.forRoot({
        rootPath: join(options.frontendPath, 'assets/css4obs'),
        serveRoot: '/css4obs',
      })
    );
  }
  Reflect.defineMetadata('imports', modules, BackendCoreModule);
}


export class InjectionModule {
    static inject(object:Record<string,any>):DynamicModule {
        const providers = Object.entries(object).map(([key,value])=>{
            return {
                provide: key,
                useValue: value
            }
        });
        return {
            module: InjectionModule,
            providers,
            exports: providers
        }
    }
}