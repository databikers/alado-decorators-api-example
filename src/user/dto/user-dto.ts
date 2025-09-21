import { validateProperty, documentProperty } from 'alado';

export class UserDto {
  @validateProperty({
    required: true,
    handler: async (value: any) => typeof value === 'string',
    error: {
      statusCode: 400,
      message: 'Invalid email',
    },
  })
  @documentProperty({
    schema: {
      type: 'string',
    },
    example: 'no-reply@example.com',
    description: 'User email',
  })
  email: string = 'example@example.com';

  id?: string;
  avatar?: string;
}
