import User, { BaseUser } from '../../../src/app/models/User'
import faker from 'faker'

export async function makeInstance (obj: Partial<BaseUser>) {
  return User.create({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password_hash: faker.internet.password(),
    bio: faker.lorem.paragraph(),
    avatar_uri: faker.internet.avatar(),
    ...obj
  })
}

export function make (obj: Partial<Omit<BaseUser, 'password_hash'> & {password: string}>) {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    bio: faker.lorem.paragraph(),
    avatar_uri: faker.internet.avatar(),
    ...obj
  }
}
