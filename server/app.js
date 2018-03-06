const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8989})

const users = []

const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== ws ) {
      clieng.send(JSON.stringify(data))
    }
  })
}

// Where web server sends different things depending on whats going on
// What happens when there is a connection to the web socket server
wss.on('connection', (ws) => {
  let index
  ws.on('message', (message) => {
    // Parse message into the data variable
    const data = JSON.parse(message)
    // Depending on what the data actually is, we're going to do something different
    // When user connects, listen to add user and add message events, establishes connection to server
    switch(data.type) {
      case 'ADD-USER': {
        index = users.length
        users.push({ name: data.name, id: index + 1})
        // Send user data
        ws.send(JSON.stringify ({
          type: 'USERS_LIST',
          // Send list of users
          users
        }))
        // Must ws.send and also broadcast
        broadcast({
          type: 'USERS_LIST',
          users
        }, ws)
        break
      }
      case 'ADD_MESSAGE':
        broadcast({
          type: 'ADD_MESSAGE',
          message: data.message,
          author: data.author
          // Must pass web socket instance
        }, ws)
        break
      default:
        break
    }

  })

  ws.on('close', () => {
    // removing the current user from the user list
    users.splice(index, 1)
    broadcast({
      // Use string instead of constants because server can't read anything from the constants folder because the client and the server are completely separated
      type: 'USERS_LIST',
      users
    }, ws)
  })
})