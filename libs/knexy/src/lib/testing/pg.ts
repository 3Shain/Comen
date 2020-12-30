import * as knex from 'knex';
import { GenericContainer } from 'testcontainers';
import { KnexFactory } from './types';

export function createPgTestingBed(options: {
    image?: string
} = { image: "postgres" }) : KnexFactory {

    return async () => {
        const container = await new GenericContainer(options.image)
            .withEnv("POSTGRES_PASSWORD", "testingdb")
            .withEnv("POSTGRES_DB", "testingdb")
            .withExposedPorts(5432)
            .start();

        const con = knex({
            client: "pg",
            connection: {
                host: container.getHost(),
                port: container.getMappedPort(5432),
                user: "postgres",
                password: "testingdb",
                database: "testingdb",
                charset: "utf8"
            }
        });
        
        return {
            instance: con,
            destroy: async () =>{
                await con.destroy();
                await container.stop();
            }
        };
    }
}