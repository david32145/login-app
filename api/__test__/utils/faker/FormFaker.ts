import Form, { FormBase } from '../../../src/app/models/Form'
import faker from 'faker'

type FormFaker = Partial<Omit<Omit<FormBase, 'created_at'>, 'updated_at'>>

export async function makeInstance (form: FormFaker) {
  return await Form.create({
    title: faker.lorem.sentence(3),
    description: faker.lorem.sentence(10),
    fields: [],
    theme: faker.random.arrayElement(['#F00', '#0F0', '#00F']),
    user_id: form.user_id!,
    ...form
  })
}
