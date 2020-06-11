import mongoose from 'mongoose'

export interface FormAnswer {
  label: string
  value: string
}

export interface FormResponseBase {
  form_id: string
  answers: FormAnswer[]
}

const FormAnswerSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
})

export type FormResponse = FormResponseBase & mongoose.Document

const FormResponseSchema = new mongoose.Schema({
  form_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Form'
  },
  answers: {
    type: [FormAnswerSchema],
    default: []
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

export default mongoose.model<FormResponse>('FormResponse', FormResponseSchema)
