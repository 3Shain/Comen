import * as knex from 'knex';
import { KnexFactory } from './types';

export function createSqliteTestingBed(): KnexFactory {
    return async () => {

        const con = knex({
            client: "sqlite3",
            connection: {
                filename: ":memory:"
            },
            useNullAsDefault: true
        });

        return {
            instance: con,
            destroy: () => con.destroy()
        };
    }
}