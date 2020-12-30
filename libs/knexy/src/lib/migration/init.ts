import { Knex, KnexyMigration } from "./types";

export const MIGRATION_TABLE = "_knexy_migrations";

export async function initMigration(knex: Knex, options: {
    migrations: KnexyMigration[],
    targetVersion?: string
}) {

    // read current migration table
    if (!await knex.schema.hasTable(MIGRATION_TABLE)) {
        await knex.schema.createTable(MIGRATION_TABLE, (table) => {
            table.text("version").notNullable();
            table.dateTime("migration_time").notNullable();
        });
    }
    const ret = await knex.select<{ version: string, migration_time: number }[]>("*").from(MIGRATION_TABLE);
    // assert ret.length = 1
    if(ret.length>1){
        throw new Error('Unexpected multiple migration logs exists.');
    }
    const currentVersion = ret.length ? ret[0].version : null;
    const targetVersopm = options.targetVersion ?? orderLatestMigrationPath(options.migrations).pop().version;
    const {
        downgradePath,
        upgradePath
    } =findPath(options.migrations,currentVersion,targetVersopm);

    await knex.transaction((tx)=>{
        
    });
}

export function orderLatestMigrationPath(migrations: KnexyMigration[]) {
    const ret = [] as KnexyMigration[];
    let currentTarget = undefined;

    while (true) {
        // eslint-disable-next-line
        const result = migrations.find(x => x.parent == currentTarget && !x.dead)
        if (!result) {
            break;
        }
        ret.push(result);
        currentTarget = result.version;
    }
    return ret;
}

export function findLinearPath(migrations: KnexyMigration[], target: string) {
    const ret = [] as KnexyMigration[];
    let currentTarget = target;

    while (currentTarget) {
        // eslint-disable-next-line
        const result = migrations.find(x => x.parent == currentTarget && !x.dead)
        if (!result) {
            throw new Error(`Migration ${currentTarget} is not found.`);
        }
        ret.push(result);
        currentTarget = result.parent
    }
    return ret.reverse();
}

export function findPath(migrations: KnexyMigration[], source: string, destination: string) {
    //这就是不会算法的下场
    const originalPath = findLinearPath(migrations, source);
    const newPath = findLinearPath(migrations, destination);
    let sameIndex = 0;
    while (originalPath[sameIndex].version
        === newPath[sameIndex].version) {
        sameIndex++;
    }
    return {
        downgradePath: originalPath.slice(sameIndex).reverse(),
        upgradePath: originalPath.slice(sameIndex)
    }
}