const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Add this line

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (replace 'yourMongoDBUrl' with your actual MongoDB connection string)
mongoose.connect("mongodb+srv://ashish:Papaji123@cluster0.9bm9aer.mongodb.net/Portfolio?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a MongoDB schema
const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
});

// Create a MongoDB model
const FormData = mongoose.model("FormData", formDataSchema);

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use(cors()); // Add this line

// Route to handle form submission
app.post("/submit-form", async (req, res) => {
  try {
    // Create a new FormData document
    const formData = new FormData({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      subject: req.body.subject,
      message: req.body.message,
    });

    // Save the document to MongoDB
    await formData.save();

    // Send a response
    res.status(200).json({ message: "Form data submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
