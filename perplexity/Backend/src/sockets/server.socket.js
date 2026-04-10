const { Server } = require("socket.io");

let io;

function initsocket(httpserver) {

    io = new Server(httpserver, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        }
    })

    console.log("Socket.io server is RUNNING")

    io.on("connection", (socket) => {

        console.log("A user connected: " + socket.id)

    })

}

function getIO() {
    
    if (!io) {
        throw new Error("Socket.io not initialized")
    }

    return io
}

module.exports = { initsocket, getIO }