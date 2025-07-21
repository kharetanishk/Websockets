//intialising the websocket server
import { WebSocketServer } from "ws";

let userCount = 0;
const tanuwss = new WebSocketServer({ port: 1600 });
let allSockets = [];

//connection of a server
tanuwss.on("connection", (socket) => {
  allSockets.push(socket);
  userCount++;
  console.log("Connection estalished" + " " + "#" + userCount);

  socket.on("message", (msg) => {
    console.log(`User messaage : ${msg.toString()}`); //this is the user message

    //but now the socket wants to send the response that can appear in
    // everyones server who is conneccted within it for that

    //broadcasting
    allSockets.forEach((e) => e.send("User message" + " " + msg.toString()));
    allSockets.forEach((e) =>
      e.send("Server message : HEllo world form the server")
    );
  });
});
