import { bootstrapBackendCore } from '@comen/backend-core';
import { environment } from './environments/environment';
import { join, resolve } from 'path';

bootstrapBackendCore({
    dev: !environment.production,
    frontendPath: join(resolve(__dirname), 'frontend')
}).catch(console.error);