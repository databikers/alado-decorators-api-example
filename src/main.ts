import { initializeApplication } from 'alado';
import { aladoServerOptions } from '@config';
import { UserController } from '@module';

export const app = initializeApplication({
  serverOptions: aladoServerOptions,
  controllers: [{ controller: UserController, options: [] }],
});

app.start(() => console.log('Application has been successfully started'));
