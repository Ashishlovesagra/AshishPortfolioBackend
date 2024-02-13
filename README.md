Express MongoDB Form Submission API
This is a simple Express.js application that serves as an API for submitting form data to a MongoDB database. It allows clients to send form data via a POST request to the /submit-form endpoint, which then saves the data to a MongoDB collection.

Setup
1.Dependencies:
Express.js: A minimalist web framework for Node.js.
mongoose: An elegant MongoDB object modeling tool.
body-parser: Node.js body parsing middleware.
cors: Middleware for enabling Cross-Origin Resource Sharing (CORS).

2.Installation:
Make sure you have Node.js and npm installed. Then run:
npm install express mongoose body-parser cors

3.MongoDB:
Replace 'yourMongoDBUrl' in the mongoose.connect() call with your actual MongoDB connection string.

Usage
Start the Server:
Run the following command:

Copy code
node server.js
Replace server.js with the filename where you've saved your code.

Endpoints:

POST /submit-form: Accepts form data in JSON format and saves it to the MongoDB database.
Example request body:

json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "subject": "Inquiry",
  "message": "Hello, I have a question."
}
Example response:

json
{
  "message": "Form data submitted successfully"
}

Middleware
body-parser:Used to parse incoming request bodies in JSON and URL-encoded formats.
cors:Enables Cross-Origin Resource Sharing, allowing client applications hosted on different domains to access this API.

MongoDB Schema and Model
Schema:Defines the structure of the form data stored in the MongoDB collection.
Model:Represents a collection in the MongoDB database and provides an interface for interacting with it.

Error Handling
If an error occurs during form submission, the server responds with a 500 status code and an error message.

Environment Variables
PORT: Specifies the port on which the server should listen. Defaults to 3000 if not provided.
Conclusion
This Express.js application provides a simple and secure API for submitting form data to a MongoDB database. It can be easily integrated into web applications to handle user input effectively.
