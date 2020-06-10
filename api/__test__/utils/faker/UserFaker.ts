import User, { BaseUser } from '../../../src/app/models/User'
import HashService from '../../../src/app/services/HashService'
import faker from 'faker'

type UserFaker = Partial<Omit<BaseUser, 'password_hash'> & {password: string}>

export async function makeInstance (obj: UserFaker) {
  let password_hash = faker.internet.password()
  if (obj.password) {
    password_hash = await HashService.make(obj.password)
    delete obj.password
  }
  return User.create({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password_hash: password_hash,
    bio: faker.lorem.paragraph(),
    avatar_uri: faker.internet.avatar(),
    forms: [],
    ...obj
  })
}

export function make (obj: UserFaker) {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    bio: faker.lorem.paragraph(),
    avatar_uri: faker.internet.avatar(),
    forms: [],
    ...obj
  }
}
