import { Knex, KnexyMigration } from "../migration/types";
import schema from '@directus/schema';
import { SchemaOverview } from '@directus/schema/dist/types/overview';

export async function testMigrations(migrations: KnexyMigration[], knex: Knex) {

    async function travalTestNode(node: MigrationNode, lastSchemaDescriptor?: SchemaOverview) {
        try {
            await node.migration.testBeforeUp?.(knex);
            // transaction?
            await node.migration.up(knex);
            await node.migration.testAfterUp?.(knex);

            // collect new schema
            const newSchema = await schema(knex).overview();

            for (let deadNode of node.deadNodes) {
                await travalTestNode(deadNode, newSchema);
            }
            if (node.current) {
                await travalTestNode(node.current, newSchema);
            }

            await node.migration.testBeforeDown?.(knex);
            // transactions?
            await node.migration.down(knex);
            await node.migration.testAfterDown?.(knex);

            // compare old schema
            if (lastSchemaDescriptor != null) {
                compareSchema(lastSchemaDescriptor, newSchema);
            }

        } catch (e) {
            if (e.bubble) {
                throw e;
            } else {
                throw {
                    bubble: true,
                    innerError: e,
                    node: node
                }
            }
        }
    }

    const treeTopNode = sortMigrationTree(migrations);
    if (!treeTopNode.current) {
        return;
    }

    try {
        await travalTestNode(treeTopNode.current);
    } catch (error) {
        throw new class extends Error {
            innerError = error.innerError;
            constructor() {
                super(`An erro occured with migration "${error.node.migration.version}": ${error.innerError.toString()}`);
                this.stack = this.innerError.stack;
            }
        }
    }
    // then it shall pass!
}

type MigrationNode = {
    migration: KnexyMigration;
    current: MigrationNode;
    deadNodes: MigrationNode[];
}

function sortMigrationTree(migrations: KnexyMigration[]) {

    function sort(migration: KnexyMigration): MigrationNode {
        const result = migrations.filter(x => x.parent == (migration ? migration.version : null));
        if (result.length == 0) {
            // no result is found
            return {
                migration: migration,
                current: null,
                deadNodes: []
            };
        } else if (result.filter(x => !x.dead).length != 1) {
            throw new Error(`Can't find a proper migration after ${migration.version}`)
        }
        return {
            migration: migration,
            current: sort(result.find(x => !x.dead)),
            deadNodes: result.filter(x => x.dead).map(sort)
        }
    }

    return sort(null);
}

function compareSchema(oldSchema: SchemaOverview, newSchema: SchemaOverview) {
    // TODO: 
}