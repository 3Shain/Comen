import * as knex from 'knex';

export type Knex = knex;

export interface KnexyMigration {

    readonly version: string;
    readonly parent?: string;
    /** if a migration is marked as dead, it should be rollbacked and 
     * never considered to be a valid migration path */
    readonly dead?: boolean;

    up(knex: Knex): Promise<void>;
    down(kenx: Knex): Promise<void>;

    testAfterUp?(knex: Knex): Promise<void>;
    testBeforeUp?(knex: Knex): Promise<void>;
    testAfterDown?(knex: Knex): Promise<void>;
    testBeforeDown?(knex: Knex): Promise<void>;
}