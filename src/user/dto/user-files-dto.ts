import { fileUploadProperty } from 'alado';

export class UserFilesDto {
  @fileUploadProperty({
    mimetypes: ['image/png'],
    maxSize: 1048576,
    required: true,
    maxSizeError: {
      statusCode: 413,
      message: 'The avatar should not be larger than 1MB',
    },
    mimetypeError: {
      statusCode: 415,
      message: 'The avatar should be a PNG image',
    },
    requiredError: {
      statusCode: 400,
      message: 'The avatar file is required',
    },
  })
  avatar: string = '/path/to/image.png';
}
