import * as yup from 'yup'
import { Field } from '../models/Form'

type Validator = Record<string, yup.Schema<string>>

export default function FormResponseValidator (fields: Field[]) {
  const validators = fields.reduce<Validator>((acc, field) => {
    if (field.options.length > 0) {
      const rule = yup.string()
        .required(`The field ${field.label} is requires`)
        .oneOf(field.options, 'The options is invalid')
      acc[field.label] = rule
    } else {
      const rule = yup.string()
        .required(`The field ${field.label} is requires`)
      acc[field.label] = rule
    }
    return acc
  }, {})

  const schema = yup.object(validators)

  return schema
}

const x = FormResponseValidator([{
  label: 'name',
  type: 'TEXT_FIELD',
  options: []
}, {
  label: 'sex',
  type: 'RADIO',
  options: ['MALE', 'FEMALE', 'UNKNOWN']
}])

x.validate({ name: 'David', sex: 'MALE' })
  .then(console.log)
  .catch(console.error)
