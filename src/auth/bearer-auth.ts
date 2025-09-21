import { RequestAuthentication } from 'alado';
import { DataStore } from '@data-store';

export const bearerAuth: RequestAuthentication = {
  required: true,
  inputProperty: 'headers.x-api-key',
  outputProperty: 'auth.user',
  handler(value: string) {
    return DataStore.bearerAuth(value);
  },
  error: {
    statusCode: 401,
    message: 'Unauthorized',
  },
};
