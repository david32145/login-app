import express from 'express'

const app = express()

app.use('/', (req, res) => {
  return res.status(200).json({
    token: 'token'
  })
})

export default app
