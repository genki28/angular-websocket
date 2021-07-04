import express from 'express'

const app = express()
const PORT = 8080

app.get('/', (req, res) => {
  res.send({message: 'message'})
})

app.listen(PORT, () => {
  console.log(`🚀Runnning http://localhost:${PORT}`)
})