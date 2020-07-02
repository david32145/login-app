import './config/env'
import app from './app'

const PORT = process.env.PORT || 3333

app.listen(PORT, (...err: any[]) => {
  if (err && err.length > 0) {
    console.log('Error on api...')
    console.error(err)
  } else {
    console.log(`Server is running in http://localhost:${PORT}`)
  }
})
