import mongoose from 'mongoose'

interface User extends mongoose.Document {
  name: string
  bio?: string
  email: string
  password_hash: string
  avatar_uri?: string
  created_at: Date
  updated_at: Date
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
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

export default mongoose.model<User>('User', UserModel)
