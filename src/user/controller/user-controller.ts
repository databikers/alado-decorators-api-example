import process from 'process';
import { post, Request, defineResponse, defineRequest, get, patch, withAuth } from 'alado';
import { Id, CredentialsDto, UserDto, UserFilesDto, exampleUserDto } from '../dto';
import { createWriteStream } from 'fs';
import { DataStore } from '@data-store';
import { bearerAuth } from '@auth';

export class UserController {
  @post('/user', { tags: ['User'] })
  @defineResponse({
    statusCode: 201,
    title: 'User',
    headers: { 'Content-Type': 'application/json' },
    body: exampleUserDto,
  })
  @defineRequest({ body: CredentialsDto })
  public async create(req: Request) {
    const { body } = req;
    const user = DataStore.signUp(body as CredentialsDto);
    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: user,
    };
  }

  @post('/session', { tags: ['Session'] })
  @defineResponse({
    statusCode: 201,
    title: 'Token',
    headers: { 'Content-Type': 'application/json' },
    body: exampleUserDto,
  })
  @defineRequest({ body: CredentialsDto })
  public async signIn(req: Request) {
    const { body } = req;
    const token = DataStore.signIn(body as CredentialsDto);
    const user = DataStore.bearerAuth(token);
    return {
      statusCode: token ? 200 : 401,
      headers: { 'Content-Type': 'application/json' },
      body: { token, user } || { message: 'Unauthorized' },
    };
  }

  @get('/user/:id', { tags: ['User'] })
  @withAuth(bearerAuth)
  @defineResponse({
    statusCode: 200,
    title: 'User',
    headers: { 'Content-Type': 'application/json' },
    body: exampleUserDto,
  })
  @defineRequest({ path: Id })
  public async getById(req: Request) {
    const isMyId = this.isMyId(req);
    if (!isMyId) {
      return {
        statusCode: 403,
        headers: { 'Content-Type': 'application/json' },
        body: { message: 'Access denied' },
      };
    }
    const { path } = req;
    const user = DataStore.getUser(path.id);
    return {
      statusCode: user ? 200 : 404,
      headers: { 'Content-Type': 'application/json' },
      body: user || { message: 'Not Found' },
    };
  }

  @get('/user', { tags: ['User'] })
  @withAuth(bearerAuth)
  @defineResponse({
    statusCode: 200,
    title: 'User',
    headers: { 'Content-Type': 'application/json' },
    body: [exampleUserDto],
  })
  @defineRequest({})
  public async getList(req: Request) {
    const users = DataStore.getUsers();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: users,
    };
  }

  @patch('/user/:id', { tags: ['User'] })
  @withAuth(bearerAuth)
  @defineResponse({
    statusCode: 200,
    title: 'User',
    headers: { 'Content-Type': 'application/json' },
    body: exampleUserDto,
  })
  @defineRequest({ body: UserDto, path: Id })
  public async update(req: Request) {
    const isMyId = this.isMyId(req);
    if (!isMyId) {
      return {
        statusCode: 403,
        headers: { 'Content-Type': 'application/json' },
        body: { message: 'Access denied' },
      };
    }
    const { path, body } = req;
    const user = DataStore.getUser(path.id);
    if (user) {
      DataStore.setUser(path.id, body as UserDto);
    }
    return {
      statusCode: user ? 200 : 404,
      headers: { 'Content-Type': 'application/json' },
      body: DataStore.getUser(path.id) || { message: 'Not Found' },
    };
  }

  @post('/user/:id/avatar', { tags: ['User'] })
  @withAuth(bearerAuth)
  @defineResponse({
    statusCode: 200,
    title: 'User',
    headers: { 'Content-Type': 'application/json' },
    body: exampleUserDto,
  })
  @defineRequest({ path: Id, files: UserFilesDto })
  public setAvatar(req: Request) {
    const isMyId = this.isMyId(req);
    if (!isMyId) {
      return {
        statusCode: 403,
        headers: { 'Content-Type': 'application/json' },
        body: { message: 'Access denied' },
      };
    }
    const { path, files } = req;
    const user = DataStore.getUser(path.id);
    if (!user) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: { message: 'Not Found' },
      };
    }
    const { avatar } = files;
    const writeStream = createWriteStream(`${process.cwd()}/uploads/user-${path.id}-avatar.png`, {
      encoding: 'latin1',
    });
    avatar.stream.pipe(writeStream);
    return {
      statusCode: 202,
      headers: { 'Content-Type': 'application/json' },
      body: {},
    };
  }

  protected isMyId(req: Request) {
    return req.path?.id === req.auth?.user?.id;
  }
}

export const us = new UserController();
