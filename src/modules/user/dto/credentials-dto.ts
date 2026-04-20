import { validateProperty, documentProperty } from 'alado';

export class CredentialsDto {
  @validateProperty({
    required: true,
    handler: async (value: any) => value && typeof value === 'string',
    error: {
      statusCode: 400,
      message: 'Invalid email',
    },
  })
  @documentProperty({
    schema: {
      type: 'string',
    },
    example: 'example@example.com',
    description: 'User email',
  })
  email: string = 'example@example.com';

  @validateProperty({
    required: true,
    handler: async (value: any) => value && typeof value === 'string',
    error: {
      statusCode: 400,
      message: 'Invalid password',
    },
  })
  @documentProperty({
    schema: {
      type: 'string',
    },
    example: 'securePassword',
    description: 'User password',
  })
  password: string = 'securePassword';
}

export const credentialsDto = new CredentialsDto();
