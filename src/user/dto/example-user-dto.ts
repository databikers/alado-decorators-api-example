import { validateProperty, documentProperty } from 'alado';

export class ExampleUserDto {
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

  @documentProperty({
    schema: {
      type: 'string',
    },
    example: '7ef5ed25-53b1-432f-96ec-8e35d830eb9c',
    description: 'User id',
  })
  id?: string = '7ef5ed25-53b1-432f-96ec-8e35d830eb9c';

  @documentProperty({
    schema: {
      type: 'string',
    },
    example: '/path/to/image.png',
    description: 'User avatar',
  })
  avatar?: string = '/path/to/image.png';
}

export const exampleUserDto: ExampleUserDto = new ExampleUserDto();
