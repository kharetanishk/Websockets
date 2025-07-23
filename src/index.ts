//intialising the websocket server
import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 1600 });

interface User {
  socket: WebSocket;
  roomId: string;
}

// we will store all sockets and room ids here
let allSocket: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    //@ts-ignore
    const parseMessage = JSON.parse(message);
    if (parseMessage.type == "join") {
      const roomId = parseMessage.payload.roomId;
      allSocket.push({ socket, roomId });
      console.log(`User joined now ${roomId}`);
    }

    let currentRoom = null;
    if (parseMessage.type == "chat") {
      const sender = allSocket.find((user) => user.socket == socket);
      if (!sender) {
        console.log(`Sender not found`);
        return;
      }

      const roomId = sender.roomId;
      const messageTosend = parseMessage.payload.message;

      console.log(`Broadcasting the message to the room ${roomId}`);

      allSocket.forEach((user) => {
        if (user.roomId == roomId) {
          user.socket.send(messageTosend);
        }
      });
    }
  });
});
