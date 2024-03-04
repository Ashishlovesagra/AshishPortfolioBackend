const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://ashish:Papaji123@cluster0.9bm9aer.mongodb.net/Portfolio?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
});

const FormData = mongoose.model("FormData", formDataSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Store IP addresses and their last submission timestamp
const ipAddresses = {};

app.post("/submit-form", async (req, res) => {
  try {
    const ip = req.ip;
    const currentTime = Date.now();

    // Check if the IP address has submitted a form in the last minute
    if (ipAddresses[ip] && currentTime - ipAddresses[ip] < 60000) {
      return res.status(429).json({ error: "Only one submission allowed per minute." });
    }

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

    // Update the timestamp for the IP address
    ipAddresses[ip] = currentTime;

    // Send a response
    res.status(200).json({ message: "Form data submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
