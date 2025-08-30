# **Simple JWT User Authentication**

This project is a lightweight, self-contained web application that demonstrates a fundamental user authentication flow using **JSON Web Tokens (JWT)**. It's built with Node.js and Express for the backend, and plain HTML, CSS, and JavaScript with Axios for the frontend.

The entire application runs from a single server file and uses an in-memory array to store user data, making it incredibly easy to run and test without needing a database.

## **Features**

* **User Signup:** New users can create an account with a username and password.  
* **User Signin:** Existing users can log in to receive a JWT.  
* **Token-Based Authentication:** The JWT is stored in the browser's localStorage and sent with subsequent requests to access protected data.  
* **Protected Route:** A /me endpoint that verifies the user's token and returns their credentials.  
* **Logout:** A simple logout function that removes the token from localStorage.  
* **Clean UI:** A styled, card-based interface for signup, signin, and data display.

## **How It Works**

1. **Signup (/signup):** A user submits a username and password. The server checks if the username already exists. If not, the user is added to the users array in index.js.  
2. **Signin (/signin):** A user submits their credentials. If they match a user in the array, the server generates a JWT using the jsonwebtoken library. This token, which contains the username, is sent back to the client.  
3. **Client-Side Storage:** The frontend receives the JWT and stores it in the browser's localStorage.  
4. **Authenticated Request (/me):** When the page loads or after a user signs in, the client sends a GET request to /me. It includes the JWT in the request headers.  
5. **Middleware Verification:** A middleware function (authHandler) on the server intercepts the /me request. It verifies the token's signature using the secret key. If valid, it decodes the username and attaches the user's details to the request object before passing it to the final handler.  
6. **Data Display:** The client receives the user's details from the /me endpoint and displays them on the page.

## **Getting Started**

Follow these instructions to get the project running on your local machine.

### **Prerequisites**

You must have [Node.js](https://nodejs.org/) installed on your system (which includes npm).

### **Installation & Setup**

1. **Clone the repository:**  
   git clone (https://github.com/lakshya5025/JWT-Authentication.git)

2. **Navigate into the project directory:**  
   cd JWT-Authentication

3. Install the required npm packages:  
   This will install Express and jsonwebtoken as defined in package.json.  
   npm install

### **Running the Application**

1. Start the server:  
   This command runs the index.js file.  
   npm start

2. View the application in your browser:  
   You will see a confirmation message in your terminal that the app is running.  
   app is running on http://localhost:3000

   Open your web browser and navigate to [**http://localhost:3000**]

## **How to Use the App**

1. **Sign Up:** Use the "Signup" form to create a new user. Enter a desired username and password and click the "Signup" button.  
2. **Sign In:** Use the "Signin" form with the credentials you just created.  
3. **View Your Data:** Upon successful signin, your username will be fetched from the server and displayed in the data card.  
4. **Logout:** Click the "Logout" button to clear your session token and remove the displayed data.
