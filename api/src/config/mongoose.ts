import mongoose from 'mongoose'

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost:27017/form_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Database connected!')
  }).catch(err => {
    console.error(err)
  })
}
