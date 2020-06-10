import mongoose from 'mongoose'
import { Form } from './Form'

export interface BaseUser {
  name: string
  bio?: string
  email: string
  password_hash: string
  avatar_uri?: string
  forms: Form[]
  created_at?: Date
  updated_at?: Date
}

const UserModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password_hash: {
    type: String,
    required: true
  },
  avatar_uri: {
    type: String
  },
  forms: [{
    type: mongoose.Types.ObjectId,
    ref: 'Form',
    select: false
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

export default mongoose.model<BaseUser & mongoose.Document>('User', UserModel)
