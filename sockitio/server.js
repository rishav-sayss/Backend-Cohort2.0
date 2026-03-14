let app = require("./src/app")
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer)

io.on("connection", (socket) => {
    console.log("User connected");
    socket.on("message", (msg) => {
        console.log(msg)
    })
});


httpServer.listen(3000, () => {
    console.log("server is running on port 3000")
});