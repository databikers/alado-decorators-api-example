import { validateProperty, documentProperty } from 'alado';

export class CheckRoutingDto {
  @validateProperty({
    required: true,
    handler: async (value: any) => value && typeof value === 'string',
    error: {
      statusCode: 400,
      message: 'Invalid variableFirst',
    },
  })
  @documentProperty({
    schema: {
      type: 'string',
    },
    example: '7ef5ed25-53b1-432f-96ec-8e35d830eb9c',
    description: 'variableFirst',
  })
  variableFirst: string = 'variableFirst';

  @validateProperty({
    required: true,
    handler: async (value: any) => value && typeof value === 'string',
    error: {
      statusCode: 400,
      message: 'Invalid variableFirst',
    },
  })
  @documentProperty({
    schema: {
      type: 'string',
    },
    example: '7ef5ed25-53b1-432f-96ec-8e35d830eb9c',
    description: 'variable_second',
  })
  variable_second: string = 'variable_second';

  @validateProperty({
    required: true,
    handler: async (value: any) => value && typeof value === 'string',
    error: {
      statusCode: 400,
      message: 'Invalid variableFirst',
    },
  })
  @documentProperty({
    schema: {
      type: 'string',
    },
    example: '7ef5ed25-53b1-432f-96ec-8e35d830eb9c',
    description: 'variable_second',
  })
  ['variable Third']: string = 'variable Third';
}

export const checkRoutingDto: CheckRoutingDto = new CheckRoutingDto();
