const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const appointmentRoutes = require("./routes/appointmentRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// Get the port from the environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json()); // Allows JSON request body

// ✅ Enable CORS
// Allow CORS for frontend URLs (update this with the correct URL of your frontend on Render or GitHub Pages)
app.use(
  cors({
    origin: [
      "http://localhost:3000",  // Local development (React app)
      //"https://your-frontend-app.onrender.com",  // Frontend on Render (replace with your actual URL)
      "https://github.com/manoharyadavr/hospital-website-frontend",  // If you have a GH Pages frontend
    ],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Handle Preflight Requests
app.options("*", cors());

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/contact", contactRoutes);

// ✅ Error Handling Middleware (Improves Debugging)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
