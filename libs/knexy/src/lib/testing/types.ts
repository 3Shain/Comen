import * as knex from 'knex';

export type KnexFactory = () => PromiseLike<{
    instance: knex,
    destroy: () => Promise<void>
}>;