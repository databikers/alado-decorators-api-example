import { v4 } from 'uuid';

import { UserDto, CredentialsDto, UserAuthSourceDto } from '@user';

const users = new Map<string, UserDto>();
const authSources = new Map<string, UserAuthSourceDto>();

export class DataStore {
  static signUp(data: CredentialsDto) {
    const { password, ...user } = data;
    const { email } = user;
    const id = v4();
    const token = v4();
    users.set(id, user);
    authSources.set(token, { password, email, user: id });
    const u = users.get(id);
    return { id, ...u };
  }

  static signIn(data: CredentialsDto): string {
    const { email, password } = data;
    let bearer: string;
    authSources.forEach((authSource: UserAuthSourceDto, token: string) => {
      if (!bearer) {
        if (authSource.email === email && authSource.password === password) {
          bearer = token;
        }
      }
    });
    return bearer;
  }

  static bearerAuth(token: string) {
    const authSource = authSources.get(token);
    if (!authSource) {
      return;
    }
    const { user } = authSource;
    const entity = users.get(user);
    return { ...entity, id: user };
  }

  static getUser(id: string) {
    return { id, ...users.get(id) };
  }

  static isUsernameFree(email: string) {
    return !Array.from(users.values()).some((user: UserDto) => user.email === email);
  }

  static setUser(id: string, user: UserDto) {
    users.set(id, user);
    return users.get(id);
  }

  static getUsers() {
    const data: UserDto[] = [];
    users.forEach((user: UserDto, id: string) => {
      data.push({ id, ...user });
    });
    return data;
  }
}
