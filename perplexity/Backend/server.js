require("dotenv").config();
const app = require("./src/App");
const connectDB = require("./config/database");
let { testapi } = require("./src/services/GenerativeAi.services")
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();
testapi()
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
