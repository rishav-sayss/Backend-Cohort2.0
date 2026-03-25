require("dotenv").config();
const app = require("./src/App");
let http = require("http")
const connectDB = require("./config/database");
let { initsocket } = require("./src/sockets/server.socket")
const PORT = process.env.PORT || 3000;

let httpserver = http.createServer(app)
initsocket(httpserver)

// Connect to database
connectDB();

// Start server
httpserver.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
