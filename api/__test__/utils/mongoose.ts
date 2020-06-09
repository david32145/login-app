import mongoose, { Mongoose } from 'mongoose'

class MongoMock {
  private database: Mongoose | null = null;

  async connect (): Promise<void> {
    if (!process.env.MONGO_URL) {
      throw new Error('MongoDB server not initialized')
    }

    this.database = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
  }

  async dropDatabase (): Promise<void> {
    if (this.database) {
      await this.database.connection.dropDatabase()
    }
  }

  async disconnect (): Promise<void> {
    if (this.database) {
      await this.database.connection.close()
    }
  }
}

export default new MongoMock()
