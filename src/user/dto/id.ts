import { validateProperty, documentProperty } from 'alado';

export class Id {
  @validateProperty({
    required: true,
    handler: async (value: any) => value && typeof value === 'string',
    error: {
      statusCode: 400,
      message: 'Invalid id',
    },
  })
  @documentProperty({
    schema: {
      type: 'string',
    },
    example: '7ef5ed25-53b1-432f-96ec-8e35d830eb9c',
    description: 'User Id',
  })
  id: string = '7ef5ed25-53b1-432f-96ec-8e35d830eb9c';
}
