/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { BackendCoreModule } from './backend-core.module';
import * as knex from 'knex';

export async function bootstrapBackendCore() {
    const app = await NestFactory.create(BackendCoreModule);
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3333;
    await app.listen(port, () => {
        Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
    });
}

export async function performDatabaseMigration(dbInfo: knex.StaticConnectionConfig) {
    // TODO
}
