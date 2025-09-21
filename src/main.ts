import { initializeApplication } from 'alado';
import { aladoServerOptions } from '@config';
import { UserController } from '@user';

export const app = initializeApplication({
  serverOptions: aladoServerOptions,
  controllers: [UserController],
});

app.start(() => console.log('Application has been successfully started'));
