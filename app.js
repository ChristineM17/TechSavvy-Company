// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

// Create an instance of Express
const app = express();

// Set up middleware to parse JSON bodies
app.use(bodyParser.json());

// Define a basic rate limiter (10 requests per hour)
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/submit-form', limiter);

// Define POST endpoint to handle form submissions
app.post('/submit-form', (req, res) => {
  // Extract form data from the request body
  const { name, email, subject, message } = req.body;

  // Validate form fields
  if (!name || !email || !subject || !message) {
    // Return a 400 error if any field is missing
    return res.status(400).json({ error: 'Please fill out all fields.' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    // Return a 400 error if email format is invalid
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  // Log form data
  console.log('Form submitted:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Subject:', subject);
  console.log('Message:', message);

  // Send success response
  return res.status(200).json({ message: 'Thank you for your submission!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
