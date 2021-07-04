import express from 'express'
import ws from 'ws'

const app = express()
const PORT = 8080

app.get('/', (req, res) => {
  res.send({message: 'message'})
})

const server = new ws.Server({port: 5001})
server.on('connection', ws => {
  // クライアントからのデータ受信時に呼ばれるとのこと
  ws.on('message', message => {
    console.log(message)

    server.clients.forEach(client => {
      client.send(message)
    })
  })

  // 接続時に呼ばれるとのこと
  ws.on('close', () => {
    console.log('close')
  })
})

app.listen(PORT, () => {
  console.log(`🚀Runnning http://localhost:${PORT}`)
})