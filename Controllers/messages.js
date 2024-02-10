var io = require("socket.io")(server);

var clients ={};

io.on('connection', (socket) =>{
  console.log('connected');
  console.log(socket.id ,"has join");
  socket.on('signin',(id) =>{
    console.log(id);
    clients[id] = socket;
    console.log(clients);
  });
  socket.on('message', (msg) =>{
    console.log(msg)
    let targetID = msg.targetID;
    if (clients[targetID]) clients[targetID].emit('message',msg);
  });
});
