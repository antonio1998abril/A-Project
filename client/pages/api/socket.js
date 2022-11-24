import { Server } from "socket.io";
let users = [];
const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    /*  console.log('Socket is already running') */
  } else {
    /*    console.log('Socket is initializing') */
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("joinRoom", (id) => {
        const user = { userId: socket.id, room: id };
        const check = users.every((user) => user.userId !== socket.id);
        if (check) {
          users.push(user);
          socket.join(user.room);
        } else {
          users.map((user) => {
            if (user.userId === socket.id) {
              if (user.room !== id) {
                socket.leave(user.room);
                socket.join(id);
                user.room = id;
              }
            }
          });
        }
      });

      socket.on("update-input", async (message, chatRoom, sendBy) => {
        socket.to(chatRoom).emit("update-input", {
          message,
          from: socket.id.slice(8),
          chatRoom,
          sendBy,
        });
      });

      socket.on("newNotification", async (fromName,typeNotification, message, notificationRoom, sendBy) => {
        socket.to(notificationRoom).emit("newNotification", {
            fromName,
          from: socket.id.slice(8),
          typeNotification,
          message,
          
          sendBy,
        });
      });


      socket.emit("me", socket.id)

      socket.on("disconnect", async() => {
        socket.broadcast.emit("callEnded")
      })
    
      socket.on("callUser", async(data) => {
        socket.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
      })
    
      socket.on("answerCall", async(data) => {
        socket.to(data.to).emit("callAccepted", data.signal)
      })

      socket.on("disconnect", async() => {
     /*    console.log(socket.id + "disconnected"); */
      });
    });
  }
  res.end();
};

export default SocketHandler;
