module.exports = function (arg1) {
  //require the socket.io module
  const socketIo = require("socket.io");
  //adding the express server to socket.io 
  const io = socketIo(arg1);
  // empty array to store active users
  var users = [];
  //listing to active users
  io.on("connection", (socket) => {
    //adding new stranger
    socket.on("newStranger", (data) => {
      users.push(data);
      console.log(data);
    });
    //end.....
    //find random stranger
    socket.on("findRandomStrangerServer", (data) => {
      console.log("worked");
      //checking if there is more that one acrive user in the server
      if (users.length < 2) {
        //returning to client that he can't talk because of he is the pnly person active in the server
        io.emit("findRandomStrangerClient", { valid: false });
      } else {
        // finding a random stranger to talk 
        var random = Math.floor(Math.random() * 10000) % users.length;
        var userIndex = users.findIndex((x) => x.socketId == data.senderId);
        while (random == userIndex) {
          var random = Math.floor(Math.random() * 10000) % users.length;
        }

        io.emit("findRandomStrangerClient", {
          valid: true,
          senderName: users[userIndex].name,
          recieverName: users[random].name,
          senderId: users[userIndex].socketId,
          recieverId: users[random].socketId,
        });
      }
    });
    //end....
    //new message
    socket.on("newMessage",(data)=>{
     
        io.to(data.senderId).emit("newMessage",data)
        io.to(data.recieverId).emit("newMessage",data)
    })
  });
};
