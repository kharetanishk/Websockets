//intialising the websocket server
import { WebSocketServer } from "ws";

let userCount = 0;
const tanuwss = new WebSocketServer({ port: 1600 });

//connection of a server
tanuwss.on("connection", (socket) => {
  userCount++;
  console.log("Connection estalished" + " " + "#" + userCount);
  socket.send("Hello world");

  socket.on("message", (msg) => {
    console.log(`User messaage : ${msg.toString()}`); //this is the user message
    setTimeout(() => {
      socket.send(
        ` Server Message : Okay i have recieved your message is this was your msg -> ${msg.toString()}`
      );
    }, 4000);

    console.log("Simple chat between user and server");
  });
});
