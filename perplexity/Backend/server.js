require("dotenv").config();
const app = require("./src/App");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
