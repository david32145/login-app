import mongoose from 'mongoose'

type FieldType = 'TEXT_FIELD' | 'TEXT_AREA' | 'SELECT' | 'RADIO'

export interface Field {
  label: string
  type: FieldType,
  options: string[]
}

interface FormBase {
  title: string
  description: string
  theme: string
  user_id: string
  fields: Field []
  created_at?: Date
  updated_at?: Date
}

const FieldSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['TEXT_FIELD', 'TEXT_AREA', 'SELECT', 'RADIO']
  },
  options: {
    type: [String],
    default: []
  }
})

type Form = FormBase & mongoose.Document

const FormSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  fields: {
    type: [FieldSchema],
    default: []
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

export default mongoose.model<Form>('Form', FormSchema)
