const { Server } = require("socket.io");

let io;

function initsocket(httpserver) {

    io = new Server(httpserver, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        }
    })

    io.on("connection", (socket) => {
    })

}

  function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized")
    }

    return io
}

module.exports = {initsocket,getIO}